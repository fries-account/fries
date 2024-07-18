const Review = require('../models/Review');
const Establishment = require('../models/Establishment');
const mongoose = require('mongoose');

const createReview = async(req, res) => {
    const { reviewerName, reviewerImageIndex, reviewedEstablishment, score, comment, likes, dislikes, desc } = req.body;

    try {
        const review = await Review.create({ reviewerName, reviewerImageIndex, reviewedEstablishment, score, comment, likes, dislikes, desc });
        res.status(200).json(review);
    } catch(error) {
        res.status(200).json({error: error.message});
    }
};

const getAllEstablishmentReviews = async (req, res) => {
    const { establishmentName } = req.params; // Assuming you are passing the establishment name in the URL parameters

    if (!establishmentName) {
        return res.status(400).json({ message: "Establishment name is required" });
    }

    try {
        const reviews = await Review.find({ reviewedEstablishment: establishmentName }).sort({ createdAt: -1 });
        res.status(200).json(reviews);
    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getAllUserReviews = async (req, res) => {
    const { userName } = req.params; // Assuming you are passing the establishment name in the URL parameters

    if (!userName) {
        return res.status(400).json({ message: "Establishment name is required" });
    }

    try {
        const reviews = await Review.find({ reviewerName: userName }).sort({ createdAt: -1 });
        res.status(200).json(reviews);
    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const updateLike = async (req, res) => {
    const { id } = req.params; // Get the review ID from the URL parameters

    if (!id) {
        return res.status(400).json({ message: "Review ID is required" });
    }

    try {
        // Find the review and increment the likes
        const review = await Review.findByIdAndUpdate(
            id,
            { $inc: { likes: 1 } }, // Increment the likes field by 1
            { new: true } // Return the updated review
        );

        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }

        res.status(200).json(review);
    } catch (error) {
        console.error('Error updating review likes:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const updateDislike = async (req, res) => {
    const { id } = req.params; // Get the review ID from the URL parameters

    if (!id) {
        return res.status(400).json({ message: "Review ID is required" });
    }

    try {
        // Find the review and increment the dislikes
        const review = await Review.findByIdAndUpdate(
            id,
            { $inc: { dislikes: 1 } }, // Increment the dislikes field by 1
            { new: true } // Return the updated review
        );

        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }

        res.status(200).json(review);
    } catch (error) {
        console.error('Error updating review dislikes:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


const updateReply = async (req, res) => {

    const { reviewId } = req.params;
    const { reply } = req.body;

    console.log(reply)
    console.log(reviewId)
  
    try {
      const updatedReview = await Review.findByIdAndUpdate(
        reviewId,
        { reply },
        { new: true }
      );
  
      if (!updatedReview) {
        return res.status(404).json({ message: 'Review not found' });
      }
  
      res.status(200).json(updatedReview);
    } catch (error) {
      res.status(500).json({ message: 'Error updating reply', error });
    }
};

  

module.exports = {
    createReview,
    getAllEstablishmentReviews,
    getAllUserReviews,
    updateLike,
    updateDislike,
    updateReply
}
