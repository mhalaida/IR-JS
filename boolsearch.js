const fs = require("fs");
const readline = require('readline');

let broskiContents = fs.readFileSync("invIndex.json");
let broski = JSON.parse(broskiContents);
console.log(broski);

// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

// let searchInput;

// rl.question("Search input:\n", (answer) => {
//     searchInput = answer;
//     console.log(`\nYour input: ${answer}`);
//     rl.close();
// });

// searchInput.forEach(element => {
//     console.log(element);
// });

// console.log("Input: " + searchInput);