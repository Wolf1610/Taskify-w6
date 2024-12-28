
const jwt = require('jsonwebtoken');
const { User } = require('../db');
require('dotenv').config();

const userSignup = async (req, res) => {
    const { username, password } = req.body;
    try {
      const user = await User.findOne({ username });
      if (user) {
        return res.status(403).json({ message: 'User already exists' });
      }
  
      const newUser = new User({ username, password });
      await newUser.save();
  
      const token = jwt.sign({ userId: newUser._id }, process.env.JWT, { expiresIn: '1h' }); 
      res.json({ message: 'User created successfully', token });
    } catch (error) {
      res.status(500).json({ message: 'Error creating user', error });
    }
  };

const userSignin = async (req, res) => {
    const { username, password } = req.body; 
    try {
      const user = await User.findOne({ username, password });
      if (user) {
        const token = jwt.sign({ userId: user._id }, process.env.JWT, { expiresIn: '1h' });
  
        res.json({ message: 'Logged in successfully', token });
      } else {
        res.status(403).json({ message: 'Invalid username or password' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error signing in', error });
    }
  };

module.exports = {
    userSignup,
    userSignin
}