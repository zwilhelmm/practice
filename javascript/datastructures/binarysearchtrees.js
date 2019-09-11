class Node {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  insert(val) {
    const newNode = new Node(val);

    if (this.root === null) this.root = newNode;
    else this.insertNode(this.root, newNode);
  }

  insertNode(node, newNode) {
    if (newNode.val < node.val) {
      if (node.left === null) node.left = newNode;
      else this.insertNode(node.left, newNode);
    } else {
      if (node.right === null) node.right = newNode;
      else this.insertNode(node.right, newNode);
    }
  }

  remove(val) {
    this.root = this.removeNode(this.root, val);
  }

  removeNode(node, key) {
    if (node === null) return null;
    else if (key < node.val) {
      node.left = this.removeNode(node.left, key);
      return node;
    } else if (key > node.val) {
      node.right = this.removeNode(node.right, key);
      return node;
    } else {
      if (node.left === null && node.right === null) {
        node = null;
        return node;
      } else if (node.left === null) {
        node = node.right;
        return node;
      } else if (node.right === null) {
        node = node.left;
        return node;
      }
    }

    const temp = this.findMinimumNode(node.right);
    node.val = temp.val;

    node.right = this.removeNode(node.right, temp.data);
    return node;
  }
}
