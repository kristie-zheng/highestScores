const fs = require('file-system');
const readline = require('readline');

//function to read in text file and retrieve id and score
let parseFile = inputFilePath => {
  let records = [];
  const input = fs.createReadStream(inputFilePath);
  const rl = readline.createInterface(input);
  let lineNumber = 1;

  rl.on('line', (line) => {
    console.log('heres the line', line);
    if (line) {
      let segments = line.split(/[0-9]\:/);
      let score = Number(segments[0]);
      try {
        let data = JSON.parse(segments[1]);
        if (data.id) {
          let record = {};
          record.id = data.id;
          record.score = score;
          records.push(record);
          console.log('score', score, 'segments', data)
        }
      }
      catch(exception) {
        console.log("Problem parsing JSON at row", lineNumber, exception)
      }
    }
    lineNumber++
  });
  
  rl.on('close', () => {
    console.log('here is the records array', records);
  })
}

parseFile('./data.txt');