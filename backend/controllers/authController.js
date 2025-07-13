const User = require('../models/User');
const generateToken = require('../utils/generateToken');

function validateEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}

exports.register = async (req, res) => {
  const { name, email, password, avatar } = req.body;
  // Backend validation
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email, and password are required.' });
  }
  if (!validateEmail(email)) {
    return res.status(400).json({ message: 'Invalid email format.' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters.' });
  }
  if (avatar) {
    // Check base64 header for image type (jpg/png)
    if (!avatar.startsWith('data:image/jpeg') && !avatar.startsWith('data:image/png')) {
      return res.status(400).json({ message: 'Avatar must be a JPG or PNG image.' });
    }
    // Check size (base64 length, rough estimate: 4/3 * file size in bytes)
    const base64Length = avatar.length - (avatar.indexOf(',') + 1);
    const fileSize = Math.ceil(base64Length * 3 / 4); // in bytes
    if (fileSize > 2 * 1024 * 1024) {
      return res.status(400).json({ message: 'Avatar must be less than 2MB.' });
    }
  }
  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({ message: 'User exists' });
  const user = await User.create({ name, email, password, avatar });
  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    avatar: user.avatar,
    token: generateToken(user._id)
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  // Backend validation
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }
  if (!validateEmail(email)) {
    return res.status(400).json({ message: 'Invalid email format.' });
  }
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      token: generateToken(user._id)
    });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
}; 