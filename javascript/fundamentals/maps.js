"use strict";

const main = () => {
  let testMap = new Map();

  testMap.set("1", "str1");
  testMap.set(1, "num1");
  testMap.set(true, "bool1");

  console.log("testMap.get('1'): ", testMap.get("1"));
  console.log("testMap.get(1): ", testMap.get(1));
  console.log("testMap.get(true): ", testMap.get(true));

  const testObj = {
    field: "Hello World"
  };

  testMap.set(testObj, 123);

  console.log("testMap.get(testObj): ", testMap.get(testObj));

  // Order of insertion is preserved.
  for (let key of testMap.keys()) console.log("testMap key: ", key);

  let testMap2 = new Map(Object.entries(testObj));
  for (let key of testMap.keys()) console.log("testMap2 key: ", key);

  console.log("===");

  const testSet = new Set(testMap)
};

main();
