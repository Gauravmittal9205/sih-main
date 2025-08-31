const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  phone: {
    type: String,
    required: [true, 'Please add a phone number'],
    match: [/^[0-9]{10,15}$/, 'Please add a valid phone number']
  },
  address: {
    type: String,
    required: false // Make optional
  },
  aadhaarNumber: {
    type: String,
    required: false, // Make optional
    unique: true,
    match: [/^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/, 'Please add a valid Aadhaar number']
  },
  village: {
    type: String,
    required: false // Make optional
  },
  profileImage: {
    type: String,
    default: null
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 6,
    select: false
  },
  role: {
    type: String,
    enum: ['farmer', 'vet', 'admin'],
    default: 'farmer'
  },
  // Farmer specific fields
  farmSize: {
    type: String,
    required: function() { return this.role === 'farmer'; }
  },
  livestockType: {
    type: String,
    required: function() { return this.role === 'farmer'; },
    enum: ['cattle', 'poultry', 'pigs', 'goats', 'sheep', 'mixed', 'other']
  },
  // Farm data for livestock management
  farmData: {
    totalAcres: {
      type: Number,
      default: 0
    },
    livestock: {
      pigs: {
        total: { type: Number, default: 0 },
        vaccinated: { type: Number, default: 0 }
      },
      poultry: {
        total: { type: Number, default: 0 },
        vaccinated: { type: Number, default: 0 }
      },
      cattle: {
        total: { type: Number, default: 0 },
        vaccinated: { type: Number, default: 0 }
      },
      goats: {
        total: { type: Number, default: 0 },
        vaccinated: { type: Number, default: 0 }
      }
    }
  },
  // Vet specific fields
  qualification: {
    type: String,
    required: false // Make optional
  },
  specialization: {
    type: String,
    required: false, // Make optional
    enum: ['large-animal', 'small-animal', 'poultry', 'surgery', 'pathology', 'preventive', 'emergency', 'other']
  },
  experience: {
    type: String,
    required: false // Make optional
  },
  licenseNumber: {
    type: String,
    required: false, // Make optional
    unique: true,
    sparse: true
  },
  organization: {
    type: String,
    required: false // Make optional
  },
  // Vet approval status
  isApproved: {
    type: Boolean,
    default: true // Always approve vets automatically
  },
  // Vet documents
  documents: {
    license: String,
    degree: String,
    idProof: String
  }
}, {
  timestamps: true
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
