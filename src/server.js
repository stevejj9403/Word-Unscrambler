const express = require('express');
const fs = require('fs');
const csv = require('csv-parser');
const _ = require('lodash');
const cors = require('cors');

const app = express();
app.use(cors({
  
}))

const port = process.env.PORT || 3000;

var words = [];

var scrambledWords = [];

//Since the csv parsing is async, returning a promise ensures scrambledWords is defined
function parseCSV() {
  return new Promise((resolve, reject) => {
    fs.createReadStream('english-words.csv')
      .pipe(csv())
      .on('data', (row) => {
        words.push(row.the);
      })
      .on('end', () => {
        words.forEach((word) => {
          scrambledWords.push({
            word: word,
            scrambled: scrambleWord(word)
          });
        });
        resolve(scrambledWords); // Resolve the promise with scrambledWords
      })
      .on('error', (error) => {
        reject(error); // Reject the promise in case of an error
      });
  });
}

//parses the csv first, then initializes the backend server using express 
parseCSV()
  .then(() => {
    console.log('CSV file has been read and processed.');

    //restful API get method
    //gets a random word and its scrambled version
    app.get('/scramble', (req, res) => {
      const index = Math.floor(Math.random() * scrambledWords.length)

      res.status(200).send(scrambledWords[index]);
    });
    
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
    
  })
  .catch((error) => {
    console.error('Error reading and processing CSV:', error);
  });


//returns the scrambled version of <word>
function scrambleWord(word) {
  //handles empty words
  if(!word)
    return '';
  const characters = word.split('');
  var scrambled = _.shuffle(characters).join('');
  //ensures that the word is actually scrambled
  while(scrambled === word)
    scrambled = scrambleWord(word);
  return scrambled;
}