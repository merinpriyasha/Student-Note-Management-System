const router = require("express").Router();
let User = require("../models/user-model");
const { response } = require("express");
const bcrypt = require("bcryptjs");
const keys = require("../config/keys");
const jwt = require("jsonwebtoken");
const path = require("path");

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

//Read All accessible users
router.route("/").get(verifyToken, (req, res) => {
    User.find({
            userType: { $ne: "Admin" }
        })
        .then((users) => {
            res.json(users);
        })
        .catch((err) => {
            console.log(err);
        });
});

//Read specific accessible user details
router.route("/get/:id").get(verifyToken, async(req, res) => {
    let userID = req.params.id;
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
module.exports = router;