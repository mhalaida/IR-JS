let fs = require("fs");
let pt = require("./preftree");

module.exports = {
    //K-GRAM INDEX FROM INVERTED INDEX
    buildKgramIndex: function (invIndex, k) {
        let kgramIndex = {};
        let auxToken;
        let subToken;
        for (const token in invIndex) {
            auxToken = token;
            auxToken = "$" + auxToken + "$";
            for (let i = 0; i < token.length; i++) {
                subToken = auxToken.substring(i, i + k);
                if (kgramIndex[subToken] == undefined) {
                    kgramIndex[subToken] = [];
                }
                kgramIndex[subToken].push(token);
            };
        };
        let orderedKgramIndex = {};
        Object.keys(kgramIndex).sort().forEach(function (key) {
            orderedKgramIndex[key] = kgramIndex[key];
        });
        return orderedKgramIndex;
    },

    //PERMUTERM INDEX FROM INVERTED INDEX
    buildPermIndex: function (invIndex) {
        let permIndex = {};
        let auxIndex = {};
        let auxToken;
        for (const token in invIndex) {
            auxIndex[token] = [];
            auxToken = token;
            auxToken = auxToken.concat("$");
            for (let i = 0; i < auxToken.length; i++) {
                auxIndex[token].push(auxToken);
                auxToken = auxToken.concat(auxToken[0]);
                auxToken = auxToken.substr(1);
            };
        };
        for (const token in auxIndex) {
            auxIndex[token].forEach(rotation => {
                if (permIndex[rotation] == undefined) {
                    permIndex[rotation] = [];
                }
                permIndex[rotation].push(token);
            });
        };
        return permIndex;
    },

    //PREFIX TREE FROM PERMUTERM INDEX 
    buildPrefTree: function (index) {
        let prefTree = new pt.PrefTree();
        for (let key in index) {
            prefTree.insert(key);
        };
        return prefTree;
    },

    //POSITION INDEX
    buildPosIndex: function (collArr, collDir) {
        let invIndex = {};
        collArr.forEach(fileName => {
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