import { readFile } from "fs/promises";
const file = "input.txt";
const lines = await readFile(`./src/day8/${file}`, {
  encoding: "utf8",
});

const rows = lines.split("\n");

const NUMBER_OF_PAIRS = 1000;

type Position = {
  x: number;
  y: number;
  z: number;
  toString: () => string;
};

function calculateEuclideanDistance(p1: Position, p2: Position): number {
  return Math.sqrt(
    Math.pow(p1.x - p2.x, 2) +
      Math.pow(p1.y - p2.y, 2) +
      Math.pow(p1.z - p2.z, 2)
  );
}

const positions: Position[] = rows.map((row) => {
  const n = row.split(",");
  return {
    x: parseInt(n[0]),
    y: parseInt(n[1]),
    z: parseInt(n[2]),
    toString() {
      return `${this.x},${this.y},${this.z}`;
    },
  };
});

type PointPair = [Position, Position];

type Pair = { pair: PointPair; distance: number };

const pairs: Pair[] = [];

const addedSet = new Set();

positions.forEach((p1, i) => {
  positions.forEach((p2, j) => {
    if (
      i !== j &&
      !addedSet.has(p1.toString() + p2.toString()) &&
      !addedSet.has(p2.toString() + p1.toString())
    ) {
      addedSet.add(p1.toString() + p2.toString());
      addedSet.add(p2.toString() + p1.toString());
      pairs.push({
        pair: [p1, p2],
        distance: calculateEuclideanDistance(p1, p2),
      });
    }
  });
});

pairs.sort((a, b) => a.distance - b.distance);

const firstN = pairs.slice(0, NUMBER_OF_PAIRS);

const connections: Array<Set<string>> = [];

for (let i = 0; i < firstN.length; i++) {
  const pair = firstN[i];
  const connectionIndex1 = connections.findIndex(
    (c) => c?.has(pair.pair[0].toString()) || c?.has(pair.pair[1].toString())
  );

  const connectionIndex2 = connections.findLastIndex(
    (c) => c?.has(pair.pair[0].toString()) || c?.has(pair.pair[1].toString())
  );

  if (connectionIndex1 === -1 && connectionIndex2 === -1) {
    if (!connections[i]) {
      connections[i] = new Set();
    }

    connections[i].add(pair.pair[0].toString());
    connections[i].add(pair.pair[1].toString());
    continue;
  }

  if (connectionIndex1 === connectionIndex2) {
    if (!connections[connectionIndex1]) {
      connections[connectionIndex1] = new Set();
    }

    connections[connectionIndex1].add(pair.pair[0].toString());
    connections[connectionIndex1].add(pair.pair[1].toString());
    continue;
  }

  if (!connections[connectionIndex2]) {
    connections[connectionIndex2] = new Set();
  }
  connections[connectionIndex2].forEach((p) =>
    connections[connectionIndex1].add(p)
  );

  connections[connectionIndex2].clear();
}

connections.sort((a, b) => b.size - a.size);

function solve() {
  return connections.slice(0, 3).reduce((acc, set) => acc * set.size, 1);
}

console.log(solve());
