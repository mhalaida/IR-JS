let fs = require("fs");
let spimi = require("./spimi");
// let IRoutput = require("./source/output");
// let IRDS = require("./source/structures");            

let inputDir = "/Users/m.halaida/Downloads/gutenberg";
// let inputDir = "./inputcollection/";

let invIndex = {};
console.log(spimi.spimiIndex(inputDir, 0));