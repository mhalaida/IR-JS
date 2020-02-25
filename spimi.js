let fs = require("fs");
let path = require("path");
let recursiveReadDir = require("./node_modules/recursive-readdir");

module.exports = {

    tokenStream(inputDir) {
        //getting the files paths
        allFiles = getAllFiles(inputDir);
        // recursiveReadDir(inputDir).then(
        //     function (files) {
        //         console.log("Filenames read successfully!");
        //         allFiles = files;
        //     },
        //     function (error) {
        //         console.error("Error when reading filenames!");
        //     }
        // );



        // setTimeout(function () { console.log(allFiles); }, 1000);
        return allFiles;
    }
}

function getAllFiles(dirPath, fileCount) {
    fileCount = fileCount || 0;
    fs.readdirSync(dirPath).forEach(function (file) {
        let filepath = path.join(dirPath, file);
        let stat = fs.statSync(filepath);
        if (stat.isDirectory()) {
            getAllFiles(filepath, fileCount);
        } else {
            fileCount++;
            let data = fs.readFileSync(filepath).toString('utf-8');
            data = data.toUpperCase().split(/[^a-zA-Z]/).filter(function (ch) { return ch.length != 0; });
            let invIndex = {};
            for (let i = 0; i < data.length; i++) {
                if (invIndex[data[i]] == undefined) {
                    invIndex[data[i]] = [];
                }
                if (!invIndex[data[i]].includes(file)) {
                    invIndex[data[i]].push(file);
                }
            }
            console.log(fileCount + " --------- " + file);
        }
    });
}