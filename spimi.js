let fs = require("fs");
let path = require("path");
let sizeof = require("./node_modules/object-sizeof")


module.exports = {

    fileStream: function (dirPath, fileStream) {
        return buildFileStream(dirPath, fileStream);
    },

    buildSpimi: function (fileStream, outDir) {
        let invIndex = {};
        let fileNameCount = 1;
        fileStream.forEach((filePath, fileIndex) => {
            let data = fs.readFileSync(filePath).toString('utf-8');
            data = data.toUpperCase().split(/[^a-zA-Z]/).filter(function (ch) { return ch.length != 0; });
            data.forEach((token, tokenIndex) => {

                if ((tokenIndex % 10000) == 0) {
                    console.log(fileIndex + " ------ " + tokenIndex + " ------ " + sizeof(invIndex));
                }
                // console.log(token + " ------- " + fileIndex);
                // console.log(sizeof(invIndex/1e+6 + "MB"));

                //CHANGE THE SIZE IF NECESSARY (4e+?)
                if (sizeof(invIndex) > 2000) {
                    let sortedInvIndex = {};
                    Object.keys(invIndex).sort().forEach((key) => {
                        sortedInvIndex[key] = invIndex[key];
                    });
                    let outputJSON = outDir + "block" + fileNameCount + ".json";
                    fileNameCount++;
                    fs.writeFile(outputJSON, JSON.stringify(sortedInvIndex), (err) => { if (err) throw err; });
                    invIndex = {};

                    console.log("2KB written");
                }

                if (invIndex[token] == undefined) {
                    invIndex[token] = [];
                };
                if (!invIndex[token].includes(fileIndex)) {
                    invIndex[token].push(fileIndex);
                }
            });
        });
        let sortedInvIndex = {};
        Object.keys(invIndex).sort().forEach((key) => {
            sortedInvIndex[key] = invIndex[key];
        });
        let outputJSON = outDir + "block" + fileNameCount + ".json";
        fs.writeFile(outputJSON, JSON.stringify(sortedInvIndex), (err) => { if (err) throw err; });
    }
}

function buildFileStream(dirPath, fileStream) {
    fileStream = fileStream || 0;
    fs.readdirSync(dirPath).forEach(function (file) {
        let filepath = path.join(dirPath, file);
        let stat = fs.statSync(filepath);
        if (stat.isDirectory()) {
            fileStream = buildFileStream(filepath, fileStream);
        } else {
            fileStream.push(filepath);
        }
    });
    return fileStream;
}