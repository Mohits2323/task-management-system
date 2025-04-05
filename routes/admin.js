const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

// Import Admin model (we will create this next)
const Admin = require('../models/admin');

// Admin registration route
router.post('/register-admin', async (req, res) => {
    try {
        const { username, email, password, companyName, companyCode } = req.body;

        // Simple validation
        if (!username || !email || !password || !companyName || !companyCode) {
            return res.status(400).json({ message: 'Please enter all fields' });
        }

        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Admin already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new admin
        const newAdmin = new Admin({
            username,
            email,
            password: hashedPassword,
            companyName,
            companyCode
        });

        // Save to DB
        await newAdmin.save();

        res.status(201).json({ message: 'Admin registered successfully!' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
