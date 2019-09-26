"use strict";

// Trees and graphs typically ask implement a tree, find a node, delete a node, or another well-known algorithm, or a modification thereof. Note that binary search trees are only a type of binary tree.
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
  preOrder(node) {
    if (node != null) {
      console.log(node.val);
      this.preOrder(node.left);
      this.preOrder(node.left);
    }
  }

  // In binary search trees, nodes are given in non-decreasing order. For a non-increasing order, a variation with reversal is used.
  inOrder(node) {
    if (node != null) {
      console.log(node.val);
      this.inOrder(node.right);
    }
  }

  // Often used to delete the tree.
  postOrder(node) {
    if (node != null) {
      this.postOrder(node.left);
      this.postOrder(node.right);
      console.log(node.val);
    }
  }

  search(node, val) {
    if (node === null) return null;
    else if (val < node.val) return this.search(node.left, val);
    else if (val > node.val) return this.search(node.right, val);
    else return node;
  }

  insertRecursive(node, newNode) {
    if (newNode.val < node.val) {
      if (node.left === null) node.left = newNode;
      else this.insertRecursive(node.left, newNode);
    } else {
      if (node.right === null) node.right = newNode;
      else this.insertRecursive(node.right, newNode);
    }
  }

  insert(val) {
    const newNode = new Node(val);
    if (this.root === null) this.root = newNode;
    else this.insertRecursive(this.root, newNode);
  }

  isBalanced(node) {
    if (node === null) return null;
    return Math.abs(this.getHeight(node.left) - this.getHeight(node.right)) <= 1 &&
      this.isBalanced(node.left) &&
      this.isBalanced(node.right)
      ? true
      : false;
  }

  getSize(node) {
    return node === null
      ? 0
      : this.getSize(node.left) + this.getSize(node.right) + 1;
  }

  getHeight(node) {
    if (node === null) return 0;
    else {
      const leftHeight = this.getHeight(node.left);
      const rightHeight = this.getHeight(node.right);
      return leftHeight > rightHeight ? leftHeight + 1 : rightHeight + 1;
    }
  }

  getMinNode(node) {
    return node.left === null ? node : this.getMinNode(node.left);
  }

  removeRecursive(node, val) {
    if (node === null) return null;
    else if (val < node.val) {
      node.right = this.removeRecursive(node.right, val);
      return node;
    } else {
      if (node.left === null) {
        node = node.right;
        return node;
      } else if (node.right === null) {
        node = node.left;
        return node;
      }

      const min = this.getMinNode(node.right);
      node.val = min.val;

      node.right = this.removeRecursive(node.right, min.val);
      return node;
    }
  }

  remove(val) {
    this.root = this.removeRecursive(this.root, val);
  }
}

const binarySearchTreeTest = () => {
  console.log("--- binarySearchTreeTest ---");
  const bst = new BinaryTree();

  bst.insert(15);
  bst.insert(25);
  bst.insert(10);
  bst.insert(7);
  bst.insert(22);
  bst.insert(17);
  bst.insert(13);
  bst.insert(5);
  bst.insert(9);
  bst.insert(27);

  /*
            15 
           /  \ 
          10   25 
         / \   / \ 
        7  13 22  27 
       / \    / 
      5   9  17  
  */

  console.log("Expected: 5 7 9 10 13 15 17 22 25 27");
  bst.inOrder(bst.root);

  bst.remove(5);

  /*
            15 
           /  \ 
          10   25 
         / \   / \ 
        7  13 22  27 
         \    / 
          9  17  
  */

  console.log("Expected: 7 9 10 13 15 17 22 25 27");
  bst.inOrder(bst.root);

  bst.remove(7);

  /*
            15 
           /  \ 
          10   25 
         / \   / \ 
        9  13 22  27 
              / 
             17 
  */

  console.log("Expected: 9 10 13 15 17 22 25 27");
  bst.inOrder(bst.root);

  bst.remove(15);

  /*
            17 
           /  \ 
          10   25 
         / \   / \ 
        9  13 22  27 
  */

  console.log("Expected: 9 10 13 17 22 25 27");
  bst.inOrder(bst.root);

  console.log("PreOrder traversal:");
  bst.preOrder(bst.root);

  console.log("PostOrder traversal:");
  bst.postOrder(bst.root);

  console.log("Expected: 3");
  console.log("Actual: ", bst.getHeight(bst.root));

  console.log("Expected: 7");
  console.log("Actual: ", bst.getSize(bst.root));

  console.log("Expected: true");
  console.log("Actual: ", bst.isBalanced(bst.root));
};

// 4.1 Implement a function to check if a tree is balanced. For the purposes of this question, a balanced tree is defined to be a tree such that no two leaf nodes differ in distance from the root by more than one.
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
  // orderTraversalTest();
  // traverseInOrderWithoutStackTest();
  binarySearchTreeTest();
})();
