const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');
const { restart } = require('nodemon');
const db = require("../db/db.json");

// get route to retrieve all notes
router.get('/notes', (req, res) => {
    // read db.json
    const notes = fs.readFileSync(path.join(__dirname, '../db/db.json'), 'utf8');
    console.log(notes);
    // send back as json
    res.json(JSON.parse(notes))
  });

// get route to retrieve specific note by id
router.get('/notes/:id', (req, res) => {
    const id = req.params.id;
    // read dbjson
    const notes = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/db.json'), 'utf8'));
    // find note from dbjson by id
    const found = notes.find(note => note.id === id);
    // if found send back json
    if (found !== undefined) {
        res.json(found);
    } else {
        res.status(404).json({error: "Note not found"})
    }
})

// post route for new note
router.post('/notes', (req, res) => {
    console.log(req.body);
    const { title, text } = req.body;

    if (req.body) {
        const newNote = {
            title,
            text,
            id: uuidv4(),
        };

        //fs append new note to db.json
        db.push(newNote);
        console.log(db)
        fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(db));
        res.sendStatus(200);
        
    } else {
        res.error('Error in adding new note');
    }
});


// delete route for specific note
router.delete('/notes/:id', (req, res) => {
    const id = req.params.id;
    const notes = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/db.json'), 'utf8'))
    const result = notes.filter((note) => note.id !== id);
    fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(result));
    res.json(`Note ${id} has been deleted.`);
    

});

  module.exports = router;