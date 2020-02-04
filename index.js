let fs = require("fs");
let IRoutput = require("./source/output");
let IRindex = require("./source/invindex");

let outputPosIndex = "./out/posIndexFinal.txt"
let outputBiwIndex = "./out/biwIndexFinal.txt"
let outputPosJSON = "./out/posIndex.json";
let outputBiwJSON = "./out/biwIndex.json";
let inputDir = "./inputcollection/";


//GETTING THE FILENAMES
let inDirFileArr = [];
fs.readdirSync(inputDir).forEach(file => {
    inDirFileArr.push(file);
});

let t0 = new Date();
let posIndex = IRindex.buildPosIndex(inDirFileArr, inputDir);
let t1 = new Date();
let biwIndex = IRindex.buildBiwIndex(inDirFileArr, inputDir);
let t2 = new Date();

IRoutput.writePosIndex(outputPosIndex, posIndex);
IRoutput.writeBiwIndex(outputBiwIndex, biwIndex);
IRoutput.writePosIndexJSON(outputPosJSON, posIndex);
IRoutput.writeBiwIndexJSON(outputBiwJSON, biwIndex);

console.log("\nPosition index building time: " + (t1 - t0) + "ms\n");
console.log("Biword index building time: " + (t2 - t1) + "ms\n")