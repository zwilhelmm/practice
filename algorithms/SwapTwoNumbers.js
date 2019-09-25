"use strict";

// Swap two numbers without using a third variable.
const swapUsingTemp = (x, y) => {
  const temp = x;
  x = y;
  y = temp;
  return [x, y];
};

const swapUsingAddition = (x, y) => {
  x = x + y;
  y = x - y;
  x = x - y;
  return [x, y];
};
/*
XOR table:
x y output
0 0 0
0 1 1
1 0 1
1 1 0
*/
const swapUsingXOR = (x, y) => {
  x = x ^ y;
  y = x ^ y;
  x = x ^ y;
  return [x, y];
};

(() => {
  console.log("--- SwapTwoNumbersTest ---");
  console.log("Expected: 2 1");
  console.log("Actual: ", swapUsingTemp(1, 2).join(" "));
  console.log("Expected: 10 5");
  console.log("Actual: ", swapUsingAddition(5, 10).join(" "));
  console.log("Expected: 3 4");
  console.log("Actual: ", swapUsingXOR(4, 3).join(" "));
})();
