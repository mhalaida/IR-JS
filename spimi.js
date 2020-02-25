let fs = require("fs");
let path = require("path");
let recursiveReadDir = require("./node_modules/recursive-readdir");

module.exports = {

    spimiIndex(inputDir) {
        spimiInd = buildSpimi(inputDir, 0);
        return spimiInd;
    }
}

function buildSpimi(dirPath, fileCount) {
    fileCount = fileCount || 0;
    fs.readdirSync(dirPath).forEach(function (file) {
        let filepath = path.join(dirPath, file);
        let stat = fs.statSync(filepath);
        if (stat.isDirectory()) {
            fileCount = buildSpimi(filepath, fileCount);
        } else {
            fileCount++;
            let data = fs.readFileSync(filepath).toString('utf-8');
            data = data.toUpperCase().split(/[^a-zA-Z]/).filter(function (ch) { return ch.length != 0; });
            let invIndex = {};
            for (let i = 0; i < data.length; i++) {
                if (invIndex[data[i]] == undefined) {
                    invIndex[data[i]] = [];
                }
                if (!invIndex[data[i]].includes(fileCount)) {
                    invIndex[data[i]].push(fileCount);
                }
            }
            console.log(fileCount)
            // console.log(data.length);
            // console.log("aight: ");
            // console.log(invIndex);
        }
    });
    return fileCount;
}