const fs = require("fs");
const readlineSync = require('readline-sync');
const _ = require("underscore")

//GETTING INVERTED INDEX FROM JSON
let jsonContents = fs.readFileSync("invIndex.json");
let invIndex = JSON.parse(jsonContents);

//GETTING BOOLEAN SEARCH INPUT
let searchInput = readlineSync.question("Boolean search input: ");
let t0 = new Date();
searchInput = searchInput.split(/[^a-zA-Z]/);

//CONVERTING INPUT WORDS TO THEIR OCCURENCES
for (let i = 0; i < searchInput.length; i++) {
    if (searchInput[i] != "AND" && searchInput[i] != "OR" && searchInput[i] != "NOT") {
        searchInput[i] = invIndex[searchInput[i].toUpperCase()];
    };
};

//SEARCHING THE DOCUMENT ACCORDING TO THE BOOLEAN OPERATORS
while (searchInput.length > 1) {
    var currOperator = searchInput[1];
    var word1 = searchInput[0];
    var word2 = searchInput[2];
    switch (currOperator) {
        case "AND":
            searchInput[0] = _.intersection(word1, word2);
            searchInput.splice(1, 2);
            break;
        case "OR":
            searchInput[0] = _.union(word1, word2);
            searchInput.splice(1, 2);
            break;
        case "NOT":
            searchInput[0] = _.difference(word1, word2);
            searchInput.splice(1, 2);
            break;
        default:
            console.log("Wrong operator format!\nPlease try again.");
            break;
    }
}

//CHECKING IF THE RESULT IS EMPTY
if (searchInput[0].length < 1) {
    searchInput[0] = "not found."
} else {
    //SORTING THE RESULT
    searchInput[0].sort(function(a, b) {
        return (+a) - (+b);
    })
}

let t1 = new Date();

console.log("\nRetrieval time: " + (t1 - t0) + "ms");
console.log("Result: " + searchInput[0] + "\n");