"use strict";

const express = require("express");
const request = require("request-promise-native");
const app = express();

const promiseTestFn = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Hello World");
      resolve(true);
    }, 3000);
  });
};

const promiseRequestFn = () => {
  return new Promise((resolve, reject) => {
    request.get(
      {
        url: "http://www.google.com"
      },
      (err, res, body) => {
        if (err) reject("Request failed");
        else resolve("Request success");
      }
    );
  });
};

const asyncRequestFn = async function() {
  const res = await request("http://www.google.com");
  return res ? true : false;
};

// Works.
app.get("/promiseTestFn", (req, res) => {
  promiseTestFn()
    .then(result => console.log(result))
    .finally(() => {
      res.status(201).send(true);
    });
});

// Works.
app.get("/promiseRequestFn", (req, res) => {
  promiseRequestFn()
    .then(result => console.log(result))
    .finally(() => {
      res.status(201).send();
    });
});

app.get("/asyncRequestFn", (req, res) => {
  const result = asyncRequestFn();
  result ? res.status(201).send(result) : res.status(500).send(result);
});

// Listening.
app.listen(3000, () => console.log("App is now listening on port: 3000"));
