const express = require('express');
const router = express.Router();
const User = require('../models/Users');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    res.status(200).json({
      id: user.id,
      username: user.username,
      password: password, // sending plain password (⚠️ agreed upon)
      recoveryEmail: user.recoveryEmail,
      profilePicture: user.profilePicture
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Register
router.post('/register', async (req, res) => {
  const { username, password, recoveryEmail } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ message: 'Username already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      id: uuidv4(),
      username,
      password: hashedPassword,
      recoveryEmail,
      profilePicture: ''
    });

    await newUser.save();

    res.status(201).json({
      id: newUser.id,
      username: newUser.username,
      password: password,
      recoveryEmail: newUser.recoveryEmail,
      profilePicture: ''
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update email
router.post('/update-email', async (req, res) => {
  const { username, recoveryEmail } = req.body;
  try {
    await User.findOneAndUpdate({ username }, { recoveryEmail });
    res.status(200).json({ message: 'Email updated' });
  } catch (err) {
    res.status(500).json({ message: 'Update failed' });
  }
});

// Update profile picture
router.post('/update-picture', async (req, res) => {
  const { username, profilePicture } = req.body;
  try {
    await User.findOneAndUpdate({ username }, { profilePicture });
    res.status(200).json({ message: 'Picture updated' });
  } catch (err) {
    res.status(500).json({ message: 'Update failed' });
  }
});

module.exports = router;
