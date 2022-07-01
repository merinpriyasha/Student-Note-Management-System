const express = require("express");
const mongoose = require("mongoose");
const colors = require("colors");

const keys = require("./config/keys");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 3002;
const nodemailer = require("nodemailer");
const app = express();
const path = require("path")
const authRouter = require("./routes/authRoute");

// ADD THIS
var cors = require("cors");
const { response } = require("express");
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

// transporter.sendMail(mailOption, function(err, success) {
//         if (err) {
//             console.log(err)
//         } else {
//             console.log("Email sent successfully");
//         }
//     })
//allow OPTIONS on all resources


app.options("*", cors());

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "static")));

//Routing
// app.get("/", function(req, res) {
//     res.sendFile(path.join(__dirname, "static/index.html"))
// })

// app.post("/send_email", function(req, res) {
//         var from = req.body.from;
//         var to = req.body.to;
//         var subject = req.body.subject;
//         var message = req.body.message;

//         var transporter = nodemailer.createTransport({
//             service: 'gamil',
//             auth: {
//                 user: 'merinpriyasha@gmail.com',
//                 pass: 'jrrwbmmpwibtsxxl'
//             }
//         });

//         var mailOption = {
//             from: from,
//             to: to,
//             subject: subject,
//             text: message
//         };

//         transporter.sendMail(mailOption, function(err, info) {
//             if (err) {
//                 console.log(err)
//             } else {
//                 console.log("Email Sent:" + info.response)
//             }
//             response.redirect('/')
//         })
//     })
//MongoDB connection
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

app.listen(port, () => {
    console.log(`App is Listening on PORT ${port}`.cyan.underline);
});