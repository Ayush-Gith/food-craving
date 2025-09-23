const mongoose = require('mongoose');

const foodItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    video: { type: String, required: true },
    description: { type: String },
    foodPartner: { type: mongoose.Schema.Types.ObjectId, ref: 'FoodPartner', required: true },
    likeCount: { type: Number,  default: 0},
    bookmarkCount: { type: Number,  default: 0},
    commentCount: { type: Number,  default: 0},
}, { timestamps: true });

const FoodItem = mongoose.model('FoodItem', foodItemSchema);

module.exports = FoodItem;