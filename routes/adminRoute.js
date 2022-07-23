const router = require("express").Router();
let User = require("../models/user-model");
const { response } = require("express");
const bcrypt = require("bcryptjs");
const keys = require("../config/keys");
const jwt = require("jsonwebtoken");
require('dotenv').config({ path: '../config/config.env' });

//Verify token function
function verifyToken(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('No token provided');

    try {
        const payload = jwt.verify(token, keys.JWT_SECRET /*process.env.JWT_SECRET*/);
        req.user = payload;
        next();
    } catch (ex) {
        res.status(400).send('Invalid token');
    }
}

//Read All accessible users
router.route("/").get(verifyToken, (req, res) => {
    if (req.user.accountType == "Admin") {
        User.find({
                accountType: { $ne: "Admin" }
            })
            .then((users) => {
                res.json(users);
            })
            .catch((err) => {
                console.log(err);
            });
    } else {
        res.json("Only admin have access for this");
    }
});

//Read specific accessible user details
router.route("/get/:id").get(verifyToken, async(req, res) => {
    let userID = req.params.id;
    if (req.user.accountType == "Admin") {
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
    } else {
        res.json("Only admin have access for this");
    }
});

//Admin Registration
router.route("/add").post((req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const dateOfBirth = req.body.dateOfBirth;
    const email = req.body.email;
    const mobile = Number(req.body.mobile);
    const password = req.body.password;
    const accountType = "Admin"

    const newUser = new User({
        firstName,
        lastName,
        dateOfBirth,
        email,
        mobile,
        password,
        accountType
    });

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, async(err, hash) => {
            //Hash Password
            newUser.password = hash;

            //save user
            try {
                const User = await newUser.save().then(() => {
                    res.json("Admin Added sucessfully..");
                });
            } catch (err) {
                console.log(err);
            }
        });
    });
});
module.exports = router;