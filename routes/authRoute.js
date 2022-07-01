const router = require("express").Router();
let User = require("../models/user-model");
const { response } = require("express");
const keys = require("../config/keys");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const generator = require('generate-password');
const nodemailer = require("nodemailer");

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

    //save user
    try {
        const User = await newUser.save().then(() => {
            res.json("New User Account Created successfully..");
        });
    } catch (err) {
        console.log(err);
    }

});


module.exports = router;