
const express = require('express');
const router = express.Router();

const {
    createReview,
    getAllEstablishmentReviews,
    getAllUserReviews,
    updateLike,
    updateDislike,
    updateReply
} = require('../controllers/reviewController');

router.get('/get-all-establishment-reviews/:establishmentName', getAllEstablishmentReviews);
router.get('/get-all-user-reviews/:userName', getAllUserReviews);
router.post('/create-review', createReview);
router.patch('/update-like/:id', updateLike);
router.patch('/update-dislike/:id', updateDislike);
router.patch('/update-reply/:reviewId', updateReply)

module.exports = router;