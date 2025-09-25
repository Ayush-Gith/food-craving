const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const userModel = require('../models/user.model');
const foodPartnerModel = require('../models/food-partner.model');

// Serialize user for session
passport.serializeUser((user, done) => {
    done(null, { id: user._id, type: user.type });
});

// Deserialize user from session
passport.deserializeUser(async (obj, done) => {
    try {
        let user;
        if (obj.type === 'user') {
            user = await userModel.findById(obj.id);
            user.type = 'user';
        } else if (obj.type === 'partner') {
            user = await foodPartnerModel.findById(obj.id);
            user.type = 'partner';
        }
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

// Google OAuth Strategy for Users
passport.use('google-user', new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/auth/google/user/callback"
}, async (accessToken, refreshToken, profile, done) => {
    try {
        // Check if user already exists with this Google ID
        let user = await userModel.findOne({ googleId: profile.id });
        
        if (user) {
            user.type = 'user';
            return done(null, user);
        }

        // Check if user exists with the same email
        user = await userModel.findOne({ email: profile.emails[0].value });
        
        if (user) {
            // Link the Google account to existing user
            user.googleId = profile.id;
            user.profileImage = profile.photos[0]?.value;
            user.authProvider = 'google';
            await user.save();
            user.type = 'user';
            return done(null, user);
        }

        // Create new user
        user = new userModel({
            googleId: profile.id,
            fullname: profile.displayName,
            email: profile.emails[0].value,
            profileImage: profile.photos[0]?.value,
            authProvider: 'google'
        });

        await user.save();
        user.type = 'user';
        done(null, user);
    } catch (error) {
        done(error, null);
    }
}));

// Google OAuth Strategy for Food Partners
passport.use('google-partner', new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/auth/google/partner/callback"
}, async (accessToken, refreshToken, profile, done) => {
    try {
        // Check if partner already exists with this Google ID
        let partner = await foodPartnerModel.findOne({ googleId: profile.id });
        
        if (partner) {
            partner.type = 'partner';
            return done(null, partner);
        }

        // Check if partner exists with the same email
        partner = await foodPartnerModel.findOne({ email: profile.emails[0].value });
        
        if (partner) {
            // Link the Google account to existing partner
            partner.googleId = profile.id;
            partner.profileImage = profile.photos[0]?.value;
            partner.authProvider = 'google';
            await partner.save();
            partner.type = 'partner';
            return done(null, partner);
        }

        // Create new partner with basic info (they'll need to complete their profile)
        partner = new foodPartnerModel({
            googleId: profile.id,
            name: profile.displayName + "'s Restaurant", // Placeholder name
            contactName: profile.displayName,
            email: profile.emails[0].value,
            profileImage: profile.photos[0]?.value,
            authProvider: 'google',
            phone: '', // Will be filled later
            address: '' // Will be filled later
        });

        await partner.save();
        partner.type = 'partner';
        done(null, partner);
    } catch (error) {
        done(error, null);
    }
}));

module.exports = passport;