"use strict";

class KeyValueStore {
  constructor(size) {
    this.size = size;
    this.hashMap = new Object();
    this.logs = new LinkedList();
    this.id = 0;
  }

  add(key, val) {
    this.hashMap[key] = val;
    this.logs.addToEnd(this.id, "add", key, val);
    this.id++;
  }

  hashMapToString() {
    console.log("Printing storage: ", JSON.stringify(this.hashMap, null, 2));
  }

  logsToString() {
    this.logs.toString();
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  addToEnd(id, type, key, val) {
    const newNode = new Node(id, type, key, val);

    if (this.head === null) this.head = newNode;

    let current = this.head;

    while (current.next) {
      current = current.next;
    }

    current.next = newNode;
    this.size++;
  }

  toString() {
    let current = this.head;

    while (current.next != undefined) {
      console.log("Node: ", current.id, current.type, current.key, current.val);
      current = current.next;
    }
  }
}

class Node {
  constructor(id, type, key, val) {
    this.id = id;
    this.type = type;
    this.key = key;
    this.val = val;
    this.next = null;
  }
}

const main = () => {
  const test = new KeyValueStore(10);
  test.add("Hello", "World");
  test.add("Magic", "Words");
  test.add("Squeamish", "Ossifrage");
  test.hashMapToString();
  // test.logsToString();
};

main();
