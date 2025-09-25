const mongoose = require('mongoose');

const foodPartnerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    contactName: { type: String, required: true },
    phone: { type: String },
    address: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    googleId: { type: String, unique: true, sparse: true },
    profileImage: { type: String },
    authProvider: { type: String, enum: ['local', 'google'], default: 'local' },
}, { timestamps: true });

const FoodPartner = mongoose.model('FoodPartner', foodPartnerSchema);

module.exports = FoodPartner;