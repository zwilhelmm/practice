"use strict";

// Third-party dependencies.
const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");

// File dependencies.
const server = require("../src/index.js");

// Setting up the environment.
const expect = chai.expect;
const spy = sinon.spy;

chai.use(chaiHttp);

// Begin tests.

describe("Hackerone API Tests", () => {
  beforeEach(done => {
    // Before each test, empty the database.
    done();
  });

  let report = {
    title: "Alice",
    description: "Hello world.",
    createdBy: "alice@user",
    createdAt: 1234
  };

  describe("/POST report", () => {
    it("should post a report", done => {
      chai
        .request(server)
        .post("/reports")
        .send(report)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res.status).to.equal(201);
          done();
        });
    });
  });
});
