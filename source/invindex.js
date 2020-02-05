let fs = require("fs");

module.exports = {
    //POSITION INDEX
    buildPosIndex: function (collArr, collDir) {
        let invIndex = {};
        collArr.forEach(function (fileName, fileIndex) {
            let filepath = collDir + fileName;
            let data = fs.readFileSync(filepath).toString('utf-8');
            data = data.toUpperCase().split(/[^a-zA-Z]/).filter(function (ch) { return ch.length != 0; });
            let wordCount = 0;
            data.forEach(word => {
                wordCount++;
                if (invIndex[word] == undefined) {
                    invIndex[word] = { frequency: 0 };
                }
                if (invIndex[word][fileName] == undefined) {
                    invIndex[word][fileName] = [wordCount];
                    invIndex[word]["frequency"]++;
                } else {
                    invIndex[word][fileName].push(wordCount);
                    invIndex[word]["frequency"]++;
                }
            });
        });
        //SORTING
        let orderedInvIndex = {};
        Object.keys(invIndex).sort().forEach(function (key) {
            orderedInvIndex[key] = invIndex[key];
        });
        return orderedInvIndex;
    },

    //BIWORD INDEX
    buildBiwIndex: function (collArr, collDir) {
        let invIndex = {};
        collArr.forEach(function (fileName, fileIndex) {
            let filepath = collDir + fileName;
            let data = fs.readFileSync(filepath).toString('utf-8');
            data = data.toUpperCase().split(/[^a-zA-Z]/).filter(function (ch) { return ch.length != 0; });
            for (let i = 0; i < data.length; i++) {
                let currToken = data[i] + " " + data[i + 1];
                if (invIndex[currToken] == undefined) {
                    invIndex[currToken] = [];
                }
                if (!invIndex[currToken].includes(fileName)) {
                    invIndex[currToken].push(fileName);
                }
            }
        });
        //SORTING
        let orderedInvIndex = {};
        Object.keys(invIndex).sort().forEach(function (key) {
            orderedInvIndex[key] = invIndex[key];
        });
        return orderedInvIndex;
    }
}