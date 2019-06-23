const fs = require('file-system');
const readline = require('readline');

//function to read in text file and retrieve id and score
let parseFile = inputFilePath => {
  const input = fs.createReadStream(inputFilePath);
  const rl = readline.createInterface(input);
  rl.on('line', (line) => {
    var record = {};
    console.log('heres the line', line);
    if (line) {
      var segments = line.split(/[0-9]\:/);
      var score = Number(segments[0]);
      var data = JSON.parse(segments[1]);
      console.log('score', score, 'segments', data)
      if (data['id']) {
        record.id = data['id'];
        record.score = score;
      }
      console.log(record)
    }
  });
  rl.on('close', () => {
    console.log('done');
  })
}

parseFile('./data.txt');