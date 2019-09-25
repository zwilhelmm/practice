"use strict";

const IsNumberPrimeNaive = num => {
  for (let i = 2; i < num; i++) {
    if (num % i === 0) return false;
  }
  return true;
};

const IsNumberPrimeSquareRoot = num => {
  for (let i = 2; i < Math.floor(Math.sqrt(num, 2)); i++) {
    if (num % i === 0) return false;
  }
  return true;
};

(() => {
  console.log("--- IsNumberPrimeTest ---");
  console.log("Expected: false");
  console.log("Actual: ", IsNumberPrimeNaive(121));
  console.log("Expected: false");
  console.log("Actual: ", IsNumberPrimeSquareRoot(121));
  console.log("Expected: true");
  console.log("Actual: ", IsNumberPrimeSquareRoot(19));
})();
