const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readFromFile,readAndAppend, writeToFile,} = require('../db/fsUtils');

// GET Route for retrieving all the tips
notes.get('/', (req, res) => {
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// POST Route 
notes.post('/', (req, res) => {
    console.log(req.body);
    const {title,text} = req.body;
    if (title && text) {
      const newtext = {
        title,
        text,
        note_id: uuidv4()
      };
      const response = {
        status: 'success',
        body: newtext,
      };
      readAndAppend(newtext, './db/db.json');
      res.json(`Notes added successfully!`);
    } 
    else {res.error('Error in adding notes');}
});   

notes.delete('/:note_id', (req, res) => {
  console.log("NoteID: "+ noteId);
  readFromFile('./db/db.json')
     .then((data) => JSON.parse(data))
     .then((json) => {
    const result = json.filter((db) => db.note_id !== noteId);
    console.log("result: "+ result);
    writeToFile('./db/db.json', result);
    res.json(`Item ${note_Id} has been deleted 🗑️`);
    })
}); 

module.exports = notes;
