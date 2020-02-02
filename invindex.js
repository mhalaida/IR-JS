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
                        for (let i = 0; i < 10; i++) {
                            invIndex[word].push([i+1]);
                        }
                    }
                    invIndex[word][fileIndex].push(wordCount);
                }
            });
        });
        return invIndex;
    }
}