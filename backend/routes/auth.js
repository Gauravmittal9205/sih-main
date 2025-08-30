const express = require('express');
const { check } = require('express-validator');
const { register, login, logout, getUserProfile, updateFarmData, forgotPassword } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post(
  '/register',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('phone', 'Please include a valid phone number').matches(/^[0-9]{10,15}$/),
    check('flatNo', 'Flat/House number is required').not().isEmpty(),
    check('street', 'Street address is required').not().isEmpty(),
    check('district', 'District is required').not().isEmpty(),
    check('state', 'State is required').not().isEmpty(),
    check('aadhaarNumber', 'Please provide a valid 12-digit Aadhaar number').matches(/^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/),
    check('village', 'Please include your village name').not().isEmpty(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
  ],
  register
);

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  login
);

// @route   POST /api/auth/logout
// @desc    Logout user / clear cookie
// @access  Private
router.post('/logout', logout);

// @route   GET /api/auth/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', protect, getUserProfile);

// @route   PUT /api/auth/farm-data
// @desc    Update farm data
// @access  Private
router.put('/farm-data', protect, updateFarmData);

// @route   POST /api/auth/forgot-password
// @desc    Forgot password - verify email and current password, then update password
// @access  Public
router.post(
  '/forgot-password',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('oldPassword', 'Current password is required').exists(),
    check('newPassword', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
  ],
  forgotPassword
);

module.exports = router;
