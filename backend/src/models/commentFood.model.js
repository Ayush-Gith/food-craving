const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    food: { type: mongoose.Schema.Types.ObjectId, ref: 'food', required: true },
    comment: {type: String},
}, { timestamps: true });

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;