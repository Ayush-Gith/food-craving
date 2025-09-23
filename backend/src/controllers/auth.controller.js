const userModel = require('../models/user.model');
const foodPartnerModel = require('../models/food-partner.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userRegister = async (req, res) => {
    const { fullname, email, password } = req.body;

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
        return res.status(409).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({
        fullname,
        email,
        password: hashedPassword,
    });
    await newUser.save();

    const token = jwt.sign({ id: newUser._id}, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie('token', token);

    res.status(201).json({ message: 'User registered successfully', user: { id: newUser._id, fullname, email } });
};

const userLogin = async (req, res) => {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie('token', token);

    res.status(200).json({ message: 'User logged in successfully', user: { id: user._id, fullname: user.fullname, email } });
};

const userLogout = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'User logged out successfully' });
};

const foodPartnerRegister = async (req, res) => {
    const { name, contactName, phone, address, email, password } = req.body;

    const existingUser = await foodPartnerModel.findOne({ email });
    if (existingUser) {
        return res.status(409).json({ message: 'Food Partner already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new foodPartnerModel({
        name, 
        contactName,
        phone,
        address,
        email,
        password: hashedPassword,
    });
    await newUser.save();

    const token = jwt.sign({ id: newUser._id}, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie('token', token);

    res.status(201).json({ message: 'Food Partner registered successfully', user: { id: newUser._id, name, contactName, phone, address, email } });
};

const foodPartnerLogin = async (req, res) => {
    const { email, password } = req.body;

    const user = await foodPartnerModel.findOne({ email });
    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie('token', token);

    res.status(200).json({ message: 'Food Partner logged in successfully', user: { id: user._id, fullname: user.fullname, email } });
};

const foodPartnerLogout = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Food Partner logged out successfully' });
};

module.exports = {
    userRegister,
    userLogin,
    userLogout,
    foodPartnerRegister,
    foodPartnerLogin,
    foodPartnerLogout
};