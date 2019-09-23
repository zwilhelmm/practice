"use strict";

class NQueenProblem {
  constructor(queens) {
    this.queens = queens;
  }

  solve() {
    // Start in leftmost column.
    // If all queens are placed, return true.
    // Try all rows in current column. If a queen can be safely placed in this row, then mark row as part of solution. 
    
    // Recursively check if placing queen here leads to a solution.
    // If placing the queen in row, column works, then return true.
    // If it doesn't, then unmark this row, and try other rows.

    // If nothing worked, then return false to backtrack.
    
  }
}

const main = () => {
  const queen = new NQueenProblem(4);
  queen.solve();
};

main();
