const foodPartnerModel = require('../models/food-partner.model');
const foodModel = require('../models/food.model');

const getFoodPartnerById = async (req, res) => {
    try {
        const partnerId = req.params.id;
        const foodPartner = await foodPartnerModel.findById(partnerId).select('-password'); // Exclude password

        if (!foodPartner) {
            return res.status(404).json({ message: 'Food partner not found' });
        }

        const foodItems = await foodModel.find({ foodPartner: partnerId });
        
        // Convert Mongoose document to plain JavaScript object
        const foodPartnerObject = foodPartner.toObject();
        
        // Now we can add the foodItems
        foodPartnerObject.foodItems = foodItems;

        res.status(200).json({ message: 'Food partner fetched successfully', foodPartner: foodPartnerObject });
    } catch (error) {
        console.error('Error fetching food partner:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    getFoodPartnerById
};