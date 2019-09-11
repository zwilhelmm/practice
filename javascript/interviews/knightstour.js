"use strict";

class KnightsTour {
  constructor(rows) {
    this.rows = rows;
  }

  solveKnightsTour() {
    // Initialize solution matrix.
    let solutions = Array(this.rows)
      .fill()
      .map(() => Array(this.rows).fill(-1));

    // The x and y coordinates of the next moves.
    const xMove = [2, 1, -1, -2, -2, -1, 1, 2];
    const yMove = [1, 2, 2, 1, -1, -2, -2, -1];

    // The knight starts here.
    solutions[0][0] = 0;

    // Start from (0, 0) and explore all possible tours.
    if (this.solveKnightsTourUtil(0, 0, 1, solutions, xMove, yMove)) {
      this.printSolution(solutions);
      return true;
    }
    else {
      console.log("Solution does not exist.");
      return false;
    }
  }

  solveKnightsTourUtil(x, y, movei, solutions, xMove, yMove) {
    let k, nextX, nextY;

    if (movei === Math.pow(this.rows, 2)) return true;

    // Try everything from current x, y.
    for (let i = 0; i < this.rows; i++) {
      nextX = x + xMove[i];
      nextY = y + yMove[i];

      if (this.isSafe(nextX, nextY, solutions)) {
        solutions[nextX][nextY] = movei;
        if (
          this.solveKnightsTourUtil(
            nextX,
            nextY,
            movei + 1,
            solutions,
            xMove,
            yMove
          )
        ) {
          return true;
        } else solutions[nextX][nextY] = -1; // Back-tracking.
      }
    }

    return false;
  }

  isSafe(x, y, solutions) {
    return (
      x >= 0 &&
      x < this.rows &&
      y >= 0 &&
      y < this.rows &&
      solutions[x][y] == -1
    );
  }

  printSolution(solutions) {
    for (let x = 0; x < this.rows; x++) {
      for (let y = 0; y < this.rows; y++) console.log(solutions[x][y] + " ");
      console.log();
    }
  }
}

const main = () => {
  // Initialize the board.
  const kt = new KnightsTour(8);
  console.log("Result: ", kt.solveKnightsTour());
};

main();
