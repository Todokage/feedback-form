// models/User.js

const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    age: {
        type: Number,
        required: false,
    },
}, { timestamps: true }); // Adds createdAt and updatedAt fields

// Export the User model
module.exports = mongoose.model('User', userSchema);