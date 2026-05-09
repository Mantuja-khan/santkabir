const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const nodemailer = require('nodemailer');
require('dotenv').config();

const User = require('./models/User');
const Admission = require('./models/Admission');
const Syllabus = require('./models/Syllabus');
const Gallery = require('./models/Gallery');
const Career = require('./models/Career'); // New Career Model
const Contact = require('./models/Contact');

const app = express();
app.use(cors({ origin: ['https://stkabirpublicschool.in', 'http://localhost:8080', 'http://localhost:3000'] }));
app.use(express.json());

const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
app.use('/uploads', express.static(uploadsDir));

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Multer Config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname))
});

const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });

// Email Transporter (Gmail)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Auth Middleware
const auth = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No authorization' });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    next();
  } catch (err) { res.status(401).json({ message: 'Invalid token' }); }
};

// --- Auth ---
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) return res.status(400).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
    res.json({ token, user: { id: user._id, email: user.email, role: user.role } });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// --- Admissions ---
app.get('/api/admissions', auth, async (req, res) => {
  try { res.json(await Admission.find().sort({ created_at: -1 })); } catch (err) { res.status(500).json({ message: err.message }); }
});

app.post('/api/admissions', async (req, res) => {
  try {
    const newAdmission = new Admission(req.body);
    await newAdmission.save();

    // Send Email Notification
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.RECEIVER_EMAIL,
      subject: `New Admission Form: ${newAdmission.student_name}`,
      html: `
        <h3>New Student Admission Request</h3>
        <p><b>Name:</b> ${newAdmission.student_name}</p>
        <p><b>Class Applied:</b> ${newAdmission.class_applied}</p>
        <p><b>Father's Name:</b> ${newAdmission.father_name}</p>
        <p><b>Phone:</b> ${newAdmission.phone_number}</p>
      `
    };
    transporter.sendMail(mailOptions).catch(err => console.log('Email Error:', err));

    res.status(201).json(newAdmission);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

app.delete('/api/admissions/:id', auth, async (req, res) => {
  try { await Admission.findByIdAndDelete(req.params.id); res.json({ message: 'Deleted' }); } catch (err) { res.status(500).json({ message: err.message }); }
});

// --- Career ---
app.get('/api/career', auth, async (req, res) => {
  try { res.json(await Career.find().sort({ created_at: -1 })); } catch (err) { res.status(500).json({ message: err.message }); }
});

app.post('/api/career', upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'Resume is required' });

    const careerData = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      position: req.body.position,
      resume_url: `/uploads/${req.file.filename}`
    };
    const newCareer = new Career(careerData);
    await newCareer.save();

    // Send Email to Admin with Resume Attachment
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.RECEIVER_EMAIL,
      subject: `Job Application: ${newCareer.position} - ${newCareer.name}`,
      html: `
        <h3>New Job Application Received</h3>
        <p><b>Applicant Name:</b> ${newCareer.name}</p>
        <p><b>Email:</b> ${newCareer.email}</p>
        <p><b>Phone:</b> ${newCareer.phone}</p>
        <p><b>Applied for Position:</b> ${newCareer.position}</p>
        <p>Note: Resume is attached to this email.</p>
      `,
      attachments: [
        {
          filename: req.file.originalname,
          path: req.file.path
        }
      ]
    };
    transporter.sendMail(mailOptions).catch(err => console.log('Career Email Error:', err));

    res.status(201).json(newCareer);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

app.delete('/api/career/:id', auth, async (req, res) => {
  try {
    const item = await Career.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Application not found' });
    const filePath = path.join(uploadsDir, item.resume_url.split('/').pop());
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    await Career.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// --- Contact Enquiry ---
app.get('/api/contact', auth, async (req, res) => {
  try { res.json(await Contact.find().sort({ created_at: -1 })); } catch (err) { res.status(500).json({ message: err.message }); }
});

app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    if (!name || !email || !phone || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newContact = new Contact({ name, email, phone, message });
    await newContact.save();

    // Send Email Notification to Admin
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.RECEIVER_EMAIL,
      subject: `New Contact Enquiry from ${name}`,
      html: `
        <h3>New Contact Message</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Message:</b></p>
        <p>${message}</p>
      `
    };
    transporter.sendMail(mailOptions).catch(err => console.log('Contact Email Error:', err));

    res.status(200).json(newContact);
  } catch (err) { 
    res.status(500).json({ message: err.message }); 
  }
});

app.delete('/api/contact/:id', auth, async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// --- Syllabus ---
app.get('/api/syllabus', async (req, res) => {
  try { res.json(await Syllabus.find().sort({ sort_order: 1 })); } catch (err) { res.status(500).json({ message: err.message }); }
});

app.post('/api/syllabus', auth, async (req, res) => {
  try { res.status(201).json(await new Syllabus(req.body).save()); } catch (err) { res.status(500).json({ message: err.message }); }
});

app.put('/api/syllabus/:id', auth, async (req, res) => {
  try {
    const updated = await Syllabus.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

app.delete('/api/syllabus/:id', auth, async (req, res) => {
  try {
    await Syllabus.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// --- Gallery ---
app.get('/api/gallery', async (req, res) => {
  try { res.json(await Gallery.find().sort({ created_at: -1 })); } catch (err) { res.status(500).json({ message: err.message }); }
});

app.post('/api/gallery', auth, upload.array('images', 10), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) return res.status(400).json({ message: 'Images required' });
    const results = [];
    for (const file of req.files) {
      const item = new Gallery({ title: req.body.title, image_url: `/uploads/${file.filename}` });
      await item.save();
      results.push(item);
    }
    res.status(201).json(results);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

app.delete('/api/gallery/:id', auth, async (req, res) => {
  try {
    const item = await Gallery.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Photo not found' });
    const filePath = path.join(uploadsDir, item.image_url.split('/').pop());
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    await Gallery.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

const PORT = process.env.PORT || 7009;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
