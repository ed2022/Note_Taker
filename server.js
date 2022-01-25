//Requiring from Packages
const express = require('express');
const path = require('path');
const api = require('./routes/index'); 

//assigning port and app
const PORT = process.env.PORT || 3001;
const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/api', api);

// GET Route for feedback page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);
// Wildcard route to direct users to a 404 page
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);
//LISTEN when start, then either port 3001 will be used as default unless we upload this to heroku then it will use the modular port option 
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);