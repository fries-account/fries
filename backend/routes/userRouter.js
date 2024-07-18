const express = require('express');
const router = express.Router();

const {
    getAllUsers,
    getUser,
    createUser,
    deleteUser,
    updateUser
} = require('../controllers/userController');


router.get('/get-all-users', getAllUsers);
router.get('/get-user/:id', getUser);

router.post('/create-user', createUser);

router.delete('/delete-user/:id', deleteUser);
router.patch('/update-user/:username', updateUser);




module.exports = router;