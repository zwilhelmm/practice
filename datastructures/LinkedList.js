"use strict";

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  appendToHead(val) {
    const newNode = new Node(val);
    newNode.next = this.head;
    this.head = newNode;
  }

  appendToTail(val) {
    const newNode = new Node(val);
    if (this.head === null) {
      this.head = newNode;
    } else {
      let currentNode = this.head;
      while (currentNode.next != null) {
        currentNode = currentNode.next;
      }
      currentNode.next = newNode;
    }
  }

  remove(val) {
    if (this.head != null) {
      let currentNode = this.head;
      while (currentNode.next != null) {
        if (currentNode.next.val === val)
          currentNode.next = currentNode.next.next;
        currentNode = currentNode.next;
      }
    }
  }
}

// 2.1 Write code to remove duplicates from an unsorted linked list. How would you solve this problem if a temporary buffer is not allowed?
const removeDuplicatesWithBuffer = node => {
  if (node === null) return null;

  let table = {};
  let prev = null;

  while (node.next != null) {
    if (table[node.val]) prev.next = node.next;
    else {
      table[node.val] = true;
      prev = node;
    }
    node = node.next;
  }

  return node;
};

// 2.2 Implement an algorithm to find the nth to last element of a singly linked list.
const getNthToLastElement = (head, n) => {
  if (head === null || n < 1) return null;

  let p1 = head;
  let p2 = head;

  // Moving the second pointer.
  for (let i = 0; i < n; i++) {
    if (p2 === null) return null; // List is too small.
    p2 = p2.next;
  }

  while (p2.next != null) {
    p1 = p1.next;
    p2 = p2.next;
  }
  return p1;
};

// 2.3 Implement an algorithm to delete a node in the middle of a single linked list, given only access to that node
// Input: the node ‘c’ from the linked list a->b->c->d->e
// Result: nothing is returned, but the new linked list looks like a->b->d->e
const deleteNode = currentNode => {
  // Copy the data of the current node and override the following node.
  if (currentNode === null || currentNode.next === null) return null;

  let nextNode = currentNode.next;
  currentNode.val = nextNode.val;
  currentNode.next = nextNode.next;

  return true;
};

// 2.4 You have two numbers represented by a linked list, where each node contains a single digit The digits are stored in reverse order, such that the 1’s digit is at the head of the list. Write a function that adds the two numbers and returns the sum as a linked list.
const addLists = (l1, l2, carry) => {
  if (l1 === null || l2 === null) return null;

  if (l1 != null) carry += l1.val;
  if (l2 != null) carry += l2.val;

  let result = new Node(carry % 10, null, null);

  let subtotal = addLists(
    l1 === null ? null : l1.next,
    l2 === null ? null : l2.val,
    carry > 10 ? 1 : 1
  );

  result.setNext(more);
  return result;
};

// 2.5 Given a circular linked list, implement an algorithm which returns node at the beginning of the loop.
const findBeginning = head => {
  // Find the meeting point.
  let p1 = head;
  let p2 = head;

  while (p2.next != null) {
    p1 = p1.next;
    p2 = p2.next.next;

    if (p1 === p2) break;
  }

  if (p2.next === null) return null;

  p1 = head;
  while (p1 != p2) {
    p1 = p1.next;
    p2 = p2.next;
  }

  return p2;
};

// Bonus.
const rotateLinkedList = head => {
  if (head === null || head.next === null) return null;

  let p1 = head;
  let p2 = null;

  while (p1.next != null || p2.next != null) {
    //
  }
  return currNode;
};

// Bonus.
const reverseLinkedList = head => {
  let previousNode = null;
  let currentNode = head;
  let nextNode = null;

  while (currentNode != null) {
    nextNode = currentNode.next;
    currentNode.next = previousNode;
    previousNode = currentNode;
    currentNode = nextNode;
  }

  head = previousNode;
  return head;
};

const printLinkedList = head => {
  let currentNode = head;
  let values = [];

  while (currentNode != null) {
    values.push(currentNode.val);
    currentNode = currentNode.next;
  }

  return values.join(" ");
};

const rotateLinkedListTest = () => {
  console.log("--- rotateLinkedListTest ---");
  const nodes = [1, 2, 3, 4, 5];
  let list = new LinkedList();
  for (let i = 0; i < nodes.length; i++) {
    list.appendToTail(nodes[i]);
  }

  console.log("Before: ", printLinkedList(list.head));
  console.log("After: ", printLinkedList(reverseLinkedList(list.head)));
};

// Bonus.
const reversePartsOfLinkedList = (head, n) => {
  if (head === null) return null;

  let p1 = head;
  let p2 = head;

  // Advance p1 to the n border.
  for (i in n) {
    p1.prev = p2;
    p1 = p1.next;
    p2 = p2.next;
  }
};

const main = () => {
  rotateLinkedListTest();
};

main();
