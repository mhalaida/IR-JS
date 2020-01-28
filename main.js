let fs = require("fs");
let outputIndex = "indexFinal.txt";
let inputDir = "./inputcollection/";
let inDirFileArr = [];
let t0 = new Date()
var auxData = [];
var auxIndex = {};
var invIndex = {};

//GETTING THE FILENAMES
fs.readdirSync(inputDir).forEach(file => {
    inDirFileArr.push(file);
});

//AUXDATA ARRAY FOR WORDS ANS AUXINDEX OBJECT FOR THEIR OCCURENCES
inDirFileArr.forEach(function (fileName, fileIndex) {
    let filepath = inputDir + fileName;
    let data = fs.readFileSync(filepath).toString('utf-8');
    data = data.toUpperCase().split(/[^a-zA-Z]/);
    auxData = auxData.concat(data);
    data.forEach(word => {
        if (isNaN(word)) {
            if (auxIndex[word] == undefined) {
                auxIndex[word] = [];
            }
            auxIndex[word].push(fileIndex + 1);
        }
    });
})

//REMOVING DUPLICATES FROM AUXINDEX VALUES
for (const unsWord in auxIndex) {
    let auxWordSet = new Set(auxIndex[unsWord]);
    auxIndex[unsWord] = [...auxWordSet];
}

//MOVING THE OCCURENCES TO INVINDEX OBJECT
auxData.sort();
auxData.forEach(unsWord => {
    if (isNaN(unsWord)) {
        if (invIndex[unsWord] == undefined) {
            invIndex[unsWord] = [];
        }
        invIndex[unsWord].push(auxIndex[unsWord]);
    }
});

//REMOVING DUPLICATES FROM INVINDEX VALUES
for (const word in invIndex) {
    let auxSet = new Set(invIndex[word]);
    invIndex[word] = [...auxSet];
}

let t1 = new Date();

//WRITING TO FILE
fs.writeFile(outputIndex, '', function () { });
let writer = fs.createWriteStream(outputIndex, { flags: 'a' });
for (const word in invIndex) {
    writer.write(word + " => " + invIndex[word] + "\n");
}

console.log("Execution time: " + (t1 - t0) + "ms\n");