let fs = require("fs");
let IRoutput = require("./output");
let IRindex = require("./invindex");

let outputIndex = "indexFinal.txt";
let outputJSON = "invIndex.json";
let inputDir = "./inputcollection/";

let inDirFileArr = [];


//GETTING THE FILENAMES
fs.readdirSync(inputDir).forEach(file => {
    inDirFileArr.push(file);
});

let t0 = new Date();
let invIndex = IRindex.buildInvIndex(inDirFileArr, inputDir);
// console.log(invIndex);

let t1 = new Date();


IRoutput.writeInvIndex(outputIndex, invIndex);
IRoutput.writeInvIndexJSON(outputJSON, invIndex);

console.log("Retrieval time: " + (t1 - t0) + "ms\n\n");
console.log("Inverted index saved to: " + outputIndex);
console.log("Auxilary JSON saved to: " + outputJSON);