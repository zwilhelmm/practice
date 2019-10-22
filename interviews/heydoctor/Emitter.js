"use strict";

class Emitter {
  constructor() {
    this.table = {};
  }

  on(topic, cb) {
    this.table[topic] = [cb];
  }

  emit(topic, ...args) {
    if (this.table[topic]) {
      for (const cb of this.table[topic]) {
        cb(...args);
      }
    }
  }

  unsub(topic, ...args) {
    if (this.table[topic]) {
      //
    }
  }
}

const main = () => {
  const emitter = new Emitter();

  // Configure the emitter's behavior.
  emitter.on("message:sent", (...args) => {
    console.log(`[1] => Message *sent* with args ${args.join(" ")}`);
  });

  emitter.on("message:received", (...args) => {
    console.log(`[2] => Message *received* with args ${args.join(" ")}`);
  });

  unsub(); // `unsub` is the reference returned by `on` above

  const foo = "hey there!";
  const bar = "pizza is great";

  emitter.emit("message:sent", foo, bar);
  emitter.emit("message:received", foo, bar);
};

main();
