let fs = require("fs");
let path = require("path");

module.exports = {

    buildIndex: function(inputDir) {
        let invIndex = {};
        let fileStream = [];
        let resFileStream = buildFileStream(inputDir, fileStream);

        console.log(resFileStream);
        console.log(resFileStream.length);
        
        resFileStream.forEach((file, fileIndex) => {
            let data = fs.readFileSync(file).toString('utf-8');
            data = data.toUpperCase().split(/[^a-zA-Z]/).filter(function (ch) { return ch.length != 0; });
            data.forEach(term => {
                if (invIndex[term] == undefined) {
                    invIndex[term] = {};
                } 
                if (invIndex[term][fileIndex] == undefined) {
                    invIndex[term][fileIndex] = 1;
                } else {
                    invIndex[term][fileIndex]++;
                }
            })
        });

        let ordInvIndex = {};
        Object.keys(invIndex).sort().forEach(key => {
            ordInvIndex[key] = invIndex[key];
        });

        let jsonData = JSON.stringify(ordInvIndex, null, 2);
        fs.writeFileSync('invindex.json', jsonData);

        vectorizeIndex(ordInvIndex, fileStream.length);

        return ordInvIndex;
    }

}

function clusterizeVectIndex(vectIndex, N) {
    let leaders = {};
    while (Object.keys(leaders).length != Math.round(Math.sqrt(N))) {
        let randomIndex = Math.floor(Math.random() * (N - 0) + 0);
        if (leaders[randomIndex] == undefined) {
            leaders[randomIndex] = [];
        }
    };
    for (let vecDocID in vectIndex) {
        if (!leaders.hasOwnProperty(vecDocID)) {
            let currLeader = 0;
            let currSimilarity = 0;
            for (let leader in leaders) {
                let auxSimilarity = cosSimil(vectIndex[leader], vectIndex[vecDocID]);
                if (auxSimilarity > currSimilarity) {
                    currSimilarity = auxSimilarity;
                    currLeader = leader;
                }
            };
            leaders[currLeader].push(vecDocID);
        }
    }

    let jsonData = JSON.stringify(leaders, null, 2);
    fs.writeFileSync('leaders.json', jsonData);

    return leaders;
}

//N is the total number of docs indexed
function vectorizeIndex(invIndex, N) {
    let vectorIndex = {};
    for (let term in invIndex) {
        for (let docID in invIndex[term]) {
            if (vectorIndex[docID] == undefined) {
                vectorIndex[docID] = {};
            }
            if (vectorIndex[docID][term] == undefined) {
                vectorIndex[docID][term] = (invIndex[term][docID] * (Math.log(N / Object.keys(invIndex[term]).length)));
            }
        }
    };

    let ordVectIndex = {};
    Object.keys(vectorIndex).sort().forEach(key => {
        ordVectIndex[key] = vectorIndex[key];
    });

    let jsonData = JSON.stringify(ordVectIndex, null, 2);
    fs.writeFileSync('vectindex.json', jsonData);

    clusterizeVectIndex(ordVectIndex, N);

    return ordVectIndex;
}

function buildFileStream(dirPath, fileStream) {
    fileStream = fileStream || 0;
    fs.readdirSync(dirPath).forEach(function (file) {
        if (file == ".DS_Store") {
            return;
        };
        let filepath = path.join(dirPath, file);
        let stat = fs.statSync(filepath);
        if (stat.isDirectory()) {
            fileStream = buildFileStream(filepath, fileStream);
        } else {
            fileStream.push(filepath);
        }
    });
    return fileStream;
}

function cosSimil(A, B) {
    let dotprod = 0;
    let mA = 0, mB = 0;
    for (let token in A) {
        if(B.hasOwnProperty(token)) {
            dotprod += (A[token] * B[token]);
            mA += (A[token] * A[token]);
            mB += (B[token] * B[token]);
        }
    }
    mA = Math.sqrt(mA);
    mB = Math.sqrt(mB);
    return (dotprod) / ((mA) * (mB));
}