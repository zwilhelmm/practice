"use strict";

// Implement your own version of Underscore's flattenDeep().

const flattenDeep = arr => {
  return arr.reduce((acc, curr) => {
    if (Array.isArray(curr)) return acc.concat(flattenDeep(curr));
    else {
      acc.push(curr);
      return acc;
    }
  }, []);
}

const main = () => {
  console.log("Expected: [ 1, 2, 3, 4, 5 ]");
  console.log("Actual: ", flattenDeep([1, 2, [3, [4, 5]]]));
};

main();
