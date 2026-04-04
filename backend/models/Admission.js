const mongoose = require('mongoose');

const AdmissionSchema = new mongoose.Schema({
  student_name: { type: String, required: true },
  class_applied: { type: String, required: true },
  phone_number: { type: String, required: true },
  father_name: { type: String, required: true },
  mother_name: { type: String, required: true },
  age: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

AdmissionSchema.pre('save', function(next) {
  this.updated_at = Date.now();
  next();
});

module.exports = mongoose.model('Admission', AdmissionSchema);
