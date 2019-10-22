"use strict";

// Third-party dependencies.
const bodyParser = require("body-parser");
const express = require("express");

// File dependencies.
const reporter = require("./reporter.js");

// Setting up the environment.
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Routes.
app.post("/reports", async (req, res) => {
  try {
    const response = await reporter.createReport(req.body);
    res.status(201).send(response);
  } catch (err) {
    res.status(err.status).send(err);
  }
});

app.get("/reports", async (req, res) => {
  try {
    const response = await reporter.readAllReports();
    res.status(201).send(response);
  } catch (err) {
    res.status(err.status).send(err);
  }
});

app.get("/reports/:report_id", async (req, res) => {
  try {
    const response = await reporter.readReport(req.params.report_id);
    res.status(200).send(response);
  } catch (err) {
    res.status(err.status).send(err);
  }
});

app.patch("/reports/:report_id", async (req, res) => {
  try {
    const response = await reporter.modifyReport(
      req.params.report_id,
      req.body
    );
    res.status(200).send(response);
  } catch (err) {
    res.status(err.status).send(err);
  }
});

app.put("/reports/:report_id", async (req, res) => {
  try {
    const response = await reporter.replaceReport(
      req.params.report_id,
      req.body
    );
    res.status(200).send(response);
  } catch (err) {
    res.status(err.status).send(err);
  }
});

app.delete("/reports/:report_id", async (req, res) => {
  try {
    const response = await reporter.deleteReport(
      req.params.report_id,
      req.body
    );
    res.status(200).send(response);
  } catch (err) {
    res.status(err.status).send(err);
  }
});

app.get("/", (req, res) => res.send("Hello World!"));

// Listening.
app.listen(port, () => console.log("App is now listening on port: ", port));

module.exports = app;
