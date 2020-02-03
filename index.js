let fs = require("fs");
let IRoutput = require("./output");
let IRindex = require("./invindex");

let outputPosIndex = "posIndexFinal.txt";
let outputBiwIndex = "biwIndexFinal.txt"
let outputJSON = "invIndex.json";
let inputDir = "./inputcollection/";

let inDirFileArr = [];

//GETTING THE FILENAMES
fs.readdirSync(inputDir).forEach(file => {
    inDirFileArr.push(file);
});

let t0 = new Date();
let posIndex = IRindex.buildPosIndex(inDirFileArr, inputDir);
let biwIndex = IRindex.buildBiwIndex(inDirFileArr, inputDir);
let t1 = new Date();

IRoutput.writePosIndex(outputPosIndex, posIndex);
IRoutput.writeBiwIndex(outputBiwIndex, biwIndex);
// IRoutput.writeInvIndexJSON(outputJSON, invIndex);

console.log("Retrieval time: " + (t1 - t0) + "ms\n\n");
// console.log("Inverted index saved to: " + outputIndex);
// console.log("Auxilary JSON saved to: " + outputJSON);