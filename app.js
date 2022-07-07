const express = require("express");
const mongoose = require("mongoose");
const colors = require("colors");

const keys = require("./config/keys");
require('dotenv').config();
const port = process.env.PORT || 3002;
const nodemailer = require("nodemailer");
const app = express();
const path = require("path")
const authRouter = require("./routes/authRoute");
const adminRoutes = require("./routes/adminRoute");
const subjectRoute = require("./routes/studentRoute");

// ADD THIS
var cors = require("cors");
app.use(cors());

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
    to: "priyashafernando97@gmail.com",
    subject: "Test",
    text: "test"
}


app.options("*", cors());

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "static")));



var uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@mernproject.zum2gmm.mongodb.net/${process.env.MONGO_DATABSE}`;


mongoose
    .connect(keys.mongoDBUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((res) => {
        console.log(`MongoDB Connected ${res.connection.host}`.cyan.underline);
    })
    .catch((err) => {
        console.log(err);
    });

//Auth routes
app.use("/auth", authRouter);
//User routes
app.use("/admin", adminRoutes);
//Subject route
app.use("/subject", subjectRoute);

app.listen(port, () => {
    console.log(`App is Listening on PORT ${port}`.cyan.underline);
});