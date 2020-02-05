const fs = require("fs");
const readlineSync = require('readline-sync');
const _ = require('underscore')

module.exports = {
    searchBiwIndPhra: function (biwIndex, phrase) {
        phrase = phrase.toUpperCase().split(/[^a-zA-Z]/).filter(function (ch) { return ch.length != 0; });
        splitPhrase = [];
        for (let i = 0; i < phrase.length - 1; i++) {
            splitPhrase.push(phrase.slice(i, i + 2).join(" "));
            splitPhrase[i] = biwIndex[splitPhrase[i]];
        };
        while (splitPhrase.length > 1) {
            splitPhrase[0] = _.intersection(splitPhrase[0], splitPhrase[1]);
            splitPhrase.splice(1, 1);
        }
        return splitPhrase[0];
    },

    searchPosIndDist: function () { },
    searchPosIndPhra: function () { },
    searchBiwIndDist: function () { }
}