"use strict";

// Third-party dependencies.
const _ = require("lodash");
const moment = require("moment");

class MonthlyReportParser {
  constructor() {
    this.tradelines = [];
    this.housingExpenses = 0;
    this.nonHousingExpenses = 0;
    this.housingPaid = false;
  }

  /*

  Calculus of determining type of payment. Made as its own method for ease of modification.

  @param code the code as an integer.
  @param subCode the subCode as an integer.
  @return the determined type as a string.
  */
  determineTradelineType(code, subCode) {
    if (code === 10 && (subCode === 12 || subCode === 15)) return "mortgage";
    if (code === 5) return "education";
    return "other";
  }

  /*

  Adds a tradeline to the ledger. A schema validation check is performed before the data is actually applied.

  @param tradeline The tradeline to inspect and process.

  Note that the tradeline is expected to be a string with properties delimited by a single whitespace. Anything else will fail the schema check.

  */
  processTradeline(tradeline) {
    // Begin schema check.
    if (typeof tradeline != "string") return;

    // "Any line with an unexpected number of fields can be safely ignored."
    const properties = tradeline.split(" ");
    if (properties.length != 5) return;

    const date = moment(properties[0]); // Checked but not used.

    const code = parseInt(properties[1]);
    const subCode = parseInt(properties[2]);

    const monthlyPayment = parseInt(
      _.filter(properties[3], digit => !isNaN(digit)).join("")
    );

    const currentBalance = parseInt(
      _.filter(properties[4], digit => !isNaN(digit)).join("")
    );

    if (
      !date._isValid ||
      typeof code != "number" ||
      typeof subCode != "number" ||
      monthlyPayment === NaN ||
      currentBalance === NaN
    )
      return;

    // Schema validation completed, continue with processing.

    const type = this.determineTradelineType(code, subCode);

    if (type === "mortgage") {
      this.housingExpenses += monthlyPayment;
      this.housingPaid = true;
    }
    if (type != "mortgage" && code != 5)
      this.nonHousingExpenses += monthlyPayment;

    this.tradelines.push({
      type: type,
      monthly_payment: monthlyPayment,
      current_balance: currentBalance
    });

    return;
  }

  /*
  Returns the credit report for this month.
  
  Note that the possibility of a rental charge is applied only at the end, as we process tradelines line by line, and there is no way to know if a mortgage payment will happen until the last line. As such, a flag is set to mark the presence of a mortgage payment.
  
  @return the credit report
  */
  getCreditReport() {
    // Average monthly rent can possibly be abstracted into an environment variable.
    if (!this.housingPaid) this.housingExpenses += 1061;
    return {
      fixed_expenses_before_education:
        this.housingExpenses + this.nonHousingExpenses,
      tradelines: this.tradelines
    };
  }
}

module.exports = MonthlyReportParser;
