let fs = require("fs");

module.exports = {
    //OUTPUT FOR POSITION INDEX
    writePosIndex: function (outputIndex, invIndex) {
        fs.writeFile(outputIndex, '', function () { });
        let writerInd = fs.createWriteStream(outputIndex, { flags: 'a' });
        for (const word in invIndex) {
            writerInd.write(word);
            writerInd.write("\n");
            for (const docName in invIndex[word]) {
                for (let i = 0; i < 20; i++) { writerInd.write(' ') };
                writerInd.write(docName + " => " + invIndex[word][docName] + "\n");
            }
        }
    },

    //OUTPUT FOR BIWORD INDEX
    writeBiwIndex: function (outputIndex, invIndex) {
        fs.writeFile(outputIndex, '', function () { });
        let writerInd = fs.createWriteStream(outputIndex, { flags: 'a' });
        for (const token in invIndex) {
            writerInd.write(token);
            writerInd.write("\n");
            for (let j = 0; j < invIndex[token].length; j++) {
                for (let i = 0; i < 20; i++) { writerInd.write(' ') };
                writerInd.write(String(invIndex[token][j]) + "\n");
            }
        }
    },

    //POSITION INDEX TO JSON
    writePosIndexJSON: function (outputJSON, posIndex) {
        fs.writeFile(outputJSON, '', function () { });
        fs.writeFile(outputJSON, JSON.stringify(posIndex), (err) => { if (err) throw error; });
    },

    //BIWORD INDEX TO JSON
    writeBiwIndexJSON: function (outputJSON, biwIndex) {
        fs.writeFile(outputJSON, '', function () { });
        fs.writeFile(outputJSON, JSON.stringify(biwIndex), (err) => { if (err) throw error; });
    }
}
