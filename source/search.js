const fs = require("fs");
const _ = require('underscore')

module.exports = {
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