const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  benefits: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Plan', planSchema);
