const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  gender: { type: String, required: true },
  plan: { type: String, required: true },
  price: { type: Number, required: true },
  address: { type: String, required: true },
  location: { type: String, required: true },
  startDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Member', memberSchema);