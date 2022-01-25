const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readFromFile,readAndAppend, writeToFile,} = require('../db/fsUtils');
const db = require('./db/db.json');

// GET Route for retrieving all the tips
notes.get('/', (req, res) => {
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});
// //GET Route for retriving the single id and rendering on right side
// // notes.get('/:note_id', (req, res) => {
// //   readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
// // });
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
  const noteId = req.params.note_id;
  db.splice(noteId- 1, 1);
  // Reassign id for each note object
  db.forEach((obj, i) => {
    obj.noteId = i + 1;
  });
  // Return the remaining notes to the client
  fs.writeFile("./db/db.json", JSON.stringify(db), function () {
    res.json(db);   
    });
  

//   console.log("NoteID: "+ noteId);
//   readFromFile('./db/db.json')
//      .then((data) => JSON.parse(data))
//      .then((json) => {
//     const result = json.filter((db) => db.note_id !== noteId);
//     console.log("result: "+ result);
//     writeToFile('./db/db.json', result);
//     res.json(`Item ${note_Id} has been deleted 🗑️`);
//     })
}); 

module.exports = notes;