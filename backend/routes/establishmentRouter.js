const express = require('express');
const router = express.Router();

const {
    getAllEstablishments,
    getEstablishment,
    updateRating,
    getEstablishmentByName
} = require('../controllers/establishmentController');


router.get('/get-all-establishments', getAllEstablishments);
router.get('/get-establishment/:id', getEstablishment);
router.patch('/update-rating/:name', updateRating);
router.get('/get-establishment-by-name/:establishmentName', getEstablishmentByName)

module.exports = router;