const express = require('express');
const foodController = require('../controllers/food.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const router = express.Router();

const multer = require('multer');

// Multer configuration for file uploads

const upload = multer({ storage: multer.memoryStorage() });

// Food partner APIs
// POST /api/food [PROTECTED]
router.post('/food-partner/add-food-post', authMiddleware.authFoodPartnerMiddleware, upload.single('video'), foodController.addFoodItem);


// User APIs
// GET /api/food [PROTECTED]
router.get('/foods', authMiddleware.authUserMiddleware, foodController.getAllFoods);
router.get('/likes', authMiddleware.authUserMiddleware, foodController.likeFood);
router.get('/bookmark', authMiddleware.authUserMiddleware, foodController.bookmarkFood);
router.get('/comment', authMiddleware.authUserMiddleware, foodController.commentFood);
router.get('bookmark-food-list', authMiddleware.authUserMiddleware, foodController.getbookmarkedFood)

module.exports = router;