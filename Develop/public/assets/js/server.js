const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3001;
const dbFilePath = path.join(__dirname, '../../../db/db.json')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '../../index.html'))
);

app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, '../../notes.html'))
)

app.get('/api/notes', (req, res) =>
    fs.readFile(dbFilePath, 'utf8', (err, data) => {
        if(err) {
            console.error(err);
        } else {
            const notes = JSON.parse(data);
            res.json(notes);
        }
    })
)



app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);