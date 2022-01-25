const fs = require('fs');
const util = require('util');

// Promise version of fs.readFile
const readFromFile = util.promisify(fs.readFile);

const writeToFile = (content) =>
  fs.writeFile('./db/db.json', JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to DB`)
);

const readAndAppend = (content) => {
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      writeToFile(parsedData);
      console.log("ReanderandAppend is working!")
    }
  });
};

module.exports = { readFromFile, writeToFile, readAndAppend };
