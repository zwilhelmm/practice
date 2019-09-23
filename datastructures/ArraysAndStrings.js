"use strict";

// 1.1 Implement an algorithm to determine if a string has all unique characters. What if you can not use additional data structures?
const hasAllUniqueCharacters = str => {
  // Let's assume the char set is ASCII.
  let charSet = [];

  for (let i = 0; i < str.length; i++) {
    let ch = str[i];
    if (charSet.includes(ch)) return false;
    if (!charSet.includes(ch)) charSet.push(ch);
  }

  return true;
}; // O(n)

// 1.2 Write code to reverse a C-Style String (C-String means that “abcd” is represented as five characters, including the null character.)
const reverseCString = str => {
  return (
    str
      .substring(0, str.length)
      .split("")
      .reverse()
      .join("") + "\n"
  );
};

// 1.3 Design an algorithm and write code to remove the duplicate characters in a string without using any additional buffer.
const removeDuplicatesWithoutBuffer = str => {
  // NOTE: One or two additional variables are fine. An extra copy of the array is not.

  // NOTE: For contiguous duplicates.
  let result = "";
  for (let i = 0; i < str.length; i++) {
    if (str[i] != str[i + 1]) result += str[i];
  }

  return result;
};

// 1.4 Write a method to decide if two strings are anagrams or not.
const isAnagram = (str1, str2) => {
  return str1
    .split("")
    .sort()
    .join("") ===
    str2
      .split("")
      .sort()
      .join("")
    ? true
    : false;
};

// 1.5 Write a method to replace all spaces in a string with ‘%20’
const replaceSpaces = str => {
  return str.split(" ").join("%20");
};

// 1.6 Given an image represented by an NxN matrix, where each pixel in the image is 4 bytes, write a method to rotate the image by 90 degrees. Can you do this in place?
const rotateImage = (matrix, n) => {
  // For each onion layer:
  for (let i = 0; i < n / 2; i++) {
    let first = i;
    let last = n - 1 - i;
    for (let i = first; i < last; i++) {
      let offset = i - first;
      let top = matrix[first][i]; // save top
      // left -> top
      matrix[first][i] = matrix[last - offset][first];
      // bottom -> left
      matrix[last - offset][first] = matrix[last][last - offset];
      // right -> bottom
      matrix[last][last - offset] = matrix[i][last];
      // top -> right
      matrix[i][last] = top; // right <- saved top }
    }
  }

  return matrix;
};

// 1.8 Assume you have a method isSubstring which checks if one word is a substring of another. Given two strings, s1 and s2,write code to check if s2 is a rotation of s1 using only one call to isSubstring (i e , “waterbottle” is a rotation of “erbottlewat”).
const isRotation = (s1, s2) => {
  if (s1.length != s2.length) return false;
  return s1.concat(s1).includes(s2) ? true : false;
};

const isRotationTest = () => {
  console.log("--- isRotationTest ---");
  console.log("Expected: true");
  console.log("Actual: ", isRotation("waterbottle", "erbottlewat"));
};

// 1.6
const rotateImageTest = () => {
  console.log("--- rotateImage ---");
  console.log(
    "Expected: [[ 13, 9, 5, 1 ],[ 14, 10, 6, 2 ],[ 15, 11, 7, 3 ],[ 16, 12, 8, 4 ]]"
  );
  console.log(
    "Actual: ",
    rotateImage(
      [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]],
      4
    )
  );
};

// 1.5
const replaceSpacesTest = () => {
  console.log("--- replaceSpaces ---");
  console.log("Expected: Hello%20World!");
  console.log("Actual: ", replaceSpaces("Hello World!"));
};

// 1.4
const isAnagramTest = () => {
  console.log("--- isAnagram ---");
  console.log("Expected: true");
  console.log("Actual: ", isAnagram("racecar", "racecar"));
  console.log("Expected: true");
  console.log("Actual: ", isAnagram("notaracecar", "racecarnota"));
  console.log("Expected: false");
  console.log("Actual: ", isAnagram("racecar", "temp"));
};

// 1.3
const removeDuplicatesWithoutBufferTest = () => {
  console.log("--- removeDuplicatesWithoutBuffer ---");
  console.log("Expected: Helo Be!");
  console.log("Actual: ", removeDuplicatesWithoutBuffer("Hello Bee"));
};

// 1.2
const reverseCStringTest = () => {
  console.log("--- reverseCString ---");
  console.log("Expected: !dlroW olleH");
  console.log("Actual: ", reverseCString("Hello World!"));
};

// 1.1
const hasAllUniqueCharactersTest = () => {
  console.log("--- hasAllUniqueCharacters ---");
  console.log("Expected: true");
  console.log("Actual: ", hasAllUniqueCharacters("abc"));
  console.log("Expected: false");
  console.log("Actual: ", hasAllUniqueCharacters("abcc"));
};

const main = () => {
  hasAllUniqueCharactersTest(); // 1.1
  reverseCStringTest(); // 1.2
  removeDuplicatesWithoutBufferTest(); // 1.3
  isAnagramTest(); // 1.4
  replaceSpacesTest(); // 1.5
  rotateImageTest(); // 1.6
  isRotationTest(); // 1.8
};

main();
