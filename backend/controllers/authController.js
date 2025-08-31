const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

// Generate JWT Token
const generateToken = (id) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in .env');
  }
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d', // Token expires in 30 days
  });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, flatNo, street, district, state, aadhaarNumber, village, farmSize, livestockType, password, role } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Check if Aadhaar number already exists
    const aadhaarExists = await User.findOne({ aadhaarNumber });
    if (aadhaarExists) {
      return res.status(400).json({ message: 'Aadhaar number already registered' });
    }

    // Combine address fields
    const address = `${flatNo}, ${street}, ${district}, ${state}`;

    // Create user
    const user = await User.create({ 
      name, 
      email, 
      phone, 
      address, 
      aadhaarNumber, 
      village, 
      farmSize,
      livestockType,
      password,
      role: role || 'farmer'
    });

    if (user) {
      const token = generateToken(user._id);

      // Set HTTP-only cookie
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      });

      res.status(201).json({
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          address: user.address,
          aadhaarNumber: user.aadhaarNumber,
          village: user.village,
          farmSize: user.farmSize,
          livestockType: user.livestockType,
          role: user.role,
        },
        token,
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    // Handle specific validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: validationErrors 
      });
    }
    
    // Handle duplicate key errors
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      const fieldName = field === 'aadhaarNumber' ? 'Aadhaar number' : field;
      return res.status(400).json({ 
        message: `${fieldName} already exists` 
      });
    }
    
    // Handle other errors
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// @desc    Register a new vet
// @route   POST /api/auth/register-vet
// @access  Public
exports.registerVet = async (req, res, next) => {
  try {
    console.log('Vet registration request received');
    console.log('Request body:', req.body);
    console.log('Request files:', req.files);
    
    // Remove validation check - allow registration without strict validation
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   console.log('Validation errors:', errors.array());
    //   return res.status(400).json({ errors: errors.array() });
    // }

    const { name, email, phone, flatNo, street, district, state, aadhaarNumber, village, qualification, specialization, experience, licenseNumber, organization, password } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Check if Aadhaar number already exists
    const aadhaarExists = await User.findOne({ aadhaarNumber });
    if (aadhaarExists) {
      return res.status(400).json({ message: 'Aadhaar number already registered' });
    }

    // Check if license number already exists
    const licenseExists = await User.findOne({ licenseNumber });
    if (licenseExists) {
      return res.status(400).json({ message: 'License number already registered' });
    }

    // Combine address fields
    const address = `${flatNo}, ${street}, ${district}, ${state}`;

    // Handle file uploads
    const documents = {};
    if (req.files) {
      if (req.files.license) {
        documents.license = req.files.license[0].path;
      }
      if (req.files.degree) {
        documents.degree = req.files.degree[0].path;
      }
      if (req.files.idProof) {
        documents.idProof = req.files.idProof[0].path;
      }
    }

    // Create vet user (automatically approved)
    const user = await User.create({ 
      name, 
      email, 
      phone, 
      address, 
      aadhaarNumber, 
      village, 
      qualification,
      specialization,
      experience,
      licenseNumber,
      organization,
      password,
      role: 'vet',
      isApproved: true, // Automatically approve vets
      documents
    });

    if (user) {
      res.status(201).json({
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          address: user.address,
          aadhaarNumber: user.aadhaarNumber,
          village: user.village,
          qualification: user.qualification,
          specialization: user.specialization,
          experience: user.experience,
          licenseNumber: user.licenseNumber,
          organization: user.organization,
          role: user.role,
          isApproved: user.isApproved,
        },
        message: 'Vet registration submitted successfully. Your application will be reviewed and approved by our team.'
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    // Handle specific validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: validationErrors 
      });
    }
    
    // Handle duplicate key errors
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      let fieldName = field;
      if (field === 'aadhaarNumber') fieldName = 'Aadhaar number';
      if (field === 'licenseNumber') fieldName = 'License number';
      return res.status(400).json({ 
        message: `${fieldName} already exists` 
      });
    }
    
    // Handle other errors
    console.error('Vet registration error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email }).select('+password');

    if (user && (await user.comparePassword(password))) {
      const token = generateToken(user._id);

      // Set HTTP-only cookie
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      });

      res.json({
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          address: user.address,
          aadhaarNumber: user.aadhaarNumber,
          village: user.village,
          farmData: user.farmData,
          role: user.role,
        },
        token,
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Logout user / clear cookie
// @route   POST /api/auth/logout
// @access  Private
exports.logout = (req, res) => {
  res.cookie('token', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: 'Logged out successfully' });
};

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
exports.getUserProfile = async (req, res, next) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const user = await User.findById(req.user.id).select('-password');
    if (user) {
      res.json({
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          address: user.address,
          aadhaarNumber: user.aadhaarNumber,
          village: user.village,
          farmData: user.farmData,
          role: user.role,
          createdAt: user.createdAt
        }
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Update farm data
// @route   PUT /api/auth/farm-data
// @access  Private
exports.updateFarmData = async (req, res, next) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const { farmData } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { farmData },
      { new: true, runValidators: true }
    ).select('-password');

    if (user) {
      res.json({
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          address: user.address,
          aadhaarNumber: user.aadhaarNumber,
          village: user.village,
          farmData: user.farmData,
          role: user.role,
          createdAt: user.createdAt
        }
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Forgot password - verify email and current password, then update password
// @route   POST /api/auth/forgot-password
// @access  Public
exports.forgotPassword = async (req, res, next) => {
  try {
    const { email, oldPassword, newPassword } = req.body;

    console.log('🔍 Forgot password request:', { email, oldPassword: '***hidden***', newPassword: '***hidden***' });

    // Validate required fields
    if (!email || !oldPassword || !newPassword) {
      console.log('❌ Missing required fields');
      return res.status(400).json({ 
        message: 'Email, current password, and new password are required' 
      });
    }

    // Find user by email
    console.log('🔍 Searching for user with email:', email);
    const user = await User.findOne({ email }).select('+password');
    
    if (!user) {
      console.log('❌ User not found with email:', email);
      return res.status(404).json({ message: 'Email not found' });
    }

    console.log('✅ User found:', { name: user.name, email: user.email });
    console.log('✅ Password hash exists:', !!user.password);

    // Verify current password
    console.log('🔍 Verifying current password...');
    const isPasswordValid = await user.comparePassword(oldPassword);
    console.log('🔍 Password verification result:', isPasswordValid);
    
    if (!isPasswordValid) {
      console.log('❌ Current password is incorrect');
      return res.status(401).json({ message: 'Current password is incorrect' });
    }

    console.log('✅ Current password verified successfully');

    // Update password
    console.log('🔍 Updating password...');
    user.password = newPassword;
    await user.save();
    console.log('✅ Password updated successfully');

    res.json({ 
      message: 'Password updated successfully' 
    });

  } catch (error) {
    console.error('❌ Forgot password error:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: validationErrors 
      });
    }
    
    res.status(500).json({ message: 'Internal server error' });
  }
};
