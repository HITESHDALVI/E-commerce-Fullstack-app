const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const crypto = require('crypto');
const nodemailers = require('nodemailer');

const app = express();
const port = 8000;
const cors = require('cors');
app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const jwt = require('jsonwebtoken');

mongoose
  .connect('mongodb+srv://hiteshdalvi:cygbit@cluster0.vqkefxc.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('conneted to mongodb');
  })
  .catch(err => {
    console.log({err}, 'connection failed');
  });

app.listen(port, () => {
  console.log('server is running on port 8000');
});

// Endpoint for register flow
const User = require('./models/user');
const Order = require('./models/order');

// function to send verifcation email to user
const sendVerificationEmal = async (email, token) => {
  // cretae a nodemailer transport
  const transporter = nodemailers.createTransport({
    // configure the email service
    service: 'gmail',
    auth: {
      user: 'hitesh.dalvi@cygbit.com',
      pass: 'xqsh wqhx vjcs jwtj',
    },
  });
  // compose email message
  const mailOptions = {
    from: 'amazon.com',
    to: email,
    subject: 'Email Verification',
    text: `Please click the link to verify youe email : http://localhost:8000/verify/${token}`,
  };
  // send the emial
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log('error sending verification mail', {error});
  }
};

app.post('/register', async (req, res) => {
  try {
    const {name, email, password} = req.body;
    //check if email is registered

    const existingUser = await User.findOne({email});
    if (existingUser) {
      return res.status(400).json({message: 'Email already registered'});
    }

    //create a new user
    const newUser = new User({name, email, password});

    // generate and store verification token
    newUser.verificationToken = crypto.randomBytes(20).toString('hex');

    // savw the user to db
    await newUser.save();

    // send verification mail to user
    sendVerificationEmal(newUser.email, newUser.verificationToken);
  } catch (error) {
    console.log({error}, 'regiseter error');
    res.status(500).json({message: 'Registration failed'});
  }
});

// endpoint to verify email
app.get('/verify/:token', async (req, res) => {
  try {
    const token = req.params.token;
    // find the user with giveen verification token
    const user = await User.findOne({verificationToken: token});
    if (!user) {
      return res.status(404).json({
        message: 'Invalid verification token',
      });
    }

    // mark user as verified
    user.verified = true;
    user.verificationToken = undefined;
    await user.save();
    res.status(200).json({message: 'Email verfied successfully'});
  } catch (error) {
    res.status(500).json({message: 'Email verification failed'});
  }
});

// endpoint for login user

const generateSecretKey = () => {
  const secretKey = crypto.randomBytes(32).toString();
  return secretKey;
};
const secretKey = generateSecretKey();
app.post('/login', async (req, res) => {
  try {
    const {email, password} = req.body;
    console.log({email, password});
    const user = await User.findOne({email});
    console.log({user});
    if (!user) {
      return res.status(401).json({message: 'Invalid email or password'});
    }
    if (user.password !== password) {
      return res.status(401).json({message: 'Invalid Password'});
    }
    // generate a token
    const token = jwt.sign({userId: user._id}, secretKey);
    res.status(200).json({token});
  } catch (error) {
    res.status(500).json({message: 'Login failed'});
  }
});
