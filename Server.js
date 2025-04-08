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
  origin: 'https://www.ramajamasttown.com',
  methods: 'GET,POST,PUT,DELETE,OPTIONS',
  allowedHeaders: 'Content-Type,Authorization',
  optionsSuccessStatus: 200, // For legacy browser support
};

// Use CORS middleware with the defined options
app.use(cors(corsOptions));

// Explicitly handle preflight OPTIONS requests for all routes
app.options('*', cors(corsOptions));

// Other middleware (e.g., parsing JSON) should come after CORS setup.
app.use(express.json());

// Sample route to check API status
app.get('/api/status', (req, res) => {
  res.json({ status: 'open', message: 'We are currently open!' });
});

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
  res.send('Order received test');
});

// POST /api/orders - Create a new order
app.post('/api/orders', async (req, res) => {
  console.log("Received order payload:", JSON.stringify(req.body, null, 2));
  const order = req.body;
  
  // Validate the request body (using your Joi schema)
  const { error } = require('./Validation').orderSchema.validate(order);
  if (error) {
    console.error('Validation error:', error);
    return res.status(400).json({ error: error.details[0].message });
  }
  
  try {
    const Order = require('./order');
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
