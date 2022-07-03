const mongoose = require('mongoose');
let Admin = require("../models/user-model");
const keys = require("../config/keys");
const colors = require("colors");

//MongoDB connection
mongoose
    .connect(keys.mongoDBUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((res) => {
        console.log(`MongoDB Connected ${res.connection.host}`.cyan.underline);
    })
    .catch((err) => {
        console.log(err);
    });

const seedAdmin = [{
    id: 'a123d456m789i012n345',
    firstName: 'William',
    lastName: 'Lucas',
    dateOfBirth: 1986 - 2 - 18,
    status: true,
    email: 'admin123@gmail.com',
    password: 'admin123',
    accountType: 'Admin'
}];

const seedDB = async() => {
    await Admin.insertMany(seedAdmin);
};

seedDB().then(() => {
    mongoose.connection.close();
})