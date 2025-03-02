const { required, options } = require('joi');
const mongoose = require('mongoose');
array = mongoose.Schema.Types.Array;


const itemSchema = new mongoose.Schema({
  id: Number,
  quantity: Number,
  name: String,
  price: Number,
  instructions: String,
  options: {
    type: mongoose.Schema.Types.Mixed,  
    default: {}
  }
}, { _id: false });


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
  items: [itemSchema],
  total: Number,
  createdAt: { type: Date, default: Date.now },
}, {
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;

      // Convert 24-hour time
      if (ret.pickup && typeof ret.pickup.time === 'string') {
        const [hourStr, minStr] = ret.pickup.time.split(':');
        let hour = parseInt(hourStr, 10);
        const minute = parseInt(minStr, 10);

        let suffix = 'AM';
        if (hour === 0) {
          hour = 12; // 00:xx => 12 AM
        } else if (hour === 12) {
          suffix = 'PM'; // 12 => 12 PM
        } else if (hour > 12) {
          hour -= 12;
          suffix = 'PM';
        }
        const minutePad = minute < 10 ? `0${minute}` : minute;
        ret.pickup.time = `${hour}:${minutePad} ${suffix}`;
      }
    },
  },
});

module.exports = mongoose.model('Order', orderSchema);
