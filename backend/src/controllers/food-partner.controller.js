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

const getPartnerProfile = async (req, res) => {
    try {
        const partnerId = req.foodPartner._id;
        const partner = await foodPartnerModel.findById(partnerId).select('-password -googleId');
        
        if (!partner) {
            return res.status(404).json({ message: 'Partner not found' });
        }

        res.status(200).json({ 
            success: true, 
            message: 'Partner profile fetched successfully', 
            data: partner 
        });
    } catch (error) {
        console.error('Error fetching partner profile:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const completePartnerProfile = async (req, res) => {
    try {
        const partnerId = req.foodPartner._id;
        const { name, phone, address } = req.body;

        if (!name || !phone || !address) {
            return res.status(400).json({ message: 'Name, phone, and address are required' });
        }

        const updatedPartner = await foodPartnerModel.findByIdAndUpdate(
            partnerId,
            { name, phone, address },
            { new: true, runValidators: true }
        ).select('-password -googleId');

        if (!updatedPartner) {
            return res.status(404).json({ message: 'Partner not found' });
        }

        res.status(200).json({
            success: true,
            message: 'Profile completed successfully',
            data: updatedPartner
        });
    } catch (error) {
        console.error('Error completing partner profile:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    getFoodPartnerById,
    getPartnerProfile,
    completePartnerProfile
};