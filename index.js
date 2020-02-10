let fs = require("fs");
let rls = require('readline-sync');
let pt = require('./source/preftree')
let IRoutput = require("./source/output");
let IRindex = require("./source/structures");
let IRsearch = require("./source/search");

let inputDir = "./inputcollection/";
let outputDict = "./output/dictFinal.txt";
let outputPermIndex = "./output/permIndexFinal.txt";
let outputPosIndex = "./output/posIndexFinal.txt";
let outputBiwIndex = "./output/biwIndexFinal.txt";

//GETTING THE FILENAMES
let inDirFileArr = [];
fs.readdirSync(inputDir).forEach(file => {
    inDirFileArr.push(file);
});

//BUILDING POSITION INDEX & BIWORD INDEX
// let t0 = new Date();
let dict = IRindex.buildDict(inDirFileArr, inputDir);
// let t1 = new Date();
let posIndex = IRindex.buildPosIndex(inDirFileArr, inputDir);
// let t2 = new Date();
// let biwIndex = IRindex.buildBiwIndex(inDirFileArr, inputDir);
// let t3 = new Date();
// let t4 = new Date();
// console.log(prefTree.find("COMP"));

let permIndex = IRindex.buildPermIndex(dict);
let prefTree = IRindex.buildPrefTreeFromPermInd(permIndex);

let searchInput = rls.question("Wildcard permuterm index search input: ");
console.log(IRsearch.searchWildPermInd(prefTree, permIndex, posIndex, searchInput));
// let ThreeGramIndex = IRindex.buildKgramIndex(dict, 3);

// WRITING THE OUTPUT FILES
// IRoutput.writeDict(outputDict, dict);
// IRoutput.writePosIndex(outputPosIndex, posIndex);
// IRoutput.writeBiwIndex(outputBiwIndex, biwIndex);

// console.log("\nDictionary building time: " + (t1 - t0) + "ms\n");
// console.log("Position index building time: " + (t2 - t1) + "ms\n");
// console.log("Biword index building time: " + (t3 - t2) + "ms\n");
// console.log("Prefix tree building time: " + (t4 - t3) + "ms\n");