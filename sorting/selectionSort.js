"use strict";

const selectionSort = arr => {
  for (let i = 0; i < arr.length; i++) {
    let min = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[min]) min = j;
    }
    let temp = arr[i];
    arr[i] = arr[min];
    arr[min] = temp;
  }
  return arr;
};

const selectionSortTest = arr => {
  console.log("--- selectionSortTest ---");
  console.log("Expected: ceeilnoorsstt");
  console.log("Actual: ", selectionSort("selectionsort".split("")).join(""));
};

const main = () => {
  insertionSortTest("selectionSort");
};

main();
