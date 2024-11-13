

const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customer: {
    name: String,
    email: String,
    phone: String,
  },
  pickup: {
    date: Date,
    time: String,
  },
  items: Array,
  total: Number,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);
