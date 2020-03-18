let fs = require("fs");
let rls = require('readline-sync');

module.exports = {

    searchZoneIndex: function (zoneIndex) {
        let searchInput = rls.question("Your search input: ");
        let tokenWeight = 0;
        let resultObj = {}
        for (let tokenZone in zoneIndex) {
            if (tokenZone.split(".")[0] == searchInput.toUpperCase()) {
                switch (tokenZone.split(".")[1]) {
                    case "title":
                        tokenWeight = 0.125;
                        break;
                    case "author":
                        tokenWeight = 0.125;
                        break;
                    case "body1":
                    case "body2":
                    case "body3":
                        tokenWeight = 0.25;
                        break;
                };
                zoneIndex[tokenZone].forEach(bookName => {
                    //filter out the frequency
                    if (isNaN(bookName)) {
                        if (resultObj[bookName] == undefined) {
                            resultObj[bookName] = 0;
                        }
                        resultObj[bookName] += tokenWeight;
                    }
                });
            }
        };
        return resultObj;
    }

}