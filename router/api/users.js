const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

// load user model
const User = require('../../models/User');

// @route GET api/users/test
// @desc  Tests post route
// @access Public
console.log('into the users controller');

router.get('/test', (req, res) => {
  console.log('calling test');
  res.status(200).send({ msg: 'testing' });
});

// @route GET api/users/register
// @desc  Register user
// @access Public
router.post('/register', (req, res) => {
  console.log('registering', req.body);

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: 'Email already exists' });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: '200', // Size
        r: 'pg', // Rating
        d: 'mm' // Default
      });
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser['password'], salt, (err, hash) => {
          if (err) throw err;
          newUser['password'] = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route GET api/users/login
// @desc  login User / returning token
// @access Public
router.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  // finding user
  User.findOne({ email }).then(user => {
    //check if user
    if (!user) {
      return res.status(404).json({ email: 'User not found' });
    }
    // check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // user matched
        const payload = { id: user.id, name: user.name, avatar: user.avatar };

        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.status(200).json({
              success: true,
              token: 'Bearer ' + token
            });
          }
        );
      } else {
        res.status(404).json({ password: 'Password incorerect' });
      }
    });
  });
});

// @route GET api/users/current
// @desc  Return current user
// @access Private
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);
module.exports = router;
