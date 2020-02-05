let fs = require("fs");
let rls = require('readline-sync');
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

// WRITING THE OUTPUT FILES
IRoutput.writePosIndex(outputPosIndex, posIndex);
IRoutput.writeBiwIndex(outputBiwIndex, biwIndex);

let searchInput = rls.question("Biword phrase search input: ");
console.log(IRsearch.searchBiwIndPhra(biwIndex, searchInput));

searchInput = rls.question("Position index phrase search input: ");
console.log(IRsearch.searchPosIndPhra(posIndex, searchInput));

console.log("\nPosition index building time: " + (t1 - t0) + "ms\n");
console.log("Biword index building time: " + (t2 - t1) + "ms\n")