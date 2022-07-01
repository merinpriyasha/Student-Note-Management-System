const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const colors = require("colors");

const keys = require("./config/keys");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 3002;

const app = express();

// ADD THIS
var cors = require("cors");
app.use(cors());


//allow OPTIONS on all resources
app.options("*", cors());

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//MongoDB connection
mongoose
    .connect(keys.mongoDBUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((res) => {
        console.log(`MongoDB Connected ${res.connection.host}`.cyan.underline);
    })
    .catch((err) => {
        console.log(err);
    });


app.listen(port, () => {
    console.log(`App is Listening on PORT ${port}`.cyan.underline);
});