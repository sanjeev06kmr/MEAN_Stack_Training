// To read CSV and save to JSON output file
let convertSCVtoJSON = require('convert-csv-to-json');
// To Read File Stream
const fs = require('fs');

let fileInputName = './CSVFile/Sample.csv'; 
let fileOutputName = './JSONOutput/JSONOutput.json';

// Saving CSVFile file into JSONOutput.json file
convertSCVtoJSON.generateJsonFileFromCsv(fileInputName,fileOutputName);

// Creating REadStream to read and pring from JSON output file
const readStream = fs.createReadStream('./JSONOutput/JSONOutput.json', 'utf8');

readStream.on('data', function(chunk){
    console.log(chunk);
});

