const faker = require('faker');

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
    recordString = recordString.slice(0, -2) 
    recordString += '}'
    recordStrings.push(recordString);
  }
  return recordString;
}
generateRecords(10)