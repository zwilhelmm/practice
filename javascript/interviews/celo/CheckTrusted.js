const _ = require("underscore");

function checkTrusted(graph, target, pretrusted, trustVal) {
  const startNode = target;
  let pq = {};
  let distances = {};
  let prev = {};
  for (let i = 0; i < graph.length; i++) {
    distances[i] = 999;
    prev[i] = null;
  }

  // Run Dijkstra's from target node.
  distances[startNode] = 0;
  pq[0] = startNode;

  while (!_.isEmpty(pq)) {
    let minWeight = _.min(_.keys(pq));
    let minNode = pq[minWeight];
    let neighbors = getNeighbors(minNode, graph);

    for (let i = 0; i < neighbors.length; i++) {
      let altDist = distances[minNode] + graph[neighbors[i]][minNode];
      if (altDist < distances[neighbors[i]]) {
        distances[neighbors[i]] = altDist;
        prev[neighbors[i]] = minNode;
        pq[distances[neighbors[i]]] = neighbors[i];
      }
    }
    delete pq[minWeight];
  }

  let isTrusted = false;
  for (let i = 0; i < pretrusted.length; i++) {
    if (distances[pretrusted] < trustVal) isTrusted = true;
  }
  return isTrusted;
}

function getNeighbors(minNode, graph) {
  let neighbors = [];
  for (let i = 0; i < graph[minNode].length; i++) {
    if (graph[minNode][i] != 0) neighbors.push(i);
  }
  return neighbors;
}
