import User from '../models/User.js';
import { generateToken } from '../middleware/authMiddleware.js';

// Register user
export const registerUser = async (req, res) => {
  try {
    const { name, username, password, age, mobileNumber, address, gender } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Create user
    const user = await User.create({
      name,
      username,
      password,
      age,
      mobileNumber,
      address,
      gender
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        username: user.username,
        age: user.age,
        mobileNumber: user.mobileNumber,
        address: user.address,
        gender: user.gender,
        isAdmin: user.isAdmin,
        token: generateToken(user._id)
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login user
export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user
    const user = await User.findOne({ username });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        username: user.username,
        age: user.age,
        mobileNumber: user.mobileNumber,
        address: user.address,
        gender: user.gender,
        isAdmin: user.isAdmin,
        token: generateToken(user._id)
      });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin login
export const adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check against environment variables
    if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
      // Check if admin user exists in database
      let adminUser = await User.findOne({ username: process.env.ADMIN_USERNAME });

      // Create admin user if doesn't exist
      if (!adminUser) {
        adminUser = await User.create({
          name: 'Admin',
          username: process.env.ADMIN_USERNAME,
          password: process.env.ADMIN_PASSWORD,
          age: 30,
          mobileNumber: '0000000000',
          address: 'Admin Address',
          gender: 'Other',
          isAdmin: true
        });
      }

      res.json({
        _id: adminUser._id,
        name: adminUser.name,
        username: adminUser.username,
        isAdmin: true,
        token: generateToken(adminUser._id)
      });
    } else {
      res.status(401).json({ message: 'Invalid admin credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user profile
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update user profile
export const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.age = req.body.age !== undefined ? req.body.age : user.age;
      user.mobileNumber = req.body.mobileNumber || user.mobileNumber;
      user.address = req.body.address || user.address;
      user.gender = req.body.gender || user.gender;

      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        username: updatedUser.username,
        age: updatedUser.age,
        mobileNumber: updatedUser.mobileNumber,
        address: updatedUser.address,
        gender: updatedUser.gender,
        isAdmin: updatedUser.isAdmin,
        token: req.user.token || generateToken(updatedUser._id)
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: error.message });
  }
};
