let fs = require("fs");
let IRoutput = require("./output");
let IRindex = require("./invindex");

let outputIndex = "indexFinal.txt";
let outputMatrix = "matrixFinal.txt";
let outputJSON = "invIndex.json";
let inputDir = "./inputcollection/";

let inDirFileArr = [];
let invIndexMap = new Map();

let t0 = new Date();

//GETTING THE FILENAMES
fs.readdirSync(inputDir).forEach(file => {
    inDirFileArr.push(file);
});

let invIndex = IRindex.buildInvIndex(inDirFileArr, inputDir);

console.table(invIndex["ACCIDENTS"]);

// let t1 = new Date();

// IRoutput.writeInvIndex(outputIndex, invIndex);
// IRoutput.writeInvIndexJSON(outputJSON, invIndex);
// IRoutput.writeIncMatrix(outputMatrix, invIndex, inDirFileArr);

// console.log("Retrieval time: " + (t1 - t0) + "ms\n\n");
// console.log("Incidence matrix saved to: " + outputMatrix);
// console.log("Inverted index saved to: " + outputIndex);
// console.log("Auxilary JSON saved to: " + outputJSON);