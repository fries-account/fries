const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Current = new Schema({
    username: { type: String, required: true },
    avatarIndex: { type: Number },
    description: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Current', Current);