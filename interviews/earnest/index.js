"use strict";

// Third-party dependencies.
const readlines = require("n-readlines");
const _ = require("lodash");

// File dependencies.
const MonthlyReportParser = require("./parser.js");

// Setting up the environment.
const liner = new readlines("./input.txt");

const MonthlyReportParserTest = () => {
  console.log("--- Starting provided MonthlyReportParser tests. ---");
  const providedParser = new MonthlyReportParser();

  const providedInput = [
    "2015-10-10 10 12 $1470.31 $659218.00",
    "2015-10-10 5 1 $431.98 $51028.00",
    "2015-10-09 8 15 $340.12 $21223.20",
    "2015-10-10 10 15 $930.12 $120413.00",
    "2015-10-09 12 5 $150.50 $6421.21"
  ];

  // From the prompt.
  const expectedOutput = {
    fixed_expenses_before_education: 289105,
    tradelines: [
      {
        type: "mortgage",
        monthly_payment: 147031,
        current_balance: 65921800
      },
      {
        type: "education",
        monthly_payment: 43198,
        current_balance: 5102800
      },
      {
        type: "other",
        monthly_payment: 34012,
        current_balance: 2122320
      },
      {
        type: "mortgage",
        monthly_payment: 93012,
        current_balance: 12041300
      },
      {
        type: "other",
        monthly_payment: 15050,
        current_balance: 642121
      }
    ]
  };

  _.map(providedInput, tradeline => providedParser.processTradeline(tradeline));
  const actualOutput = providedParser.getCreditReport();
  console.log(
    "provided: actualOutput === expectedOutput: ",
    _.isEqual(actualOutput, expectedOutput)
  );

  console.log("--- Ending provided MonthlyReportParser tests. ---");
  console.log("\n\n");
  console.log("--- Starting custom MonthlyReportParser tests. ---");
  const customParser = new MonthlyReportParser();

  let next;
  while ((next = liner.next())) {
    // Warning: next is a Buffer, not a String. Invoke toString().
    customParser.processTradeline(next.toString());
  }

  console.log("customOutput: ", customParser.getCreditReport());
  console.log("--- Ending custom MonthlyReportParser tests. ---");
};

MonthlyReportParserTest();
