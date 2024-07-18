const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Establishment = new Schema({
    name: { type: String, required: true },
    rating: { type: String, required: true },
    description: { type: String },
    imageIndex: { type: Number },
}, { timestamps: true });

module.exports = mongoose.model('Establishment', Establishment);