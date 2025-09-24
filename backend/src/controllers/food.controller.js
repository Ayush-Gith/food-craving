const foodModel = require('../models/food.model');
const likeModel = require('../models/likes.model');
const bookmarkModel = require('../models/bookmark.model');
const commentFoodModel = require('../models/commentFood.model');
const storageServices = require('../services/storage.service');
import('uuid').then(uuid => {
    global.uuid = uuid.v4;
}).catch(err => console.error('Failed to load uuid:', err));


const addFoodItem = async (req, res) => {
    try {
        const { name, description } = req.body;
        const foodPartnerId = req.foodPartner._id;
        
        if (!req.file) {
            return res.status(400).json({ message: 'Video file is required' });
        }

        // Generate a unique filename for the upload
        const filename = `${global.uuid()}-${Date.now()}`;
        
        // Upload the file and get the result
        const fileUploadResult = await storageServices.uploadFile(req.file.buffer, filename);

        // Create new food item with the uploaded video URL
        const newFoodItem = new foodModel({
            name,
            description,
            video: fileUploadResult.url,
            foodPartner: foodPartnerId,
        });

        // Save the food item to database
        await newFoodItem.save();
        
        // Send success response
        res.status(201).json({ 
            message: 'Food item added successfully', 
            foodItem: newFoodItem 
        });
    } catch (error) {
        console.error('Error in addFoodItem:', error);
        res.status(500).json({ 
            message: 'Failed to add food item', 
            error: error.message 
        });
    }
};

const getAllFoods = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.status(200).json({ foods });
    } catch (error) {
        console.error('Error in getAllFoods:', error);
        res.status(500).json({ message: 'Failed to fetch food items', error: error.message });
    }
};  

const likeFood = async (req, res) => {
    const { foodId } = req.body;
    const user  = req.user;

    const isAlreadyLiked = await likeModel.findOne({
        user: user._id,
        food: foodId
    });

    if(isAlreadyLiked) {
        await likeModel.deleteOne({
            user: user._id,
            food: foodId
        });
        await foodModel.findByIdAndUpdate(foodId, {
            $inc : { likeCount: -1}
        });
        // Get updated like count
        const food = await foodModel.findById(foodId);
        return res.status(200).json({
            message: 'Reel unliked successfully.',
            liked: false,
            likes: food ? food.likeCount : 0
        });
    }

    const likeReel = new likeModel({
        user: user._id,
        food: foodId
    });
    await foodModel.findByIdAndUpdate(foodId, {
        $inc : { likeCount: 1}
    });

    await likeReel.save();
    // Get updated like count
    const food = await foodModel.findById(foodId);
    return res.status(200).json({
        message: 'Reel liked successfully.',
        liked: true,
        likes: food ? food.likeCount : 0
    });
};

const bookmarkFood = async (req, res) => {
    const { foodId } = req.body;
    const user  = req.user;

    const isAlreadyBookmarked = await bookmarkModel.findOne({
        user: user._id,
        food: foodId
    });

    if(isAlreadyBookmarked) {
        await bookmarkModel.deleteOne({
            user: user._id,
            food: foodId
        });
        await foodModel.findByIdAndUpdate(foodId, {
            $inc : { bookmarkCount: -1}
        });
        // Get updated bookmark count
        const food = await foodModel.findById(foodId);
        return res.status(200).json({
            message: 'Bookmark removed successfully.',
            bookmarked: false,
            bookmarks: food ? food.bookmarkCount : 0
        });
    }

    const bookmark = new bookmarkModel({
        user: user._id,
        food: foodId
    });
    await foodModel.findByIdAndUpdate(foodId, {
        $inc : { bookmarkCount: 1}
    });

    await bookmark.save();
    // Get updated bookmark count
    const food = await foodModel.findById(foodId);
    return res.status(200).json({
        message: 'Reel bookmarked successfully.',
        bookmarked: true,
        bookmarks: food ? food.bookmarkCount : 0
    });
};

const commentFood = async (req, res) => {
    try {
        const { foodId } = req.body;
        const user  = req.user;

        const comment = new commentFoodModel({
            user: user._id,
            food: foodId
        });

        await foodModel.findByIdAndUpdate(foodId, {
            $inc : { commentCount: 1}
        });

        await comment.save();
        return res.status(200).json({ message: 'Reel liked successfully.' });
    } catch (error) {
        console.error('Error commenting on the food post:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to comment on the food post',
            error: error.message,
        });
    }
};

const getbookmarkedFood = async (req, res) => {
    try {
        const userId = req.user._id

        // Find all bookmarks by the user and populate the food details
        const bookmarks = await Bookmark.find({ user: userId }).populate({
            path: 'food',
            model: 'food',
        });

        // Extract the populated food documents
        const bookmarkedFoods = bookmarks.map(bookmark => bookmark.food);

        res.status(200).json({
            success: true,
            count: bookmarkedFoods.length,
            data: bookmarkedFoods,
        });
    } catch (error) {
        console.error('Error fetching bookmarked food:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch bookmarked food',
            error: error.message,
        });
    }
};

module.exports = { addFoodItem, getAllFoods, likeFood, bookmarkFood, commentFood, getbookmarkedFood };