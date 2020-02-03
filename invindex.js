let fs = require("fs");
let L = require("list");

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
                        invIndex[word] = L.list();
                    }
                    // if (L.nth(fileIndex, invIndex[word]) == undefined || L.nth(fileIndex, invIndex[word]).length == 0) {
                    //     invIndex[word] = L.append(L.list(fileIndex+1), invIndex[word]);
                    // }
                    let corrFileInd = 0;
                    for (let i = 0; i < invIndex[word].length; i++) {
                        if (L.nth(0, L.nth(i, invIndex[word])) == fileIndex) {
                            corrFileInd = i;
                        }
                    }
                    let appendedlist = L.append(wordCount, L.nth(corrFileInd, invIndex[word]));
                    invIndex[word] = L.update(fileIndex, appendedlist, invIndex[word]);
                }
            });
        });

        return invIndex;
    }
}










// module.exports = {
//     //POSITION INVERTED INDEX
//     buildInvIndex: function (collArr, collDir) {
//         let invIndex = {};
//         collArr.forEach(function (fileName, fileIndex) {
//             let filepath = collDir + fileName;
//             let data = fs.readFileSync(filepath).toString('utf-8');
//             data = data.toUpperCase().split(/[^a-zA-Z]/);
//             let wordCount = 0;
//             data.forEach(word => {
//                 if (isNaN(word)) {
//                     wordCount++;
//                     if (invIndex[word] == undefined) {
//                         invIndex[word] = [];
//                         for (let i = 0; i < 10; i++) {
//                             invIndex[word].push([i+1]);
//                         }
//                     }
//                     invIndex[word][fileIndex].push(wordCount);
//                 }
//             });
//         });
//         return invIndex;
//     }
// }