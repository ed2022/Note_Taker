// Import our modular routers for /notes and express(from node library)
const express = require('express');
const fs = require('fs');
const db = require('../db/db.json'); 

const app = express();


//initializing the app to be exported
module.exports = app;
