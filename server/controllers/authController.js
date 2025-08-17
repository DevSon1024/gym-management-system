const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Changed from Member to User

// @desc   Register a new user
// @route  POST /api/auth/register
exports.register = async (req, res) => {
  const { name, email, password, age, contact } = req.body;

  try {
    if (!name || !email || !password || !age || !contact) {
      return res.status(400).json({ msg: 'Please enter all fields.' });
    }

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User with this email already exists.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new User, not a Member
    user = new User({
      name,
      email,
      password: hashedPassword,
      age,
      contact,
    });

    await user.save();
    res.status(201).json({ msg: 'Registration successful! You can now log in.' });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc   Login a user and get a token
// @route  POST /api/auth/login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }); // Find in User collection
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const payload = {
      user: {
        id: user.id,
        role: user.role,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '8h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token, user: { name: user.name, role: user.role } });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};