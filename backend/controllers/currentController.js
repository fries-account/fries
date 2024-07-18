const Current = require('../models/Current');
const mongoose = require('mongoose');


const getCurrent = async (req, res) => {
    const current = await Current.findOne();

    if (!current) {
        return res.status(404).json({ error: 'Current not found' });
    }

    res.status(200).json(current);
};
  

const updateCurrent = async (req, res) => {

    const { id } = req.params;
    const updatedData = req.body;

    const updatedCurrent = await Current.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });

    if (!updatedCurrent) {
        return res.status(404).json({ error: 'Current not found' });
    }

    res.status(200).json(updatedCurrent);

};


module.exports = {
    getCurrent,
    updateCurrent
}
  