let fs = require("fs");
let spimi = require("./spimi");
let sizeof = require("./node_modules/object-sizeof")
// let IRoutput = require("./source/output");
// let IRDS = require("./source/structures");            

// let inputDir = "/Users/m.halaida/Downloads/gutenberg";
let outputDir = "/Users/m.halaida/Desktop/SPIMI_OUT/"
let inputDir = "./2/";

fileStream = [];
let result = spimi.fileStream(inputDir, fileStream);
console.table(result)
console.log("Finished building the filestream");

spimi.buildSpimi(result, outputDir);

// console.log("Size of file stream: " + (sizeof(result)) / 1e+6 + " MB");