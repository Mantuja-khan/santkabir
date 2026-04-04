const mongoose = require('mongoose');

const SyllabusSchema = new mongoose.Schema({
  class_name: { type: String, required: true },
  group_name: { type: String, required: true },
  subjects: { type: [String], default: [] },
  sort_order: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

SyllabusSchema.pre('save', function(next) {
  this.updated_at = Date.now();
  next();
});

module.exports = mongoose.model('Syllabus', SyllabusSchema);
