class PrefNode {
    constructor(ch) {
        this.ch = ch;
        this.parent = null;
        this.children = {};
        this.end = false;
    };

    getWord() {
        let output = [];
        let node = this;
        while (node !== null) {
            output.unshift(node.ch);
            node = node.parent;
        }
        return output.join('');
    };
}

class PrefTree {
    constructor() {
        this.root = new PrefNode(null);
    }

    insert(word) {
        let node = this.root;
        for (let i = 0; i < word.length; i++) {
            if (!node.children[word[i]]) {
                node.children[word[i]] = new PrefNode(word[i]);
                node.children[word[i]].parent = node;
            }
            node = node.children[word[i]];
            if (i == word.length - 1) {
                node.end = true;
            }
        }
    }

    contains(word) {
        let node = this.root;
        for (let i = 0; i < word.length; i++) {
            if (node.children[word[i]]) {
                node = node.children[word[i]];
            } else {
                return false;
            }
        }
        return node.end;
    }

    find(prefix) {
        let node = this.root;
        let output = [];
        for (let i = 0; i < prefix.length; i++) {
            if (node.children[prefix[i]]) {
                node = node.children[prefix[i]];
            } else {
                return output;
            }
        }
        PrefTree.findAllWords(node, output);
        return output;
    }

    static findAllWords(node, arr) {
        if (node.end) {
            arr.unshift(node.getWord());
        }
        for (let child in node.children) {
            PrefTree.findAllWords(node.children[child], arr);
        }
    }
}

module.exports = {
    PrefTree: PrefTree
}