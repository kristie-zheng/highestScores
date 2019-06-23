const fs = require('file-system');
const readline = require('readline');
const buckets = require('buckets-js');

/*
  function to read in text file and retrieve id and score
  takes inputFilePath (string)
  returns array of objects (records) containing id and score
*/
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
  });
  return records;
}

/*
  function that retrieves n top scores from an array
  takes in an input array and a number of top records to retrieve
  returns array of the n top scores
*/

let comparator = (objectA, objectB) => {
  if (objectA.score === objectB.score) {
    return 0;
  }
  return objectA.score < objectB.score ? -1 : 1;
}

let findHighestScores = (records, n) => {
  var nHighestScores = [];
  let minHeap = new buckets.Heap(comparator);
  records.forEach(record => {
    if (record.score > minHeap.peek()) {
      minHeap.add(record);
    }
    if (minHeap.size() > n) {
      minHeap.removeRoot();
    }
  })
  while (minHeap.size() > 0) {
    let removedVal = minHeap.removeRoot();
    nHighestScores.push(removedVal);
  }
  console.log('here are the', n, 'highstScores', nHighestScores);
  return nHighestScores;
}

/*
  "main function"
  function that finds n highest scores
  take in file path and n
  output / log json file
 */

let nHighestByFile = (filePath, n) => {
  let dataRecords = parseFile(filePath);
  let highestScores = findHighestScores(dataRecords, n);
  console.log(highestScores);
  return highestScores;
}

console.log(nHighestByFile('./data.txt', 3))