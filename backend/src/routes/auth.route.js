const express = require('express');
const authController = require('../controllers/auth.controller');
const passport = require('../config/passport');
const router = express.Router();

// User auth APIs
router.post('/user/login', authController.userLogin);
router.post('/user/register', authController.userRegister);
router.post('/user/logout', authController.userLogout);

// Food partner auth APIs
router.post('/food-partner/login', authController.foodPartnerLogin);
router.post('/food-partner/register', authController.foodPartnerRegister);
router.post('/food-partner/logout', authController.foodPartnerLogout);

// Google OAuth routes for Users
router.get('/google/user', 
    passport.authenticate('google-user', { scope: ['profile', 'email'] })
);

router.get('/google/user/callback',
    passport.authenticate('google-user', { failureRedirect: '/api/auth/google/failure' }),
    authController.googleAuthSuccess
);

// Google OAuth routes for Partners
router.get('/google/partner',
    passport.authenticate('google-partner', { scope: ['profile', 'email'] })
);

router.get('/google/partner/callback',
    passport.authenticate('google-partner', { failureRedirect: '/api/auth/google/failure' }),
    authController.googleAuthSuccess
);

// Common failure route
router.get('/google/failure', authController.googleAuthFailure);

module.exports = router;