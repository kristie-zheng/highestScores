#Top Score Finder
* Main directory: `findHighestScore.js`
* Subdirectory test_files: `generateRecords.js` and test files .txt and .data

1. To generate sample data, run `test_files/generateRecords.js` with node
  1. Invoke `generateRecords` with desired number of records
  2. Invoke `shuffleRecords` on array output by  `generateRecords`
  3. Invoke `writeFile` with relative filePath (string), fileName (string), and data (already filled in)
2. To execute main function, run `findHighestScore.js` with node
  1. Main function `nHighestByFile` is invoked with relative filePath (string) and n (number) and will invoke callbacks
