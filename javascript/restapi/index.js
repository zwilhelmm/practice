"use strict";

// Third-party dependencies.
const crypto = require("crypto");
const express = require("express");

// Setting up the environment.
const app = express();
const port = process.env.PORT || 3000;

// Routes.
app.post("/users", (req, res) => {
  const salt = crypto.randomBytes(16).toString("base64");
  const hash = crypto
    .createHmac("sha512", salt)
    .update(req.body.password)
    .digest("base64");

  req.body.password = salt + "$" + hash;
  req.body.permissionLevel = 1;

  UserModel.createUser(req.body)
    .then(result => {
      res.status(201).send({ id: result._id });
    })
    .catch(err => {
      res.status(400).send({
        message: "Failed."
      });
    });
});

app.get("/healthcheck", (req, res) => res.status(200).send("Hello World!"));

// Listening.
app.listen(port, () => console.log("App is now listening on port: ", port));
