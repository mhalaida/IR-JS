let fs = require("fs");
let path = require("path");

module.exports = {

    mergeBlocks: function () {
        let masterIndex = {};

    },

    fileStream: function (dirPath, fileStream) {
        return buildFileStream(dirPath, fileStream);
    },

    buildSpimi: function (fileStream, outDir) {
        let resultStats = {};
        let invIndex = {};
        let sortedInvIndex = {};
        let fileNameCount = 1;
        let outputTXT = "";
        let entryCounter = 0;
        let resString = "";
        let t0 = new Date();
        fileStream.forEach((filePath, fileIndex) => {
            let data = fs.readFileSync(filePath).toString('utf-8');
            data = data.toUpperCase().split(/[^a-zA-Z]/).filter(function (ch) { return ch.length != 0; });
            data.forEach(token => {
                //CHANGE THE THRESHHOLD IF NECESSARY
                if (entryCounter > 100000) {
                    Object.keys(invIndex).sort().forEach((key) => {
                        sortedInvIndex[key] = invIndex[key];
                    });
                    outputTXT = outDir + "block" + fileNameCount;
                    for (let SItoken in sortedInvIndex) {
                        resString += SItoken + "," + sortedInvIndex[SItoken].toString();
                        resString += "\n";
                    };
                    fs.writeFile(outputTXT, resString, (err) => { if (err) console.log(error); });
                    resString = "";
                    entryCounter = 0;
                    sortedInvIndex = {};
                    invIndex = {};
                    console.log(outputTXT + " - written;");
                    fileNameCount++;
                };
                if (invIndex[token] == undefined) {
                    invIndex[token] = [];
                    entryCounter++;
                };
                if (!invIndex[token].includes(fileIndex)) {
                    invIndex[token].push(fileIndex);
                    entryCounter++;
                };
            });
        });
        Object.keys(invIndex).sort().forEach((key) => {
            sortedInvIndex[key] = invIndex[key];
        });
        outputTXT = outDir + "block" + fileNameCount;
        for (let SItoken in sortedInvIndex) {
            resString += SItoken + "," + sortedInvIndex[SItoken].toString();
        };
        fs.writeFile(outputTXT, resString, (err) => { if (err) console.log(error); });
        console.log(outputTXT + " - written;");

        let t1 = new Date();

        resultStats["Total number of files indexed"] = fileStream.length;
        resultStats["Total time to build SPIMI"] = (t1-t0)/1000 + "sec";

        return resultStats;
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