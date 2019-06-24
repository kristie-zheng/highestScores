const faker = require('faker');
const fs = require('file-system');
let randomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; 
}

let generateRecords = (number) => {
  let recordStrings = [];
  for (var i = 0; i < number; i++) {
    let score = i;
    let recordString = `${score}: {"id": "${faker.random.uuid()}", `;
    let numKeys = randomInt(1, 10);
    for (var j = 0; j < numKeys; j++) {
      recordString += `"${faker.random.word()}": "${faker.random.word()}", `
     
    } 
    recordString = recordString.slice(0, -2); 
    recordString += "}";
    recordStrings.push(recordString);
  }
  return recordStrings;
}

let shuffle = (records) => { 
  for (var i = 0; i < records.length; i++) {
    let randomIndex = i + Math.floor(Math.random() * (records.length -i));
    let temp = records[i];
    records[i] = records[randomIndex];
    records[randomIndex] = temp;
  }
  return records;
}
let shuffledRecords = shuffle(generateRecords(10000));

let writeFile = (path, fileName, data) => {
  fs.writeFile(`${path}/${fileName}`, data, (err) => {
    console.log(`${path}/${fileName}`)
    if (err) { 
      console.log(err)
    } else {
      console.log('The file has been saved with the id of ' + fileName);
    }
});
}

writeFile('.', 'LargeNumValidRecords.data', shuffledRecords.map((record) => { return record }).join('\n'),)