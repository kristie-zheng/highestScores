const fs = require('file-system');
const readline = require('readline');

//function to read in text file and retrieve id and score
let parseFile = inputFilePath => {
  const input = fs.createReadStream(inputFilePath);
  const rl = readline.createInterface(input);
  rl.on('line', (line) => {
    console.log('heres the line', line);
    if (line) {
      var segments = line.split(/[0-9]\:/);
      console.log(segments);
      var score = Number(segments[0]);
      var data = segments[1];
      console.log('score', score, 'segments', data)
      console.log('parsed', JSON.parse(data))
    }
  });
  rl.on('close', () => {
    console.log('done');
  })
}

parseFile('./data.txt');