const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Load environment variables FIRST
require('dotenv').config({ path: __dirname + '/.env' });
console.log('DATABASE_URL is:', process.env.DATABASE_URL);

// Create Express app
const app = express();

// CORS configuration
const corsOptions = {
  origin: [
    'http://localhost:5500',
    'http://127.0.0.1:5500',
    'https://www.ramajamasttown.com',
    'https://rama-jamas.uc.r.appspot.com'
  ],
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Parse JSON request bodies
app.use(express.json());
function isBusinessOpen() {
  const now = new Date();
  const hour = now.getHours();   // 0-23
  // 8 <= hour < 20 means 8:00 AM to 7:59 PM
  // (so 8:00 PM => hour=20 is closed)
  return hour >= 8 && hour < 20;
}

// In server.js or a route file:
app.get('/api/status', (req, res) => {
  const open = isBusinessOpen();
  if (open) {
    res.json({ status: 'open', message: 'We are currently open!' });
  } else {
    res.json({ status: 'closed', message: 'We are currently closed.' });
  }
});

// Mongoose model + validation schema
const { orderSchema } = require('./Validation');
const Order = require('./order'); // <- your Mongoose model

// Connect to MongoDB
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log('Connected to MongoDB successfully!');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });


// Root route 
app.get('/', (req, res) => {
  res.send('Order received test ');
});

// POST /api/orders - Create a new order
app.post('/api/orders', async (req, res) => {
  console.log("Received order payload:", JSON.stringify(req.body, null, 2));
  const order = req.body;
  
  // Validate the request body with Joi
  const { error } = orderSchema.validate(order);
  if (error) {
    console.error('Validation error:', error);
    return res.status(400).json({ error: error.details[0].message });
  }
  
  try {
    const newOrder = new Order(order);
    const savedOrder = await newOrder.save();
    console.log("Saved order to DB:", JSON.stringify(savedOrder, null, 2));
    return res.status(201).json({ message: 'Order received', orderId: savedOrder._id });
  } catch (err) {
    console.error('Error saving order:', err);
    return res.status(500).json({ error: 'Failed to save order' });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
