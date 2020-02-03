let fs = require("fs");

module.exports = {
    //OUTPUT FOR POSITION INDEX
    writePosIndex: function (outputIndex, invIndex) {
        fs.writeFile(outputIndex, '', function () { });
        let writerInd = fs.createWriteStream(outputIndex, { flags: 'a' });
        for (const word in invIndex) {
            writerInd.write(word);
            for (let i = 0; i < (20 - word.length); i++) { writerInd.write(' ') };
            writerInd.write("\n");
            for (const docID in invIndex[word]) {
                for (let i = 0; i < 20; i++) { writerInd.write(' ') };
                writerInd.write(docID + " => " + invIndex[word][docID] + "\n");
            }
        }
    },

    //OUTPUT FOR BIWORD INDEX
    writeBiwIndex: function (outputIndex, invIndex) {
        fs.writeFile(outputIndex, '', function () { });
        let writerInd = fs.createWriteStream(outputIndex, { flags: 'a' });
        for (const token in invIndex) {
            writerInd.write(token);
            for (let i = 0; i < (30 - token.length); i++) {
                writerInd.write(' ');
            }
            writerInd.write(" => " + invIndex[token] + "\n");
        }
    },

    //INVERTED INDEX TO JSON
    writeInvIndexJSON: function (outputJSON, invIndex) {
        fs.writeFile(outputJSON, '', function () { });
        fs.writeFile(outputJSON, JSON.stringify(invIndex), (err) => { if (err) throw error; });
    }
}
