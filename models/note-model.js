const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//Create user schema
const noteSchema = new Schema({

    title: String,
    description: String,
    studentId: String

}, {
    timestamps: true,
});

//Collection name
const Note = mongoose.model("Note", noteSchema);

module.exports = Note;