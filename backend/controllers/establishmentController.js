const Establishment = require('../models/Establishment');
const mongoose = require('mongoose');



const getAllEstablishments = async(req, res) => {
    const establishments = await Establishment.find({}).sort({createdAt: -1});
    res.status(200).json(establishments);
};


const getEstablishment = async(req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'User does not exist' });
    }

    const establishment = await Establishment.findById(id);

    if (!establishment) {
        return res.status(404).json({error: 'Establishment does not exist'})
    } 

    res.status(200).json(establishment);
};

const getEstablishmentByName = async(req, res) => {
  const { establishmentName } = req.params;
  const establishment = await Establishment.findOne({ name: establishmentName });

  if (!establishment) {
      return res.status(404).json({error: 'Establishment does not exist'})
  } 

  res.status(200).json(establishment);
};



const updateRating = async (req, res) => {
    const { name } = req.params;
    const { rating } = req.body;

    console.log(name)
    console.log(rating)
  
    try {
      const result = await Establishment.updateOne(
        { name },
        { $set: { rating } }
      );


  
      if (result) {
        res.status(200).json({ message: 'Rating updated successfully' });
      } else {
        res.status(404).json({ message: 'Establishment not found' });
      }
    } catch (error) {
      console.error('Error updating rating:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
};


module.exports = {
    getAllEstablishments,
    getEstablishment,
    updateRating,
    getEstablishmentByName
}
