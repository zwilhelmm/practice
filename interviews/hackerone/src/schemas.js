"use strict";

/*
This file is not currently in use, in favor of a more rudimentary schema check for scalability as I am not sure what the next steps on expanding this program will entail.

@author Gordon Zhang
*/

// Third-party dependencies.
const mongoose = require("mongoose");

// Setting up the environment.
const Model = mongoose.model;

/*
The Report schema, with parameters according to the requirements.

Note that description is currently an optional field.

@param {String} title :: The title of the report.
@param {String} description :: The description of the report.
@param {String} createdBy :: The username of the report's creator.
@param {String} createdAt :: The timestamp of the report's creation.

*/
const reportSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  createdBy: {
    type: String,
    required: true
  },
  createdAt: {
    type: Number,
    required: true
  },
  description: String
});

const Report = new Model("Report", reportSchema);

// Exporting the schema.
module.exports = Report;
