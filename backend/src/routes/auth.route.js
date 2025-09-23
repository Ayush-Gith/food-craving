const express = require('express');
const authController = require('../controllers/auth.controller');
const router = express.Router();

// User auth APIs
router.post('/user/login', authController.userLogin);
router.post('/user/register', authController.userRegister);
router.post('/user/logout', authController.userLogout);

// Food partner auth APIs
router.post('/food-partner/login', authController.foodPartnerLogin);
router.post('/food-partner/register', authController.foodPartnerRegister);
router.post('/food-partner/logout', authController.foodPartnerLogout);

module.exports = router;