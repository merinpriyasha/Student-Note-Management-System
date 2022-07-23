const express = require('express');
const router = require("express").Router();
let User = require("../models/user-model");
const { response } = require("express");
const keys = require("../config/keys");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const generator = require('generate-password');
const nodemailer = require("nodemailer");
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '../config/config.env' });

//Create User account by admin function
//http://localhost:3002/auth/add
router.route("/add").post(async(req, res) => {

    //Generate random password
    var randomPassword = generator.generate({
        length: 10,
        numbers: true
    });

    // 'uEyMTw32v9'
    //console.log(password);

    const id = uuidv4();
    const email = req.body.email;
    const password = randomPassword;

    const newUser = new User({
        id,
        email,
        password
    });

    //mailer
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: keys.EMAIL_ADDRESS,
            pass: keys.EMAIL_PASS
        },
        tls: {
            rejectUnauthorized: false,
        }
    })

    let mailOption = {
        from: keys.EMAIL_ADDRESS,
        to: email,
        subject: "Your Password",
        text: `Hi, this is your password: ${password}, click this got to system http://localhost:3000/sign-in `
    }

    transporter.sendMail(mailOption, function(err, success) {
        if (err) {
            console.log(err)
        } else {
            console.log("Email sent successfully");
        }
    })

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, async(err, hash) => {
            //Hash Password
            newUser.password = hash;

            //save user
            try {
                const User = await newUser.save().then(() => {
                    res.json("New User Account Created successfully..");
                });
            } catch (err) {
                console.log(err);
            }
        });
    });

});


//Verify token function
function verifyToken(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('No token provided');

    try {
        const payload = jwt.verify(token,/*process.env.JWT_SECRET*/ keys.JWT_SECRET);
        req.user = payload;
        next();
    } catch (ex) {
        res.status(400).send('Invalid token');
    }
}

function validateUser(req) {
    const schema = Joi.object({
        email: Joi.string().min(5).required().email(),
        password: Joi.string().min(6).required(),
    });

    return schema.validate(req);
}

//Login function
router.post('/login', async(req, res) => {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({
        email: req.body.email
    });

    if (!user) return res.status(400).send('Invalid Email');
    if (user.disabled) return res.status(400).send('User is Disabled');

    const Password = req.body.password;
    const match = bcrypt.compare(Password, user.password, (err, result) => {
        if (err) return res.status(400).send('Error With Decrypting Password');
        if (!result) return res.status(400).send('Invalid Password');


        User.findOneAndUpdate({ email: req.body.email }, { $inc: { countLogin: 1 }, $set: { status: true } }, (err, data) => {
            if (err) console.log(err);
            else console.log("increment login count");
        });

        const token = jwt.sign({ _id: user._id, accountType: user.accountType, countLogin: user.countLogin },
            keys.JWT_SECRET
            //process.env.JWT_SECRET
        );
        res.status(200).json({
            message: 'Login Sucessfull',
            token: token
        });
    });
});

//Redirect to dashboard
router.get('/dashboard', verifyToken, (req, res) => {
    res.json({
        message: 'Redirect to dashboard',
        user: req.user,
    });
});

//Logout
router.get('/logout', verifyToken, (req, res) => {
    console.log('called');
    User.findOneAndUpdate({ _id: req.user._id }, { $set: { status: false } }, (err, data) => {
        if (err) console.log(err);
        else console.log("profile status: deactive");
    });

    res.json({
        message: 'Logging out sucessfull',
        user: req.user,
    });
});

//Get Authorized(Logged users) detilas Only
//This can be used to show the authorized user details in Profile page
router.get("/getAuthUser", verifyToken, async(req, res) => {
    let userID = req.user._id;

    const user = await User.findById(userID)
        .then((user) => {
            res.status(200).send({ status: "User details fetched..", user });
        })
        .catch((err) => {
            console.log(err.message);
            res
                .status(500)
                .send({ status: "Error with get user", error: err.message });
        });
});

//Update details of Authorized(Logged) user without adding other person deteatils
router.route("/updateAuthUser").put(verifyToken, async(req, res) => {
    let userID = req.user._id;

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const dateOfBirth = req.body.dateOfBirth;
    const mobile = Number(req.body.mobile);
    const password = req.body.password;
    const accountType = "Student"


    const updateUser = {
        firstName,
        lastName,
        dateOfBirth,
        mobile,
        password,
        accountType
    };

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(updateUser.password, salt, async(err, hash) => {
            //Hash Password
            updateUser.password = hash;
            const update = await User.findByIdAndUpdate(userID, updateUser)
                .then(() => {
                    res.status(200).send({ status: "User details updated.." });
                })
                .catch((err) => {
                    console.log(err);
                    res
                        .status(500)
                        .send({ status: "Error with updating data", error: err.message });
                });
        });
    });
});

//Get token details
router.get("/getAuthDetails", verifyToken, async(req, res) => {
    let userID = req.user._id;
    let accType = req.user.accountType;
    let count = req.user.countLogin;

    res.status(200).send({ status: "User details fetched..", id: userID, accountType: accType, count: count });
});
module.exports = router;