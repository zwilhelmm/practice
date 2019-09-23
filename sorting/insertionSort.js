"use strict";

const insertionSort = arr => {
  for (let i = 1; i < arr.length; i++) {
    let j = i;
    while (j > 0 && arr[j - 1] > arr[j]) {
      let temp = arr[j];
      arr[j] = arr[j - 1];
      arr[j - 1] = temp;
      j--;
    }
  }

  return arr;
};

const insertionSortTest = arr => {
  console.log("--- insertionSortTest ---");
  console.log("Expected: eiinnoorrsstt");
  console.log("Actual: ", insertionSort(arr).join(""));
};

const main = () => {
  insertionSortTest("insertionsort".split(""));
};

main();
