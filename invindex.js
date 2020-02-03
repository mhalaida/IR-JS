let fs = require("fs");

module.exports = {
    //POSITION INVERTED INDEX
    buildInvIndex: function (collArr, collDir) {
        let invIndex = {};
        collArr.forEach(function (fileName, fileIndex) {
            let filepath = collDir + fileName;
            let data = fs.readFileSync(filepath).toString('utf-8');
            data = data.toUpperCase().split(/[^a-zA-Z]/);
            let wordCount = 0;
            data.forEach(word => {
                if (isNaN(word)) {
                    wordCount++;
                    if (invIndex[word] == undefined) {
                        invIndex[word] = [];
                    }
                    let corrInd = invIndex[word].findIndex(function (subArr) {
                        return subArr.indexOf(fileIndex + 1) == 0;
                    });
                    if (corrInd == -1) {
                        invIndex[word].push([fileIndex + 1, wordCount]);
                    } else {
                        invIndex[word][corrInd].push(wordCount);
                    }
                    // console.log(corrInd);
                    // if (invIndex[word][invIndex[word].length] == undefined) {
                    //     invIndex[word].push([fileIndex + 1]);
                    // }
                    // invIndex[word][invIndex[word].length - 1].push(wordCount);
                }
            });
        });
        //SORTING
        let orderedInvIndex = {};
        Object.keys(invIndex).sort().forEach(function (key) {
            orderedInvIndex[key] = invIndex[key];
        });
        return orderedInvIndex;
    }
}