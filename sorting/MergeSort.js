"use strict";

const merge = (left, right) => {
  let res = [],
    l = 0,
    r = 0;

  while (l < left.length && r < right.length) {
    if (left[l] < right[r]) res.push(left[l++]);
    else res.push(right[r++]);
  }

  return res.concat(left.slice(l).concat(right.slice(r)));
};

const mergeSort = arr => {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);

  return merge(mergeSort(left), mergeSort(right));
};

const main = () => {
  console.log("--- mergeSortTest ---");
  console.log("Expected: [ 5, 6, 7, 11, 12, 13 ]");
  console.log("Actual: ", mergeSort([12, 11, 13, 5, 6, 7]));
};

main();
