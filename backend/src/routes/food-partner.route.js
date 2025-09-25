const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const foodPartnerController = require('../controllers/food-partner.controller');
const router = express.Router();

// GET /api/food-partner/profile [PROTECTED - Partner Only]
router.get('/profile', authMiddleware.authFoodPartnerMiddleware, foodPartnerController.getPartnerProfile);

// PUT /api/food-partner/complete-profile [PROTECTED - Partner Only]
router.put('/complete-profile', authMiddleware.authFoodPartnerMiddleware, foodPartnerController.completePartnerProfile);

// GET /api/food-partner/:id [PROTECTED]
router.get('/:id', authMiddleware.authUserMiddleware, foodPartnerController.getFoodPartnerById);

module.exports = router;