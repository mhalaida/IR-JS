let spimi = require("./spimi");
let outputDir = "/Users/m.halaida/Desktop/SPIMI_SMALL/"
let inputDir = "/Users/m.halaida/Desktop/gutenberg/4/0/0";

// fileStream = [];
// let result = spimi.fileStream(inputDir, fileStream);
// console.table(result)
// console.log("Finished building the filestream");
// console.log(spimi.buildSpimi(result, outputDir));

// console.log(spimi.mergeBlocks(outputDir));

let masterInput = "/Users/m.halaida/Desktop/SPIMI_SMALL/master";
let compIndex = "/Users/m.halaida/Desktop/SPIMI_SMALL/compindex";
let compDict = "/Users/m.halaida/Desktop/SPIMI_SMALL/compdict";
spimi.compressIndex(masterInput, compIndex, compDict)