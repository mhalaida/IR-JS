let spimi = require("./spimi");
let outputDir = "/Users/m.halaida/Desktop/SPIMI_OUT/"
let inputDir = "/Users/m.halaida/Desktop/gutenberg/4/";

// fileStream = [];
// let result = spimi.fileStream(inputDir, fileStream);
// console.table(result)

// console.log("Finished building the filestream");

// console.log(spimi.buildSpimi(result, outputDir));

console.log(spimi.mergeBlocks(outputDir));