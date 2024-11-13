const express = require('express');
const app = express();
const cors = require('cors');

// Middleware
app.use(cors());
app.use(express.json()); // body-parser middleware

// Define the port
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
// In-memory array to store orders (temporary)
let orders = [];

// POST /api/orders - Create a new order
app.post('/api/orders', (req, res) => {
  const order = req.body;

  // TODO: Implement order validation and processing logic

  // For now, just add the order to the orders array
  orders.push(order);

  res.status(201).json({ message: 'Order received', orderId: orders.length - 1 });
});
const { orderSchema } = require('./Validation');

// POST /api/orders - Create a new order
app.post('/api/orders', (req, res) => {
  const order = req.body;

  // Validate the order
  const { error } = orderSchema.validate(order);

  if (error) {
    // Return a 400 Bad Request error if validation fails
    return res.status(400).json({ error: error.details[0].message });
  }

  // Process the order (e.g., save to database)
  orders.push(order);

  res.status(201).json({ message: 'Order received', orderId: orders.length - 1 });
});
// Configure CORS
const corsOptions = {
    origin: 'http://localhost:5500', // Allow requests from the specified origin
    optionsSuccessStatus: 200,
  };
  
  app.use(cors(corsOptions));

  require('dotenv').config();
  const mongoose = require('mongoose');
  const Order = require('./models/Order');
  
  // Connect to MongoDB
  mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
  
  // Update POST /api/orders route
  app.post('/api/orders', async (req, res) => {
    const order = req.body;
  
    // Validate the order
    const { error } = orderSchema.validate(order);
  
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
  
    try {
      // Save order to database
      const newOrder = new Order(order);
      const savedOrder = await newOrder.save();
  
      res.status(201).json({ message: 'Order received', orderId: savedOrder._id });
    } catch (err) {
      res.status(500).json({ error: 'Failed to save order' });
    }
  });