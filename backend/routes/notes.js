const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

// ROUTE 1: Get all notes of logged-in user
router.get("/fetchallnotes", fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// ROUTE 2: Add a new note
router.post("/addnote",fetchuser,[
        body("title", "Enter a valid title").isLength({ min: 3 }),
        body("description","Description must be at least 5 characters" ).isLength({ min: 5 }),
    ],  
    async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { title, description, tag } = req.body;

            const note = new Note({
                title,
                description,
                tag,
                user: req.user.id,
            });

            const savedNote = await note.save();

            res.json(savedNote);
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    }
);
router.put("/updatenotes/:id", fetchuser, async (req, res) => {
        const{title,description,tag}=req.body;
        const newNote={};    
        if(title){newNote.title=title};
        if(description){newNote.description=description};
        if(tag){newNote.tag=tag};
        let note = await Note.findById(req.params.id);
        if(!note){return res.status(404).send("Not found")}
        if(note.user.toString()!==req.user.id){
            return res.status(401).send("not allowed")
        }
        note = await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{ returnDocument: 'after' })
        res.json({note})
    })
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
    try {
        console.log("Received ID:", req.params.id);
        console.log("User ID:", req.user.id);

        const note = await Note.findById(req.params.id);

        console.log("Found Note:", note);

        if (!note) {
            return res.status(404).send("Note not found");
        }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        await Note.findByIdAndDelete(req.params.id);

        res.json({
            success: true,
            message: "Note deleted successfully"
        });

    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});
module.exports = router;