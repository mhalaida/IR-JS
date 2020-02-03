let fs = require("fs");
let IRoutput = require("./output");
let IRindex = require("./invindex");
let L = require("list");

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

let t1 = new Date();

for (let docID = 0; docID < invIndex["ACCIDENTS"].length; docID++) {
    console.log("\n");
    for (let occID = 0; occID < L.nth(docID, invIndex["ACCIDENTS"]).length; occID++) {
        console.log(L.nth(occID, L.nth(docID, invIndex["ACCIDENTS"])));
    }
}

//console.log(L.nth(0, (L.nth(2, invIndex["ACCIDENTS"]))));



// IRoutput.writeInvIndex(outputIndex, invIndex);
// IRoutput.writeInvIndexJSON(outputJSON, invIndex);
// IRoutput.writeIncMatrix(outputMatrix, invIndex, inDirFileArr);

console.log("Retrieval time: " + (t1 - t0) + "ms\n\n");
// console.log("Incidence matrix saved to: " + outputMatrix);
// console.log("Inverted index saved to: " + outputIndex);
// console.log("Auxilary JSON saved to: " + outputJSON);