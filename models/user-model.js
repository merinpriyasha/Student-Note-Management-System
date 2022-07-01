const { string } = require("joi");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//Create user schema
const userSchema = new Schema({

    id: {
        type: Number,
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
        default: "Farmer",
    },

}, {
    timestamps: true,
});

//Collection name
const User = mongoose.model("User", userSchema);

module.exports = User;