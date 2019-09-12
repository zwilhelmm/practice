"use strict";

// Third-party dependencies.
const crypto = require("crypto");
const express = require("express");

// Setting up the environment.
const app = express();
const port = process.env.PORT || 3000;

// Routes.
app.post("/create_user", (req, res) => {
  const salt = crypto.randomBytes(16).toString("base64");
  const hash = crypto
    .createHmac("sha512", salt)
    .update(req.body.password)
    .digest("base64");

  req.body.password = salt + "$" + hash;
  req.body.permissionLevel = 1;

  UserModel.createUser(req.body).then(result => {
    res.status(201).send({ id: result._id });
  });
});

app.get("/get_user", (req, res) => {
  UserModel.findUserById(req.params.userId).then(result => {
    res.status(200).send(result);
  });
});

app.get("/get_all_users", (req, res) => {
  const limit =
    req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;

  const page = 0;

  if (req.query && req.query.page) {
    req.query.page = parseInt(req.query.page);
    page = Number.isInteger(req.query.page) ? req.query.page : 0;
  }

  UserModel.list(limit, page).then(result => {
    res.status(200).send(result);
  });
});

app.patch("/patch_user", (req, res) => {
  if (req.body.password) {
    const salt = crypto.randomBytes(16).toString("base64");
    const hash = crypto
      .createHmac("sha512", salt)
      .update(req.body.password)
      .digest("base64");
    req.body.password = salt + "$" + hash;
  }

  UserModel.patchUser(req.params.userId, req.body).then(() => {
    res.status(204).send({});
  });
});

app.delete("/delete_user", (req, res) => {
  UserModel.removeById(req.params.userId).then(() => {
    res.status(204).send({});
  });
});

app.get("/healthcheck", res => res.status(200).send("Hello World!"));

// Listening.
app.listen(port, () => console.log("App is now listening on port: ", port));
