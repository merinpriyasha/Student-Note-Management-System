const router = require("express").Router();
let Note = require("../models/note-model");
const { response } = require("express");
const bcrypt = require("bcryptjs");
const keys = require("../config/keys");
const jwt = require("jsonwebtoken");

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

//Add note
router.route("/addNote").post(verifyToken, async(req, res) => {

    let userID = req.user._id;
    const title = req.body.title;
    const description = req.body.description;
    const studentId = userID;

    const newNote = new Note({
        title,
        description,
        studentId
    });

    if (req.user.accountType == "Student") {
        //save note
        try {
            const Note = await newNote.save().then(() => {
                res.json("New note added successfully..");
            });
        } catch (err) {
            console.log(err);
        }
    } else {
        res.json("Student can create any notes");
    }
});

//Update note details
router.route("/updateNote/:id").put(verifyToken, async(req, res) => {
    let noteID = req.params.id;
    const {
        title,
        description
    } = req.body;

    const updateNote = {
        title,
        description
    };

    if (req.user.accountType == "Student") {
        const update = await Note.findByIdAndUpdate(noteID, updateNote)
            .then(() => {
                res.status(200).send({ status: "Note details updated." });
            })
            .catch((err) => {
                res.status(500).send({ status: "Error with updating data", error: err.message });
            });
    } else {
        res.json("Student can create any notes");
    }
});

//Delete note details
router.route("/deleteNote/:id").delete(async(req, res) => {
    let noteID = req.params.id;
  
        await Note.findByIdAndDelete(noteID)
            .then(() => {
                res.status(200).send({ status: "Note deleted.." });
            })
            .catch((err) => {
                console.log(err.message);
                res
                    .status(500)
                    .send({ status: "Error with delete note", error: err.message });
            });
   
});

//Read All notes
//Read specific accessible user details
router.route("/getNotes").get(verifyToken, async(req, res) => {
    let userID = req.user._id;
    const notes = await Note.find({ studentId: userID })
        .then((user) => {
            //res.status(200).send({ status: "note details fetched..", user });
            res.json(user);
        })
        .catch((err) => {
            console.log(err.message);
            res
                .status(500)
                .send({ status: "Error with get notes", error: err.message });
        });
});

//Read specific accessible user details
router.route("/get/:id").get(verifyToken, async(req, res) => {
    let noteID = req.params.id;
    if (req.user.accountType == "Student") {
        const user = await Note.findById(noteID)
            .then((note) => {
                res.status(200).send({ status: "User details fetched..", note });
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


module.exports = router;