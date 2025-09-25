const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullname: { type: String, required: true},
    email: { type: String, required: true, unique: true },
    password: { type: String},
    googleId: { type: String, unique: true, sparse: true },
    profileImage: { type: String },
    authProvider: { type: String, enum: ['local', 'google'], default: 'local' },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;