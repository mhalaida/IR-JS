const fs = require("fs");
const _ = require('underscore');
let pt = require("./preftree");

module.exports = {

    //WILDCARD QUERY FOR K-GRAM INDEX
    searchWildThrgramInd: function (kgramIndex, invIndex, input) {
        input = input.toUpperCase().split(/[^a-zA-Z*]/).filter(function (ch) { return ch.length != 0; });
        input = "$" + input + "$";
        input = input.split('*');
        //CHECKING IF ANY GRAM IS LONGER THAN K
        input.forEach(token => {
            if (token.length > 3) {
                for (let ch = token.length - 2; ch != 0; ch--) {
                    input.unshift(token.substring(ch - 1, ch + 2));
                };
                input.splice(token.length - 2, 1)
            };
        });

        let inputPostings = [];
        for (let i = 0; i < input.length; i++) {
            inputPostings[i] = kgramIndex[input[i]];
        }
        let foundWords = _.intersection(...inputPostings);
        let resultIndex = {};
        foundWords.forEach(word => {
            resultIndex[word] = invIndex[word];
        });
        return resultIndex;
    },

    //WILDCARD QUERY FOR PERMUTERM INDEX
    searchWildPermInd: function (prefTree, permIndex, invIndex, input) {
        input = input.toUpperCase().split(/[^a-zA-Z*]/).filter(function (ch) { return ch.length != 0; });
        //TRANSFORM THE QUERY TO THE NECESSARY FORM
        input = input + "$";
        while (input.charAt(input.length - 1) != '*') {
            input = input.concat(input[0]);
            input = input.substring(1);
        };
        //IF MULTIPLE WILDCARDS (if (number of '*' > 1)) ONLY EDGES MATTER
        if (input.replace(/[^*]/g, "").length > 1) {
            var multWildcard = true;
            var leftOutPart = input.slice(0, input.indexOf('*'));
            input = input.slice(input.indexOf('*') + 1, input.length);
        }
        //TRIM LAST WILDCARD
        input = input.substring(0, input.length - 1);
        let foundRotations = prefTree.find(input);
        let foundWords = [];
        foundRotations.forEach(rotation => {
            if (multWildcard) {
                if (rotation.includes(leftOutPart)) {
                    foundWords.push(permIndex[rotation]);
                };
            } else {
                foundWords.push(permIndex[rotation]);
            }
        });
        let resultIndex = {};
        foundWords.forEach(word => {
            resultIndex[word] = invIndex[word];
        });
        return resultIndex;
    },

    //PHRASE SEARCH IN BIWORD INDEX
    searchBiwIndPhra: function (biwIndex, input) {
        input = input.toUpperCase().split(/[^a-zA-Z]/).filter(function (ch) { return ch.length != 0; });
        splitInput = [];
        for (let i = 0; i < input.length - 1; i++) {
            splitInput.push(input.slice(i, i + 2).join(" "));
            splitInput[i] = biwIndex[splitInput[i]];
        };
        while (splitInput.length > 1) {
            splitInput[0] = _.intersection(splitInput[0], splitInput[1]);
            splitInput.splice(1, 1);
        }
        return splitInput[0];
    },

    //PROXIMITY SEARCH IN POSITION INDEX
    // searchPosIndDist: function (posIndex, input) {
    //     input = input.toUpperCase().split(/[^a-zA-Z/0-9]/).filter(function (ch) { return ch.length != 0; });
    //     let inputNoOperators = []
    //     for (let i = 0; i < input.length; i++) {
    //         if (posIndex.hasOwnProperty(input[i])) {
    //             inputNoOperators.push(posIndex[input[i]])
    //         }
    //     }
    //     let docsIntersect = [];
    //     for (let i = 0; i < inputNoOperators.length - 1; i++) {
    //         docsIntersect.push(_.intersection(Object.keys(inputNoOperators[i]), Object.keys(inputNoOperators[i + 1])));
    //     }
    //     docsIntersect = _.intersection(...docsIntersect);
    //     docsIntersect.shift();

    //     for (let i = 0; i < input.length; i++) {
    //         if (posIndex.hasOwnProperty(input[i])) {
    //             input[i] = 
    //         }
    //     }
    //     input.forEach(tokenObj => {
    //         if (typeof)
    //         for (prop in tokenObj) {
    //             if (!docsIntersect.includes(prop)) {
    //                 delete tokenObj[prop];
    //             }
    //         }
    //     });

    //     console.log(inputNoOperators);

    //     return input;
    // },

    //PHRASE SEARCH IN POSITION INDEX
    searchPosIndPhra: function (posIndex, input) {
        input = input.toUpperCase().split(/[^a-zA-Z]/).filter(function (ch) { return ch.length != 0; });
        let tokenData = [...input];
        let docsIntersect = [];
        for (let i = 0; i < tokenData.length; i++) {
            tokenData[i] = posIndex[tokenData[i]];
        };
        for (let i = 0; i < tokenData.length - 1; i++) {
            docsIntersect.push(_.intersection(Object.keys(tokenData[i]), Object.keys(tokenData[i + 1])));
        }
        docsIntersect = _.intersection(...docsIntersect);
        docsIntersect.shift();
        tokenData.forEach(tokenObj => {
            for (prop in tokenObj) {
                if (!docsIntersect.includes(prop)) {
                    delete tokenObj[prop];
                }
            }
        });
        let finalDocList = [];
        let filteredIndexes = [];
        let phrasefound;
        //ITERATING OVER DOCUMENTS
        for (let docName of docsIntersect) {
            phrasefound = true;
            //ITERATING OVER WORDS  
            for (let word = 0; word < tokenData.length; word++) {
                let auxIndexes = [];
                if (word == 0) {
                    auxIndexes = tokenData[word][docName];
                } else {
                    for (let fi of filteredIndexes) {
                        if (tokenData[word][docName].includes(fi + 1)) {
                            auxIndexes.push(fi + 1);
                        }
                    };
                    if (auxIndexes.length == 0) {
                        phrasefound = false;
                        break;
                    }
                }
                filteredIndexes = auxIndexes;
            }
            if (phrasefound) {
                finalDocList.push(docName);
            }
        };
        return finalDocList;
    }
}