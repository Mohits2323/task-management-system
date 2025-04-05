// server.js
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = express();
const adminRoutes = require('./routes/admin');

// Configure environment variables
dotenv.config();

// Middleware to parse JSON
app.use(express.json());
app.use('/api/admin', adminRoutes);


// Test route
app.get('/', (req, res) => {
    res.send('Task Management System API is running 🚀');
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected successfully ✅'))
.catch(err => console.error('MongoDB connection error:', err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} ✅`);
});
