let fs = require("fs");
let path = require("path");
let readline = require("readline")

module.exports = {

    compressIndex: function (masterInput, compIndex, compDict) {
        fs.writeFile(compDict, "", () => { });
        fs.writeFile(compIndex, "", () => { });

        readMasterByLine(masterInput, compIndex, compDict);
    },

    mergeBlocks: function (dirPath) {
        let resStats = {};
        let masterIndex = {};

        let t0 = new Date();
        fs.readdirSync(dirPath).forEach((block, blockIndex) => {
            //SKIP DS_STORE (TECHNICAL MACOS FILE)
            if (block == ".DS_Store") {
                return;
            };
            let data = fs.readFileSync(dirPath + block).toString('utf-8');
            data = data.split("\n").filter(function (ch) { return ch.length != 0; });;

            data.forEach(subArray => {
                let postingArr = subArray.split(',');
                let token = postingArr.shift();
                if (masterIndex[token] == undefined) {
                    masterIndex[token] = postingArr;
                };
                postingArr.forEach(posting => {
                    if (!masterIndex[token].includes(posting)) {
                        masterIndex[token].push(posting);
                    }
                })
            });
            console.log(block + " - read;")
        });
        let sortedMaster = {};
        Object.keys(masterIndex).sort().forEach(key => {
            sortedMaster[key] = masterIndex[key];
        });
        let resStr = "";
        for (let sToken in sortedMaster) {
            resStr += sToken + "," + sortedMaster[sToken] + "\n";
        };
        fs.writeFile(dirPath + "master", "", (err) => { if (err) console.log(err); });
        fs.writeFile(dirPath + "master", resStr, (err) => { if (err) console.log(err); });
        console.log("master - written;")

        let t1 = new Date();

        resStats["Total time to merge blocks"] = (t1 - t0) / 1000 + " sec";

        return resStats;
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
                if (entryCounter > 5000000) {
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
            resString += SItoken + "," + sortedInvIndex[SItoken].toString() + "\n";
        };
        fs.writeFile(outputTXT, resString, (err) => { if (err) console.log(error); });
        console.log(outputTXT + " - written;");

        let t1 = new Date();

        resultStats["Total number of files indexed"] = fileStream.length;
        resultStats["Total time to build SPIMI"] = (t1 - t0) / 1000 + " sec";

        return resultStats;
    }
}

function readMasterByLine(masterInput, compIndex, compDict) {
    let readInterface = readline.createInterface({
        input: fs.createReadStream(masterInput),
        console: false
    });

    let charCount = 0;

    readInterface.on('line', (line) => {
        charCount = coreCompressor(line, compIndex, compDict, charCount)
    })
}

function coreCompressor(line, compIndex, compDict, charCount) {
    line = line.split(",");

    let term = line.shift();
    line = compressLine(line);

    charCount += term.length;

    fs.writeFileSync(compDict, term, { flag: 'a' });
    fs.writeFileSync(compIndex, charCount + ":" + line.length + ":" + line.toString() + "\n", { flag: 'a' });

    return charCount;
}

function compressLine(line) {

    let oldPrevVal = line[0];
    let temp;

    for (let i = 0; i < line.length; i++) {
        if (i != 0) {
            temp = line[i];
            line[i] = line[i] - oldPrevVal;
            oldPrevVal = temp;
        };
    };

    return line;
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