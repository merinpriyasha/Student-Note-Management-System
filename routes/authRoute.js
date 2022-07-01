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
            user: "merinpriyasha@gmail.com",
            pass: "jrrwbmmpwibtsxxl"
        },
        tls: {
            rejectUnauthorized: false,
        }
    })

    let mailOption = {
        from: "merinpriyasha@gmail.com",
        to: email,
        subject: "Your Password",
        text: `Hi, this is your password: ${password}, click this got to system https://students.flinders.edu.au/support/computing/student-system `
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
        const payload = jwt.verify(token, keys.JWT_SECRET);
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


        User.findOneAndUpdate({ email: req.body.email }, { $inc: { countLogin: 1 } }, { $set: { lastLogin: Date.now() } }, (err, data) => {
            if (err) console.log(err);
            else console.log("increment login count");
        });

        const token = jwt.sign({ id: user.id, accountType: user.accountType, countLogin: user.countLogin },
            keys.JWT_SECRET
        );
        res.status(200).json({
            message: 'Login Sucessfull',
            token: token
        });
    });
});

router.get('/dashboard', verifyToken, (req, res) => {
    res.json({
        message: 'Redirect to dashboard',
        user: req.user,
    });
});

router.get('/logout', verifyToken, (req, res) => {
    console.log('called');
    res.json({
        message: 'Logging out sucessfull',
        user: req.user,
    });
});

module.exports = router;