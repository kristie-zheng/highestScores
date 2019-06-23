const fs = require('file-system');
const readline = require('readline');

//function to read in text file and retrieve id and score
let parseFile = inputFilePath => {
  const input = fs.createReadStream(inputFilePath);
  const rl = readline.createInterface(input);
  rl.on('line', (line) => {
    console.log('heres the line', line)
  });
  rl.on('close', () => {
    console.log('done');
  })
}

parseFile('./data.txt');