const { string } = require("joi");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//Create user schema
const userSchema = new Schema({

    id: {
        type: String,
        required: true,
        unique: true
    },
    firstName: String,
    lastName: String,
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    dateOfBirth: Date,
    mobile: {
        type: Number,
        default: null,
    },
    status: {
        type: Boolean,
        default: false,
    },
    password: {
        type: String,
        minlength: 6,
    },
    accountType: {
        type: String,
        default: "Student",
    },
    lastLogin: {
        type: Date,
        default: null
    },
    countLogin: {
        type: Number,
        default: 0
    }

}, {
    timestamps: true,
});

//Collection name
const User = mongoose.model("User", userSchema);

module.exports = User;