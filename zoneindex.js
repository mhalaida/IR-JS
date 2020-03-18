let fs = require("fs");
let path = require("path");
let readline = require("readline")

module.exports = {

    buildZoneIndex: function (inputDir) {
        let zoneIndex = {};
        let fileStream = buildFileStream(inputDir);
        fileStream.forEach(book => {
            splitBookByZones(book, zoneIndex);
        });
        let sortedZoneIndex = {};
        Object.keys(zoneIndex).sort().forEach((key) => {
            sortedZoneIndex[key] = zoneIndex[key];
        });
        return sortedZoneIndex;
    },
}

function splitBookByZones(book, zoneIndex) {
    let bookName = book.split("/");
    bookName = bookName[bookName.length - 1].split(".")[0];

    let bookData = fs.readFileSync(book).toString('utf-8');

    let currZoneName = "";
    //SEPARATOR
    bookData = bookData.split(">>>$$$$$<<<");
    bookData.forEach((zone, zoneNum) => {
        switch (zoneNum) {
            case 0:
                currZoneName = "title"
                break;
            case 1:
                currZoneName = "author"
                break;
            case 2:
            case 3:
            case 4:
                currZoneName = "body" + (zoneNum - 1);
                break;
        };
        zoneToIndex(zone, zoneIndex, currZoneName, bookName);
    })
}

function zoneToIndex(zone, zoneIndex, zoneName, bookName) {
    let data = zone.toUpperCase().split(/[^a-zA-Z]/).filter(function (ch) { return ch.length != 0; });
    data.forEach(token => {
        if (zoneIndex[token + "." + zoneName] == undefined) {
            zoneIndex[token + "." + zoneName] = [];
        }
        if (!zoneIndex[token + "." + zoneName].includes(bookName)) {
            zoneIndex[token + "." + zoneName].push(bookName);
            zoneIndex[token + "." + zoneName].push(1);
        } else {
            zoneIndex[token + "." + zoneName][zoneIndex[token + "." + zoneName].indexOf(bookName)+1]++;
        }
    })
}

function buildFileStream(inputDir) {
    let fileStream = [];
    coreFileStream(inputDir, fileStream);
    return fileStream;
}

function coreFileStream(dirPath, fileStream) {
    fileStream = fileStream || 0;
    fs.readdirSync(dirPath).forEach(function (file) {
        let filepath = path.join(dirPath, file);
        let stat = fs.statSync(filepath);
        if (stat.isDirectory()) {
            fileStream = coreFileStream(filepath, fileStream);
        } else {
            fileStream.push(filepath);
        }
    });
    return fileStream;
}