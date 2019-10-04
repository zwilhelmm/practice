"use strict";

const quickSort = arr => {
  if (arr.lenght <= 1) return arr;

  let left = [],
    right = [],
    pivot = arr[0];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < pivot) left.push(arr[i]);
    else right.push(arr[i]);
  }

  return quickSort(left).concat(pivot, quickSort(right));
};

const main = () => {
  console.log("--- quickSortTest ---");
  const a = [9, 2, 5, 6, 4, 3, 7, 10, 1, 12, 8, 11];
  console.log("Expected: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ]");
  console.log("Actual: ", quickSort(a.slice()));
};
