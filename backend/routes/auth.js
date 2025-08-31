const express = require('express');
const { check } = require('express-validator');
const { register, registerVet, login, logout, getUserProfile, updateFarmData } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const multer = require('multer');
const path = require('path');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/documents/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: function (req, file, cb) {
    const allowedTypes = /jpeg|jpg|png|pdf/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image and PDF files are allowed'));
    }
  }
});

// @route   POST /api/auth/register
// @desc    Register a new farmer
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
    check('aadhaarNumber', 'Please include a valid Aadhaar number').matches(/^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/),
    check('village', 'Village is required').not().isEmpty(),
    check('farmSize', 'Farm size is required').not().isEmpty(),
    check('livestockType', 'Livestock type is required').not().isEmpty(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
  ],
  register
);

// @route   POST /api/auth/register-vet
// @desc    Register a new vet
// @access  Public
router.post(
  '/register-vet',
  upload.fields([
    { name: 'license', maxCount: 1 },
    { name: 'degree', maxCount: 1 },
    { name: 'idProof', maxCount: 1 }
  ]),
  registerVet
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

module.exports = router;
