let fs = require("fs");

let zi = require("./zoneindex");
let search = require("./search");

let zoneIndex = zi.buildZoneIndex("./inputcollection");

fs.writeFile("TEST_OUTPUT.txt", '', function () { });
let writerInd = fs.createWriteStream("TEST_OUTPUT.txt", { flags: 'a' });
for (const word in zoneIndex) {
    writerInd.write(word + " => " + [...zoneIndex[word]] + "\n");
}

console.log(search.searchZoneIndex(zoneIndex));
