const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Review = new Schema({
    reviewerName: { type: String },
    reviewerImageIndex: { type: Number },
    reviewedEstablishment: { type: String },
    
    score: { type: Number },
    comment: { type: String },
    likes: { type: Number },
    dislikes: { type: Number },
    desc: { type: String },
    reply: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Review', Review);