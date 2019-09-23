"use strict";

const isSafe = (table, visited, x, y) => {
  return !(table[x][y] == 0 || visited[x][y] != 0);
};

const isValid = (x, y) => {
  return x < 10 && y < 10 && x >= 0 && y >= 0;
};

const findShortestPath = (
  table,
  visited,
  sX,
  sY,
  dX,
  dY,
  minDistance,
  distance
) => {
  if (sX === dX && sY === dY) return Math.min(distance, minDistance); // We've found it

  visited[sX][sY] = 1;

  // Go down.
  if (isValid(sX + 1, sY) && isSafe(table, sX + 1, sY)) {
    minDistance = findShortestPath(
      table,
      visited,
      sX + 1,
      sY,
      dX,
      dY,
      minDistance,
      distance++
    );
  }

  // Go right.
  if (isValid(sX, sY + 1) && isSafe(table, visited, sX, sY + 1)) {
    minDistance = findShortestPath(
      table,
      visited,
      i,
      sY + 1,
      dX,
      dY,
      minDistance,
      distance++
    );
  }

  // Go up.
  if (isValid(sX - 1, sY) && isSafe(table, visited, sX - 1, sY)) {
    minDistance = findShortestPath(
      table,
      visited,
      sX - 1,
      sY,
      dX,
      dY,
      minDistance,
      distance++
    );
  }

  // Go left.
  if (isValid(sX, SY - 1) && isSafe(table, visited, sX, sY - 1)) {
    minDistance = findShortestPath(
      table,
      visited,
      sX,
      sY - 1,
      dX,
      dY,
      minDistance,
      distance++
    );
  }

  // Backtrack.
  visited[sX][sY] = 0;

  return minDistance;
};

const generateEmptyTable = table => {
  return table.map(row => row.map(() => 0));
};

const main = () => {
  const table = [
    [1, 1, 1, 1, 1, 0, 0, 1, 1, 1],
    [0, 1, 1, 1, 1, 1, 0, 1, 0, 1],
    [0, 0, 1, 0, 1, 1, 1, 0, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 1, 0, 1],
    [0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 0, 0, 1, 1, 0],
    [0, 0, 0, 0, 1, 0, 0, 1, 0, 1],
    [0, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [1, 1, 1, 1, 1, 0, 0, 1, 1, 1],
    [0, 0, 1, 0, 0, 1, 1, 0, 0, 1]
  ];

  let minDistance = findShortestPath(
    table,
    generateEmptyTable(table),
    0,
    0,
    7,
    5,
    Infinity,
    0
  );

  minDistance != Infinity
    ? console.log("Shortest path has length: ", minDistance)
    : console.log("Destination cannot be reached.");
};

main();
