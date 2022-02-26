const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');

router.get('/notes', (req, res) => {
    // read db.json
    const notes = fs.readFileSync(path.join(__dirname, '../db/db.json'), 'utf8');
    console.log(notes);
    // send back as json
    res.json(JSON.parse(notes))
  });

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
    //if not found, send error
})


  module.exports = router;