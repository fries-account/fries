const User = require('../models/User');
const mongoose = require('mongoose');



const getAllUsers = async(req, res) => {
    const users = await User.find({}).sort({createdAt: -1});
    res.status(200).json(users);
};


const getUser = async(req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'User does not exist' });
    }

    const user = await User.findById(id);

    if (!user) {
        return res.status(404).json({error: 'User does not exist'})
    } 

    res.status(200).json(user);
};


const createUser = async(req, res) => {
    const { username, password, description, isOwner, avatar } = req.body;

    try {
        const user = await User.create({ username, password, description, isOwner, avatar });
        res.status(200).json(user);
    } catch(error) {
        res.status(200).json({error: error.message});
    }
};


const deleteUser = async(req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'User does not exist' });
    }

    const user = await User.findOneAndDelete({ _id: id });

    if (!user) {
        return res.status(400).json({error: 'User does not exist'})
    } 

    res.status(200).json(user);
};


const updateUser = async(req, res) => {
    const { username } = req.params;

    console.log("Server " + username)

    const user = await User.findOneAndUpdate({ username: username }, {
        ...req.body
    });

    if (!user) {
        return res.status(400).json({error: 'User does not exist'})
    } 

    res.status(200).json(user);
};



module.exports = {
    getAllUsers,
    getUser,
    createUser,
    deleteUser,
    updateUser
}
