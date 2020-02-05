let fs = require("fs");
let IRoutput = require("./source/output");
let IRindex = require("./source/invindex");
let IRsearch = require("./source/search");

let inputDir = "./inputcollection/";
let outputPosIndex = "./output/posIndexFinal.txt"
let outputBiwIndex = "./output/biwIndexFinal.txt"
let outputPosJSON = "./output/posIndex.json";
let outputBiwJSON = "./output/biwIndex.json";

//GETTING THE FILENAMES
let inDirFileArr = [];
fs.readdirSync(inputDir).forEach(file => {
    inDirFileArr.push(file);
});

//BUILDING POSITION INDEX & BIWORD INDEX
let t0 = new Date();
let posIndex = IRindex.buildPosIndex(inDirFileArr, inputDir);
let t1 = new Date();
let biwIndex = IRindex.buildBiwIndex(inDirFileArr, inputDir);
let t2 = new Date();

//WRITING THE OUTPUT FILES
// IRoutput.writePosIndex(outputPosIndex, posIndex);
// IRoutput.writeBiwIndex(outputBiwIndex, biwIndex);
// IRoutput.writePosIndexJSON(outputPosJSON, posIndex);
// IRoutput.writeBiwIndexJSON(outputBiwJSON, biwIndex);

console.log(IRsearch.searchBiwIndPhra(biwIndex, "progress through the guts of a beggar"));

console.log("\nPosition index building time: " + (t1 - t0) + "ms\n");
console.log("Biword index building time: " + (t2 - t1) + "ms\n")