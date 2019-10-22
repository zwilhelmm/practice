"use strict";

// Third-party dependencies.
const PouchDB = require("pouchdb");
const _ = require("lodash");

// Setting up the environment.
const db = new PouchDB("reports");

/*
Rudimentary schema check on a report.

@param report the body of the report to check
*/
const checkReportSchema = report => {
  if (typeof report != "object")
    throw {
      message: "Report type is incorrect.",
      status: 400
    };

  // Check if report has at least every required key.
  // Warning: Any extra fields added in are also left in.
  const requiredKeys = ["title", "description", "createdBy", "createdAt"];

  if (!_.every(requiredKeys, _.partial(_.has, report)))
    throw {
      message: "Report is missing required keys.",
      status: 400
    };

  if (
    typeof report.title != "string" ||
    typeof report.description != "string" ||
    typeof report.createdBy != "string" ||
    typeof report.createdAt != "number"
  )
    throw {
      message: "Report values are incorrect.",
      status: 400
    };

  /*
  For future use: below code will strictly disallow extra keys.
   */
  // _.every(
  //     ["title", "description", "createdBy", "createdAt"],
  //     key => key in report
  //   )
};

/*
Creates a new document in db.

@param report the report to create
@return status of the post operation, alongside the primary key
*/
const createReport = async function(report) {
  try {
    checkReportSchema(report);
    return await db.post(report);
  } catch (err) {
    if (err.status === 400) throw err;
    if (err.status === 404)
      throw {
        message: "Unable to create document.",
        status: 404
      };
    if (err.status === 409)
      throw {
        message: "Duplicate document.",
        status: 409
      };
    throw {
      message: "Unknown error creating document.",
      status: 500
    };
  }
};

/*
Gets a single report.

@param uri the primary key
@return the document corresponding to that key, if found
*/
const readReport = async uri => {
  try {
    return await db.get(uri);
  } catch (err) {
    if (err.status === 400) throw err;
    if (err.status === 404)
      throw {
        message: "Unable to get document.",
        status: 404
      };
    throw {
      message: "Unknown error getting document.",
      status: 500
    };
  }
};

/*
Performs GET on all reports. Note that there is no input necessary.

@return all documents and their ids in db.
*/
const readAllReports = async () => {
  try {
    // To-do: Pagination.
    return await db.allDocs({
      include_docs: true,
      attachments: true
    });
  } catch (err) {
    if (err.status === 404)
      throw {
        message: "Unable to get all documents.",
        status: 404
      };
    throw {
      message: "Unknown error getting all documents.",
      status: 500
    };
  }
};

/*
Modifies a report, given its primary key.

@param uri the primary key
@report the keys to update, and their corresponding values
@return status of the patch operation, alongside the primary key
*/
const modifyReport = async (uri, report) => {
  try {
    // To-do: check schema of input, since universal schema check will be hard-requiring all fields.
    const doc = await db.get(uri);
    return await db.put(_.extend({}, doc, report));
  } catch (err) {
    if (err.status === 400) throw err;
    if (err.status === 404)
      throw {
        message: "Unable to modify document.",
        status: 404
      };
    throw {
      message: "Unknown error modifying document.",
      status: 500
    };
  }
};

/*
Replaces an entire document with a new one.

Note that PUT can also be used to create a resource in the case where the resource ID is chosen by the client instead of by the server.

@param uri the primary key
@report the keys to replace, and their corresponding values
@return status of the put operation, alongside the primary key
*/
const replaceReport = async (uri, report) => {
  try {
    checkReportSchema(report);
    const doc = await db.get(uri);
    return await db.put(
      _.extend({}, report, {
        _id: doc._id
      })
    );
  } catch (err) {
    if (err.status === 400) throw err;
    if (err.status === 404)
      throw {
        message: "Unable to replace document.",
        status: 404
      };
    throw {
      message: "Unknown error replacing document.",
      status: 500
    };
  }
};

/*
Deletes a document from the db.

@param uri the primary key of the document to delete
@return status of the put operation, alongside the primary key
*/
const deleteReport = async uri => {
  try {
    const doc = await db.get(uri);
    return await db.put(
      _.extend({}, doc, {
        _deleted: true
      })
    );
  } catch (err) {
    if (err.status === 400) throw err;
    if (err.status === 404)
      throw {
        message: "Unable to delete document.",
        status: 404
      };
    throw {
      message: "Unknown error deleting document.",
      status: 500
    };
  }
};

module.exports = {
  createReport: createReport,
  readReport: readReport,
  readAllReports: readAllReports,
  modifyReport: modifyReport,
  replaceReport: replaceReport,
  deleteReport: deleteReport
};
