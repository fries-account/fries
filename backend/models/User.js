const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const User = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    avatar: { type: Number },
    description: { type: String },
    isOwner: { type: Boolean , required: true, default: false },
}, { timestamps: true });

module.exports = mongoose.model('User', User);