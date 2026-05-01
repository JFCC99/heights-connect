const mongoose = require('mongoose')

const businessSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String },
  hours: { type: String },
  website: { type: String },
  instagram: { type: String },
  approved: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Business', businessSchema)