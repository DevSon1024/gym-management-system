const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Member = require('../models/Member');

// @desc   Register a new member/user
// @route  POST /api/auth/register
exports.register = async (req, res) => {
  const { name, email, password, age, contact } = req.body;

  try {
    if (!name || !email || !password || !age || !contact) {
      return res.status(400).json({ msg: 'Please enter all required fields.' });
    }

    let user = await Member.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new Member({
      name,
      email,
      password: hashedPassword,
      age,
      contact,
      // Default membership details for a new user
      membershipType: 'Basic',
      startDate: new Date(),
      endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)), // Default 1 month membership
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
    const user = await Member.findOne({ email });
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
        res.json({
          token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};