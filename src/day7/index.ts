import { readFile } from "fs/promises";
const file = "input.txt";
const lines = await readFile(`./src/day7/${file}`, {
  encoding: "utf8",
});

const rows = lines.split("\n");

const grid: Point[][] = rows.map((row, i) =>
  Array.from(row).map((point, j) => ({
    row: i,
    column: j,
    value: point,
  }))
);
const numberOfRows = grid.length;

type Point = {
  row: number;
  column: number;
  value: string;
};
function getId(p: Point) {
  return p.row.toString() + p.column.toString();
}

function prettyPrintGrid(g: Point[][]) {
  const prettyGrid = g.map((r) => r.map((p) => p.value));
  const str = prettyGrid.map((r) => r.join("") + "\n");
  console.log(str);
}

function findNextSplitterOrEnd(startPoint: Point, g: Point[][]): Point {
  // we ran out of grid
  if (startPoint.row >= numberOfRows - 1) {
    return startPoint;
  }

  if (startPoint.value === "^") {
    return startPoint;
  }

  return findNextSplitterOrEnd(g[startPoint.row + 1][startPoint.column], g);
}

function findAllRoutes(
  startPoint: Point,
  endPoint: Point,
  g: Point[][],
  cache: Map<string, number>
): number {
  if (cache.has(getId(startPoint))) {
    return cache.get(getId(startPoint))!;
  }
  let routeCount = 0;

  const neighborPoints = [
    g[startPoint.row][startPoint.column - 1],
    g[startPoint.row][startPoint.column + 1],
  ];

  //first we go left
  let found = findNextSplitterOrEnd(neighborPoints[0], g);
  if (getId(found) === getId(endPoint)) {
    routeCount++;
  }

  if (found.value === "^") {
    const foundRouteCount = findAllRoutes(found, endPoint, g, cache);
    routeCount += foundRouteCount;
  }

  //then we go right
  found = findNextSplitterOrEnd(neighborPoints[1], g);
  if (getId(found) === getId(endPoint)) {
    routeCount++;
    return routeCount;
  }

  if (found.value === "^") {
    const foundRouteCount = findAllRoutes(found, endPoint, g, cache);
    routeCount += foundRouteCount;
  }

  cache.set(getId(startPoint), routeCount);
  return routeCount;
}
function solve() {
  const splitters = grid
    .map((row) => {
      const ret: Point[] = [];
      row.forEach((v) => {
        if (v.value === "^") ret.push(v);
      });
      return ret;
    })
    .flat()
    .reverse();

  const lastRow = grid[numberOfRows - 1];

  return lastRow.reduce((acc, point) => {
    const splitterCache: Map<string, number> = new Map();

    const asd = splitters.map((splitter) => {
      const count = findAllRoutes(splitter, point, grid, splitterCache);
      // console.log(`found ${count} routes from point: `);
      // console.log(splitter);
      return count;
    });

    return acc + asd[asd.length - 1];
  }, 0);
}

console.log(solve());
