class Node {
  constructor() {
    this.children = {};
    this.isTerminal = false;
  }
}

class Trie {
  constructor() {
    this.root = new Node();
  }

  insertRecur(word, root=this.root) {
    if ( word.length === 0 ) {
      root.isTerminal = true;
      return;
    }

    let letter = word[0];

    if (!root.children[letter]) {
      let nextNode = new Node();
      root.children[letter] = nextNode;
      this.insertRecur(word.slice(1), root.children[letter]);
    } else {
      this.insertRecur(word.slice(1), root.children[letter]);
    }
  }

  insertIter(word) {
    if (word.length === 0) {
      return;
    }
    let root = this.root;

    while ( word.length ) {
      let letter = word[0];
      if (!root.children[letter]) {
        let nextNode = new Node();
        root.children[letter] = nextNode;
      }
      root = root.children[letter];
      if (word.length === 1) root.isTerminal = true;
      word = word.slice(1);
    }
  }

  searchRecur(word, root=this.root) {
    if ( !word.length ) {
      return root.isTerminal;
    }
    let letter = word[0];
    if(root.children[letter]) {
      return this.searchRecur(word.slice(1), root.children[letter]);
    } else {
      return false;
    }
  }

  searchIter(word) {
    let root = this.root;
    if (!word.length) {
      return root.isTerminal;
    }

    while (word.length) {
      let letter = word[0];
      if (!root.children[letter]) {
        return false;
      }
      root = root.children[letter];
      word = word.slice(1);
    }
    return root.isTerminal;
  }

  wordsWithPrefix(prefix, root = this.root) {
    let arr = [];
    if(prefix.length === 0) {
      if (root.isTerminal) {
        arr.push('');
      }
      for(let letter in root.children) {
        let prev = this.wordsWithPrefix(prefix, root.children[letter]);
        prev = prev.map(el => letter + el);
        arr = arr.concat(prev);
      }
    } else if (prefix.length > 0) {
      let pre = prefix[0];
      for (let letter in root.children) {
        if (letter === pre) {
          let prev = this.wordsWithPrefix(prefix.slice(1), root.children[letter]);
          prev = prev.map(el => letter + el);
          arr = arr.concat(prev);
        }
      }
    }
    return arr;
  }
}

module.exports = {
    Node,
    Trie
};