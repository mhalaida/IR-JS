let fs = require("fs");
let outputIndex = "indexFinal.txt";
let outputMatrix = "matrixFinal.txt";
let outputJSON = "invIndex.json";
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
        invIndex[unsWord] = (auxIndex[unsWord]);
    }
});

//REMOVING DUPLICATES FROM INVINDEX VALUES
for (const word in invIndex) {
    let auxSet = new Set(invIndex[word]);
    invIndex[word] = [...auxSet];
}

let t1 = new Date();

//WRITING INVERTED INDEX TO INDEXFINAL
fs.writeFile(outputIndex, '', function () { });
let writerInd = fs.createWriteStream(outputIndex, { flags: 'a' });
for (const word in invIndex) {
    writerInd.write(word);
    for (let i = 0; i < (20 - word.length); i++) {
        writerInd.write(' ');
    }
    writerInd.write(" => " + invIndex[word] + "\n");
}

//WRITING INCIDENCE MATRIX TO MATRIXFINAL
fs.writeFile(outputMatrix, '', function () { });
let writerMat = fs.createWriteStream(outputMatrix, { flags: 'a' });
writerMat.write("document ID:");
for (let i = 0; i < (19 - "document ID".length); i++) {
    writerMat.write(' ');
}
for (let i = 0; i < inDirFileArr.length; i++) {
    writerMat.write((i + 1) + "  ");
    if (i == inDirFileArr.length - 1) {
        writerMat.write("\n\n");
    }
}
for (const word in invIndex) {
    writerMat.write(word);
    for (let i = 0; i < (20 - word.length); i++) {
        writerMat.write(' ');
    }
    for (let i = 0; i < inDirFileArr.length; i++) {
        if (invIndex[word].includes(i + 1)) {
            writerMat.write("1  ");
        } else {
            writerMat.write("0  ");
        }
    }
    writerMat.write("\n");
}

fs.writeFile(outputJSON, '', function () { });
fs.writeFile(outputJSON, JSON.stringify(invIndex), (err) => { if (err) throw error; });

console.log("Retrieval time: " + (t1 - t0) + "ms\n\n");
console.log("Incidence matrix saved to: " + outputMatrix);
console.log("Inverted index saved to: " + outputIndex);
console.log("Auxilary JSON saved to: " + outputJSON);