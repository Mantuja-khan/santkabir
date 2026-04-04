const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const User = require('./models/User');

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB for seeding...');

    const adminEmail = 'santkabirschool@gmail.com';
    const adminPassword = 'santkabirschool@789';

    const existingUser = await User.findOne({ email: adminEmail });
    if (existingUser) {
      console.log('Admin user already exists. Updating password...');
      const salt = await bcrypt.genSalt(10);
      existingUser.password = await bcrypt.hash(adminPassword, salt);
      await existingUser.save();
      console.log('Admin password updated successfully.');
    } else {
      const newAdmin = new User({
        email: adminEmail,
        password: adminPassword,
        role: 'admin'
      });
      await newAdmin.save();
      console.log('Admin user created successfully.');
    }

    mongoose.disconnect();
    console.log('Seeding complete.');
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
};

seedAdmin();
