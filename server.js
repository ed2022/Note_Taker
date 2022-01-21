//Requiring from Packages
const express = require('express');
const path = require('path');
const api = require('./routes/routes.js'); 

//assigning port and app
const PORT = process.env.PORT || 3001;
const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);
app.use(express.static('public'));

//GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);
// GET Route for feedback page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);
// Wildcard route to direct users to a 404 page
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/404.html'))
);
// POST request to add a text
app.post('/api/notes', (req, res) => {
  // Log that a POST request was received
  console.info(`${req.method} request received to add a text`);
  const {title, text} = req.body;
  if (title && text) {
    const newtext = {
      title,
      text,
      // text_id: uuid(),
    };
    const response = {
      status: 'success',
      body: newtext,
    };
    console.log(response);
    res.status(201).json(response);} 
    else { res.status(500).json('Error in posting text');
  }
});
//LISTEN when start, then either port 3001 will be used as default unless we upload this to heroku then it will use the modular port option 
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
