import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// =====================
// Register
// =====================
export const register = async (req, res) => {
  try {
    console.log('Register payload:', req.body); // 🔹 Debug log

    const { name, email, password, role, phone, address } = req.body;

    // Validate required fields
    if (!name || !email || !password || !role) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      phone: phone || '',
      address: address || '',
    });

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '7d' }
    );

    res.status(201).json({ user, token });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: err.message });
  }
};

// =====================
// Login
// =====================
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log('Login attempt:', { email });

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '7d' }
    );

    res.json({ user, token });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: err.message });
  }
};

// =====================
// Profile
// =====================
export const profile = async (req, res) => {
  try {
    // This endpoint requires authentication middleware to extract user from token
    res.json({ message: 'Profile endpoint' });
  } catch (err) {
    console.error('Profile error:', err);
    res.status(500).json({ error: err.message });
  }
};
