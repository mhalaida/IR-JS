let fs = require("fs");
let rls = require('readline-sync');
let pt = require('./source/preftree')
let IRoutput = require("./source/output");
let IRDS = require("./source/structures");            //IR DATA STRUCTURES
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

let t1, t0;

t0 = new Date();
let posIndex = IRDS.buildPosIndex(inDirFileArr, inputDir);
t1 = new Date();
console.log("\nPosition index building time: " + (t1 - t0) + "ms\n");
IRoutput.writePosIndex(outputPosIndex, posIndex);
let searchInput = rls.question("Position index phrase search input: ");
t0 = new Date();
console.log(IRsearch.searchPosIndPhra(posIndex, searchInput));
t1 = new Date();
console.log("\nPosition index phrase search time: " + (t1 - t0) + "ms");

t0 = new Date();
let biwIndex = IRDS.buildBiwIndex(inDirFileArr, inputDir);
t1 = new Date();
console.log("Biword index building time: " + (t1 - t0) + "ms\n");
IRoutput.writeBiwIndex(outputBiwIndex, biwIndex);
searchInput = rls.question("Biword index phrase search input: ");
t0 = new Date();
console.log(IRsearch.searchBiwIndPhra(biwIndex, searchInput));
t1 = new Date();
console.log("Biword index phrase search time: " + (t1 - t0) + "ms\n");

t0 = new Date();
let permIndex = IRDS.buildPermIndex(posIndex);
t1 = new Date();
console.log("Permuterm index building time: " + (t1 - t0) + "ms\n");
t0 = new Date();
let prefTree = IRDS.buildPrefTree(permIndex);
t1 = new Date();
console.log("Prefix tree building time: " + (t1 - t0) + "ms\n");

searchInput = rls.question("\nWildcard permuterm index search input: ");
t0 = new Date();
console.log(IRsearch.searchWildPermInd(prefTree, permIndex, posIndex, searchInput));
t1 = new Date();
console.log("Wildcard query with permuterm index search time: " + (t1 - t0) + "ms\n");

t0 = new Date();
let threeGrInd = IRDS.buildKgramIndex(posIndex, 3);
t1 = new Date();
console.log("3-gram index building time: " + (t1 - t0) + "ms\n");

searchInput = rls.question("\nWildcard 3-gram index search input: ")
t0 = new Date();
console.log(IRsearch.searchWildThrgramInd(threeGrInd, posIndex, searchInput));
t1 = new Date();
console.log("Wildcard query with 3-gram index search time: " + (t1 - t0) + "ms\n");