let fs = require("fs");
let outputDict = "dictFinal.txt";
let inputDir = "./inputcollection/";
let inDirFileArr = [];
let totalWordsCounter = 0;
let wordsInDictFin = 0;
let t0 = new Date()

//GETTING THE FILENAMES
fs.readdirSync(inputDir).forEach(file => {
    inDirFileArr.push(file);
});

//CREATING ARRAY TO STORE ALL WORDS WITH THEIR OCCURENCES
let invIndex = {};

inDirFileArr.forEach(function (fileName, fileIndex) {
    let filepath = inputDir + fileName;
    let data = fs.readFileSync(filepath).toString('utf-8');
    data = data.toUpperCase().split(/[\W\d\s_]/);
    data.forEach(word => {
        if (invIndex[word] == undefined) {
            invIndex[word] = [];
        } 
        invIndex[word].push(fileIndex + 1);
    });
})

for (const word in invIndex) {
    let auxSet = new Set(invIndex[word]);
    invIndex[word] = [...auxSet];
}

fs.writeFile(outputDict, '', function () { });
let writer = fs.createWriteStream(outputDict, { flags: 'a' });
for (const word in invIndex) {
    writer.write(word + " => " + invIndex[word] + "\n");
}

let t1 = new Date();

console.log("\nTotal number of words in collection: " + totalWordsCounter);
console.log("Total number of words in dictionary: " + wordsInDictFin);
console.log("Execution time: " + (t1-t0) + "ms\n");