/*
A blockchain is a LinkedList of blocks, each containing up to 5 valid   transactions. Each block is linked via cryptographic hash.

Blocks are encoded as strings of form:
"blockHash, prevBlockHash, nonce, blockTransactions"
*/

// The global state of each account is determined by looking at the entire chain.

// Problem: Given arrays startBalances and pendingTransactions and int blockSize, create a blockchain that includes all valid pending transactions in order, and return the last block.

"use strict";

const CryptoJS = require("crypto-js");

function getLatestBlock(startBalances, pendingTransactions, blockSize) {
  const currBlockHash = "0000000000000000000000000000000000000000";
  let transactions = [];
  let encodedBlock = "";
  let prevBlockHash = "";

  while (pendingTransactions.length > 0) {
    transactions = validateTransactions(
      startBalances,
      pendingTransactions,
      blockSize
    );

    prevBlockHash = currBlockHash;
    nonce = getNonce(prevBlockHash, transactions);

    encodedBlock = [
      getBlockHash(prevBlockHash, nonce, transactions),
      prevBlockHash,
      nonce,
      transactions
    ].join(", ");
  }

  return encodedBlock;
}

function sha1(text) {
  return CryptoJS.enc.Hex.stringify(CryptoJS.SHA1(text));
}

function getBlockHash(prevBlockHash, nonce, transactions) {
  return sha1([prevBlockHash, nonce, transactions].join(", "));
}

function getNonce(prevBlockHash, transactions) {
  let found = false;
  let nonce = 1;

  while (!found) {
    sha1(
      getBlockHash(prevBlockHash, nonce, transactions).substring(0, 4) ===
        "0000"
    )
      ? (found = true)
      : nonce++;
  }

  return nonce;
}

// A transaction t[i] is valid if address at from has a balance >= value after processing all transactions t[j], for which j < i. Some transactions may be invalid. Each transaction is [from, to, value].
function validateTransactions(startBalances, pendingTransactions, blockSize) {
  let approvedTransactions = [];
  let count = 0;

  while (count < blockSize && pendingTransactions.length > 0) {
    // [5, 0, 0]
    // pendingTransactions: [[0,1,5], [1,2,5]]

    if (startBalances[pendingTransactions[0][0]] >= pendingTransactions[0][2]) {
      approvedTransactions.push(pendingTransactions[0]);

      startBalances[pendingTransactions[0][1]] =
        startBalances[pendingTransactions[0][1]] + pendingTransactions[0][2];
      startBalances[pendingTransactions[0][0]] =
        startBalances[pendingTransactions[0][0]] - pendingTransactions[0][2];
    }
    pendingTransactions.splice(0, 1);
    count += 1;
  }

  return transactions;
}

function validateTransactions(startBalances, pendingTransactions, blockSize) {
  // [5, 0, 0]
  // pendingTransactions: [[0,1,5], [1,2,5]]
  let result = [];
  let counter = 0;

  while (counter < blockSize) {
    if (startBalances[pendingTransactions[0][0]] >= pendingTransactions[0][2]) {
      result.push(pendingTransactions[0]);

      startBalances[pendingTransactions[1]] =
        startBalances[pendingTransactions[1]] + pendingTransactions[2];
      startBalances[pendingTransactions[0]] =
        startBalances[pendingTransactions[0]] - pendingTransactions[2];
    }

    pendingTransactions.splice(0, 1);
    counter++;
  }

  return result;
}

const main = () => {
  console.log(getLatestBlock([5, 0, 0], [[0, 1, 5], [1, 2, 5]], 2));
  console.log(getLatestBlock([1, 7], [[1, 0, 4], [1, 0, 3], [1, 0, 2]], 2));
  console.log(
    getLatestBlock(
      [3, 10, 10, 3],
      [[3, 2, 2], [2, 3, 5], [3, 2, 4], [3, 0, 2], [1, 2, 2]],
      2
    )
  );
};
main();
