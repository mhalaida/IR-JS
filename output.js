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
    }
}
