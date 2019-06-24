const fs = require('file-system');
const readline = require('readline');
const buckets = require('buckets-js');

/*
  function to read in text file and produce array of records
  takes inputFilePath, a callback, and a number of records desired [pass to CB]
  logs + returns result of the callback: an array of the n highest scores
*/
let parseFile = (inputFilePath, afterParsed, n) => {
  let records = [];
  const input = fs.createReadStream(inputFilePath);
  const rl = readline.createInterface(input);
  let lineNumber = 1;

  rl.on('line', (line) => {
    // console.log('heres the line', line);
    if (line) {
      let segments = line.split(/([0-9]+)\:/).slice(1);
      let score = Number(segments[0]);
      try {
        let data = JSON.parse(segments[1]);
        if (data.id) {
          let record = {};
          record.id = data.id;
          record.score = score;
          records.push(record);
        }
      }
      catch(exception) {
        console.log("Problem parsing JSON at row", lineNumber, exception)
        return process.exit(2)
      }
    }
    lineNumber++
  });

  rl.on('close', () => {
    // console.log('here is the records array', records);
    var returnFromCB = afterParsed(records, n)
    console.log(`The ${n} highest scores are`, returnFromCB)
    return returnFromCB;
  });
}

/*
  function that retrieves n top scores from an array of records
  takes in an input array and a number of top records to retrieve
  returns array of the n top scores
  used as callback to parseFile function
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
    if ( minHeap.size() < n || record.score > minHeap.peek().score) {
      minHeap.add(record);
    }
    if (minHeap.size() > n) {
      minHeap.removeRoot();
    }
  })
  while (minHeap.size() > 0) {
    let removedVal = minHeap.removeRoot();
    nHighestScores.push(JSON.stringify(removedVal));
  }
  return nHighestScores.reverse();
}

/*
  "main function"
  function that finds n highest scores
  take in file path and n
  invokes parseFile
  outputs / log json file
 */

let nHighestByFile = (filePath, n) => {
  if (n === 0) {
    return process.exit(0);
  }
  fs.access(filePath, fs.constants.F_OK, (err) =>{
    if(err) {
      console.log(`The file at path ${filePath} does not exist.`);
      return process.exit(1);
    }
  });
  return parseFile(filePath, findHighestScores, n);
}
nHighestByFile('./test_files/LargeNumValidRecords.data', 100);