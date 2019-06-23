const fs = require('file-system');
const readline = require('readline');

//function to read in text file and retrieve id and score
let parseFile = inputFilePath => {
  let records = [];
  const input = fs.createReadStream(inputFilePath);
  const rl = readline.createInterface(input);
  rl.on('line', (line) => {
    console.log('heres the line', line);
    if (line) {
      var segments = line.split(/[0-9]\:/);
      var score = Number(segments[0]);
      var data = JSON.parse(segments[1]);
      console.log('score', score, 'segments', data)
      if (data.id) {
        let record = {};
        record.id = data.id;
        record.score = score;
        records.push(record);
      }
    }
  });
  rl.on('close', () => {
    console.log('here is the records array', records);
  })
}

parseFile('./data.txt');