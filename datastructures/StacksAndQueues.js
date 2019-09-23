"use strict";

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
  
}

class StackAsLinkedList {
  constructor() {
    this.head = null;
  }

  push(val) {
    let newNode = new Node(val);
    if (this.head === null) this.head = newNode;
    else {
      newNode.next = this.head;
      this.head = newNode;
    }
  }

  pop() {
    if (this.head === null) return null;
    else {
      let result = this.head.val;
      this.head = this.head.next;
      return result;
    }
  }

  isEmpty() {
    return this.head === null ? true : false;
  }

  toString() {
    if (this.head === null) return null;
    else {
      let curr = this.head;
      let result = [];
      while (curr.next != null) {
        console.log("curr: ", curr);
        result.push(curr.val);
        curr = curr.next;
      }
      return result;
    }
  }
}

class StackAsArray {
  constructor() {
    this.arr = [];
  }

  push(val) {
    this.arr.push(val);
  }

  pop() {
    return this.arr[0] === null ? null : this.arr.pop();
  }
}

class QueueAsLinkedList {
  constructor() {
    this.head = null;
  }

  enqueue(val) {
    let newNode = new Node(val);
    if (this.head === null) this.head = newNode;
    else {
      let curr = this.head;
      while (curr.next != null) {
        curr = curr.next;
      }

      curr.next = newNode;
    }
  }

  dequeue() {
    return this.head === null ? null : this.head;
  }
}

class QueueAsArray {
  constructor() {
    this.queue = [];
  }

  enqueue(val) {
    this.queue.push(val);
  }

  dequeue() {
    return this.queue.length > 0 ? this.queue[0] : null;
  }
}

// 3.1 Describe how you could use a single array to implement three stacks.
class ArrayAsThreeStacks {
  constructor(bufferSize) {
    // We will divide the buffer into three parts.
    this.individualBuffer = bufferSize;
    this.totalBuffer = bufferSize * 3;

    this.buffer = new Array(this.totalBuffer);
    if (Object.seal) Object.seal(this.buffer);
  }

  push(val, stackId) {
    const index = 5 * (stackId - 1);
  }

  pop(stackId) {
    //
  }
}

// 3.2 How would you design a stack which, in addition to push and pop, also has a function min which returns the minimum element? Push, pop and min should all operate in O(1) time.
class NodeWithMin {
  constructor(val) {
    this.val = val;
    this.next = null;
    this.min = null;
  }
}

class StackWithMin {
  constructor() {
    this.stack = [];
  }

  push(val) {
    const newNode = new NodeWithMin(val);
    if (this.stack.length === 0) {
      newNode.min = val;
      this.stack.push(newNode);
    } else {
      newNode.min = this.stack[0].min;
      this.stack.push(newNode);
    }
  }

  pop() {
    return this.stack.length === 0 ? null : this.stack[0];
  }

  getMinimumElement() {
    return this.stack[0].min;
  }
}

// 3.5 Implement a MyQueue class which implements a queue using two stacks.
class QueueAsStack {
  constructor() {
    this.s1 = new StackAsLinkedList();
    this.s2 = new StackAsLinkedList();
  }

  enqueue(val) {
    this.s1.push(val);
  }

  dequeue() {
    if (this.s2.isEmpty()) {
      // Transfer all elements from s1 to s2.
      while (!this.s1.isEmpty()) {
        this.s2.push(this.s1.pop());
      }
    }
    return this.s2.pop();
  }

  toString() {
    return "s1: " + this.s1.toString() + " " + "s2: " + this.s2.toString();
  }
}

(function QueueAsStackTest() {
  console.log("--- QueueAsStackTest ---");
  const queue = new QueueAsStack();
  console.log("Point 1: ", queue.toString());
  queue.enqueue("a");
  console.log("Point 2: ", queue.toString());
  queue.enqueue("b");
  console.log("Point 3: ", queue.toString());
  queue.enqueue("c");
  console.log("Point 4: ", queue.toString());
  console.log("Expected: d");
  console.log("Actual: ", queue.dequeue());
})();

class StackAsQueue {
  constructor() {
    this.q1 = new QueueAsArray();
    this.q2 = new QueueAsArray();
  }
}
