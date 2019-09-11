"use strict";

class SinglyLinkedNode {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  add(val) {
    let current = this.head;

    while (current.next) {
      current = current.next;
    }

    current.next = new Node(val);

    this.size++;
  }

  insertAt(val, index) {

    if (index < 0 || index > this.size) return null;

    const newNode = new SinglyLinkedNode(val);

    let current = this.head;
    for (let i = 0; i < index; i++) {
      current = current.next;
    }

    current.next = newNode;
    newNode.next = current.next.next;
  }

  remove(val) {
    let current = this.head;

    while (current.next) {
      current = current.next;
    }

    current.next = new Node(val);

    this.size++;
  }

  removeFrom(index) {
    //
  }

  isEmpty();
  size();
  toString();
}
