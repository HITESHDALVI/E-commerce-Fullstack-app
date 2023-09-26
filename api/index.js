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

    // save the user to db
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
    const user = await User.findOne({email});
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

// endpoint for new address to backend
app.post('/addresses', async (req, res) => {
  try {
    const {userId, data} = req.body;
    // find the user by user Id
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({message: 'User not found'});
    }
    // add the new address to the user address array
    user.addresses.push(data);
    // save the updated user in backend
    await user.save();
    res.status(200).json({message: 'Address created successfully'});
  } catch (error) {
    res.status(500).json({message: 'Error adding address'});
  }
});

// endpoint for getting all the addresses
app.get('/addresses/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({message: 'User not found'});
    }
    const addresses = user.addresses;
    res.status(200).json({addresses});
  } catch (error) {
    res.status(500).json({message: 'Error retrieveing the addresses'});
  }
});

// endpoint for orders
app.post('/orders', async (req, res) => {
  try {
    const {userId, cartItems, totalPrice, shippingAddress, paymentMethod} =
      req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({message: 'User not found'});
    }

    //create an array of product objects from the cart Items
    const products = cartItems.map(item => ({
      name: item?.title,
      quantity: item.quantity,
      price: item.price,
      image: item?.image,
    }));

    //create a new Order
    const order = new Order({
      user: userId,
      products: products,
      totalPrice: totalPrice,
      shippingAddress: shippingAddress,
      paymentMethod: paymentMethod,
    });

    await order.save();

    res.status(200).json({message: 'Order created successfully!'});
  } catch (error) {
    console.log('error creating orders', error);
    res.status(500).json({message: 'Error creating orders'});
  }
});

//  get the user profile
app.get('/profile/:userId', async (req, res) => {
  try {
    const {userId} = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({message: 'User not found'});
    }
    res.status(200).json({user});
  } catch (error) {
    res.status(500).json({message: 'Error retrieveing Profile.'});
  }
});

app.get('/orders/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    const orders = await Order.find({user: userId}).populate('user');

    if (!orders || orders.length === 0) {
      return res.status(404).json({message: 'No orders found for this user'});
    }

    res.status(200).json({orders});
  } catch (error) {
    res.status(500).json({message: 'Error'});
  }
});
