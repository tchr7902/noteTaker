// bringing in express, fs, path, uuid for ids, starting the app,
// assigning the port, accessing notes, and accessing the db.json easier
const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const notes = require('../../../db/db.json')
const app = express();
const PORT = 3001;
const dbFilePath = path.join(__dirname, '../../../db/db.json');


// middleware for the results
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// access to the public folder
app.use(express.static('../../../public'));


// GET for the landing page, sends the index.html file
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '../../index.html'))
);


// GET for the notes page, sends the notes.html file
app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, '../../notes.html'))
)


// GET to read the notes in db.json, jsons the results
app.get('/api/notes', (req, res) => {
    return res.json(notes);
})


// POST to create a new note, pushes the note
app.post('/api/notes', (req, res) => {
    console.log(`${req.method} request received to add a note!`)

    const newNote = {
        id: uuidv4(),
        title: req.body.title,
        text: req.body.text,
    };

    notes.push(newNote);

    // writes the db.json file with the new note
    fs.writeFile(dbFilePath, JSON.stringify(notes), (err) => {
        if(err) {
            console.err(err);
        }

        return res.json(newNote);
    })
})


// initializes app
app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);