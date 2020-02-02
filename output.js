let fs = require("fs");

module.exports = {
    //OUTPUT FOR INVERTED INDEX
    writeInvIndex: function (outputIndex, invIndex) {
        fs.writeFile(outputIndex, '', function () { });
        let writerInd = fs.createWriteStream(outputIndex, { flags: 'a' });
        for (const word in invIndex) {
            writerInd.write(word);
            for (let i = 0; i < (20 - word.length); i++) {
                writerInd.write(' ');
            }
            writerInd.write(" => " + invIndex[word] + "\n");
        }
    },
    //INVERTED INDEX TO JSON
    writeInvIndexJSON: function (outputJSON, invIndex) {
        fs.writeFile(outputJSON, '', function () { });
        fs.writeFile(outputJSON, JSON.stringify(invIndex), (err) => { if (err) throw error; });
    },
    //OUTPUT FOR INCIDENCE MATRIX
    writeIncMatrix: function (outputMatrix, invIndex, collectionArr) {
        fs.writeFile(outputMatrix, '', function () { });
        let writerMat = fs.createWriteStream(outputMatrix, { flags: 'a' });
        writerMat.write("document ID:");
        for (let i = 0; i < (19 - "document ID".length); i++) {
            writerMat.write(' ');
        }
        for (let i = 0; i < collectionArr.length; i++) {
            writerMat.write((i + 1) + "  ");
            if (i == collectionArr.length - 1) {
                writerMat.write("\n\n");
            }
        }
        for (const word in invIndex) {
            writerMat.write(word);
            for (let i = 0; i < (20 - word.length); i++) {
                writerMat.write(' ');
            }
            for (let i = 0; i < collectionArr.length; i++) {
                if (invIndex[word].includes(i + 1)) {
                    writerMat.write("1  ");
                } else {
                    writerMat.write("0  ");
                }
            }
            writerMat.write("\n");
        }
    }
}
