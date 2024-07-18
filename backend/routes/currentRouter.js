const express = require('express');
const router = express.Router();

const {
    getCurrent,
    updateCurrent
} = require('../controllers/currentController');


router.get('/get-current', getCurrent);
router.put('/update-current/:id', updateCurrent);

module.exports = router;