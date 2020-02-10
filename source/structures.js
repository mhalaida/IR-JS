let fs = require("fs");
let pt = require("./preftree");

module.exports = {
    //K-GRAM INDEX
    buildKgramIndex: function (dict, k) {
        let kgramIndex = {};
        dict.forEach(token => {
            kgramIndex[token] = [];
            auxToken = token;
            auxToken = "$" + auxToken + "$";
            for (let i = 0; i < token.length; i++) {
                subToken = auxToken.substring(i, i + k);
                kgramIndex[token].push(subToken);
            }
        });
        return kgramIndex;
    },

    //PERMUTERM INDEX
    buildPermIndex: function (dict) {
        let permIndex = {};
        dict.forEach(token => {
            permIndex[token] = [];
            auxToken = token;
            auxToken = auxToken.concat("$");
            for (let i = 0; i < token.length; i++) {
                permIndex[token].push(auxToken);
                auxToken = auxToken.concat(auxToken[0]);
                auxToken = auxToken.substr(1);
            }
        });
        return permIndex;
    },

    //PREFIX TREE FROM PERMUTERM INDEX 
    buildPrefTreeFromPermInd: function (index) {
        let prefTree = new pt.PrefTree();
        for (let key in index) {
            index[key].forEach(rotation => {
                prefTree.insert(rotation);
            })
        };
        return prefTree;
    },

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
    },

    //DICTIONARY OF UNIQUE WORDS
    buildDict: function (collArr, collDir) {
        let dictionary = [];
        collArr.forEach(function (fileName) {
            let filepath = collDir + fileName;
            let data = fs.readFileSync(filepath).toString('utf-8');
            data = data.toUpperCase().split(/[^a-zA-Z]/).filter(function (ch) { return ch.length != 0; });
            data.forEach(token => {
                if (!dictionary.includes(token)) {
                    dictionary.push(token);
                }
            })
        });
        dictionary.sort();
        return dictionary;
    }
}