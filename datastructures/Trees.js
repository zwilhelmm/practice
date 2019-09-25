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

  traverseInOrderWithStack() {
    // Create empty stack, initialize current node as root. Push current node to stack, going left until current is null. If current is null and stack is not empty, then pop, print, and go right.
    let stack = [];
    let currentNode = this.root;

    while (currentNode.val != null || stack.length > 0) {
      console.log("temp: ", currentNode.val);
      while (currentNode) {
        stack.push(currentNode.val);
        currentNode = currentNode.left;
      }

      currentNode = stack.pop();
      console.log(currentNode.val + " ");
      currentNode = currentNode.right;
    }
  }

  traverseInOrderWithoutStack() {
    let currentNode = this.root;
    while (currentNode != null) {
      if (currentNode.left === null) {
        console.log(currentNode.val + " ");
        currentNode = currentNode.right;
      } else {
        // Find in-order predecessor of currentNode.
        let predecessor = currentNode.left;
        while (predecessor.right != null && predecessor.right != currentNode) {
          predecessor = predecessor.right;
        }

        // Make current the right child of its in-order predecessor.
        if (predecessor.right === null) {
          predecessor.right = currentNode;
          currentNode = currentNode.left;
        }
        // Revert the changes made in the 'if' part to restore the original tree i.e., fix the right child of predecessor
        else {
          predecessor.right = null;
          console.log(currentNode.val + " ");
          currentNode = currentNode.right;
        }
      }
    }
  }

  // Often used to print the tree.
  printPreOrder(node) {
    if (node === null) return;
    console.log(node.val + " ");
    this.printPreOrder(node.left);
    this.printPreOrder(node.right);
  }

  // In binary search trees, nodes are given in non-decreasing order. For a non-increasing order, a variation with reversal is used.
  printInOrder(node) {
    if (node === null) return;
    this.printInOrder(node.left);
    console.log(node.val + " ");
    this.printInOrder(node.right);
  }

  // Often used to delete the tree.
  printPostOrder(node) {
    if (node === null) return;
    this.printPostOrder(node.left);
    this.printPostOrder(node.right);
    console.log(node.val + " ");
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

  insertRecursivelyHelper(node, val) {
    // Recursive form.
    if (node.left === null && node.right === null) {
      const newNode = new Node(val);
      if (val < node.val) node.left = newNode;
      else if (val >= node.val) node.right = newNode;
    } else {
      if (val < node.val) this.insertRecursively(node.left, val);
      else if (val >= node.val) this.insertRecursively(node.right, val);
    }
  }

  insertRecursively(val) {
    if (this.root === null) this.root = new Node(val);
    else this.insertRecursivelyHelper(this.root, val);
  }
}

// 4.1 Implement a function to check if a tree is balanced. For the purposes of this question, a balanced tree is defined to be a tree such that no two leaf nodes differ in distance from the root by more than one.
const isBalanced = node => {
  // Get the height of left and right subtrees. Return true if the difference between the two heights is not more than 1, and if they are both individually balanced.
  if (node === null) return null;
  if (
    Math.abs(getHeight(node.left) - getHeight(node.right)) <= 1 &&
    isBalanced(node.left) &&
    isBalanced(node.right)
  )
    return true;

  return false;
};

const getHeight = node => {
  return node === null
    ? 0
    : 1 + Math.max(getHeight(node.left), getHeight(node.right));
};

const isBalancedTest = () => {
  const tree = new BinaryTree();
  tree.root = new Node(1);
  tree.root.left = new Node(2);
  tree.root.right = new Node(3);
  tree.root.left.left = new Node(4);
  tree.root.left.right = new Node(5);
  tree.root.left.left.left = new Node(8);

  console.log("--- isBalancedTest ---");
  console.log("Expected: false");
  console.log("Actual: ", isBalanced(tree.root));
};

const orderTraversalTest = () => {
  const tree = new BinaryTree();
  tree.root = new Node(1);
  tree.root.left = new Node(2);
  tree.root.right = new Node(3);
  tree.root.left.left = new Node(4);
  tree.root.left.right = new Node(5);

  console.log("--- orderTraversalTest ---");
  console.log("Pre Order Traversal: ", tree.printPreOrder(tree.root));
  console.log("In Order Traversal: ", tree.printInOrder(tree.root));
  console.log("Post Order Traversal: ", tree.printPostOrder(tree.root));
};

const traverseInOrderWithStackTest = () => {
  const tree = new BinaryTree();
  tree.root = new Node(1);
  tree.root.left = new Node(2);
  tree.root.right = new Node(3);
  tree.root.left.left = new Node(4);
  tree.root.left.right = new Node(5);
  console.log("--- traverseInOrderWithStackTest ---");
  console.log(
    "Traversing tree in order with stack: ",
    tree.traverseInOrderWithStack()
  );
};

const traverseInOrderWithoutStackTest = () => {
  console.log("--- traverseInOrderWithoutStackTest ---");
  const tree = new BinaryTree();
  tree.root = new Node(1);
  tree.root.left = new Node(2);
  tree.root.right = new Node(3);
  tree.root.left.left = new Node(4);
  tree.root.left.right = new Node(5);
  tree.traverseInOrderWithoutStack(tree.root);
};

(() => {
  isBalancedTest();
  orderTraversalTest();
  traverseInOrderWithoutStackTest();
})();
