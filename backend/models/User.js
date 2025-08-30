const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      'Please provide a valid email address'
    ]
  },
  phone: {
    type: String,
    required: [true, 'Please provide a phone number'],
    match: [/^[0-9]{10,15}$/, 'Please provide a valid phone number']
  },
  address: {
    type: String,
    required: [true, 'Please provide an address'],
    trim: true
  },
  aadhaarNumber: {
    type: String,
    required: [true, 'Please provide Aadhaar number'],
    match: [/^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/, 'Please provide a valid 12-digit Aadhaar number'],
    unique: true
  },
  village: {
    type: String,
    required: [true, 'Please provide your village name'],
    trim: true
  },
  // Farm data
  farmData: {
    totalAcres: {
      type: Number,
      default: 0,
      min: [0, 'Total acres cannot be negative']
    },
    livestock: {
      pigs: {
        total: { type: Number, default: 0, min: 0 },
        vaccinated: { type: Number, default: 0, min: 0 }
      },
      poultry: {
        total: { type: Number, default: 0, min: 0 },
        vaccinated: { type: Number, default: 0, min: 0 }
      },
      cattle: {
        total: { type: Number, default: 0, min: 0 },
        vaccinated: { type: Number, default: 0, min: 0 }
      },
      goats: {
        total: { type: Number, default: 0, min: 0 },
        vaccinated: { type: Number, default: 0, min: 0 }
      }
    }
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: [6, 'Password must be at least 6 characters long'],
    select: false
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
