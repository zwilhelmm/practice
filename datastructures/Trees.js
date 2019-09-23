"use strict";

// Trees and graphs typically ask implement a tree, find a node, delete a node, or another well-known algorithm, or a modification thereof.

// Note that binary search trees are only a type of binary tree.

class Node {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

class BinaryTree {
  constructor() {
    this.root = null;
  }

  insertIteratively(val) {
    const newNode = new Node(val);
    if (this.root === null) this.root = newNode;
    else {
      let currentNode = this.root;
      while (true) {
        if (currentNode.val < val) {
          if (currentNode.left != null) currentNode = currentNode.left;
          else {
            currentNode.left = newNode;
            break;
          }
        } else if (currentNode.val >= val) {
          if (currentNode.right != null) currentNode = currentNode.right;
          else {
            currentNode.right = newNode;
            break;
          }
        }
      }
    }
  }

  insertRecursively(node, val) {
    const newNode = new Node(val);
    if (this.root === null) this.root = newNode;

    // Recursive form.
    if (node.left === null && node.right === null) {
      if (val < node.val) node.left = newNode;
      else if (val >= node.val) node.right = newNode;
    } else {
      if (val < node.val) this.insertRecursively(node.left, val);
      else if (val >= node.val) this.insertRecursively(node.right, val);
    }
  }
}

// 4.1 Implement a function to check if a tree is balanced. For the purposes of this question, a balanced tree is defined to be a tree such that no two leaf nodes differ in distance from the root by more than one.
const isBalanced = node => {
  //
};
