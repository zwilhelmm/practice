"use strict";

const binarySearch = (arr, x, start, end) => {
  if (start > end) return -1;

  const mid = Math.floor((start + end) / 2);

  if (arr[mid] === x) return mid;

  if (arr[mid] > x) return binarySearch(arr, x, start, mid - 1);
  else return binarySearch(arr, x, mid + 1, end);
};

const main = () => {
  console.log("--- BinarySearchTest ---");
  const a = [2, 3, 4, 10, 40];
  console.log("Expected: 3");
  console.log("Actual: ", binarySearch(a, 10, 0, a.length - 1));

  const b = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91];
  console.log("Expected: 5");
  console.log("Actual: ", binarySearch(b, 23, 0, b.length - 1));
};

main();
