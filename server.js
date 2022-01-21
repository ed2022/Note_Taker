const express = require('express');
const path = require('path');
const api = require('./routes/routes.js');

const PORT = process.env.PORT || 3001;
const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

//this way it uses the front end 
app.use(express.static('public'));

//when start, then either port 3001 will be used as default unless we upload this to heroku then it will use the modular port option 
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
