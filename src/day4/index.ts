import { readFile } from "fs/promises";
const file = "input.txt";
const lines = await readFile(`./src/day4/${file}`, {
  encoding: "utf8",
});

const rows = lines.split("\n");

type Point = {
  row: number;
  column: number;
  value: string;
};

const grid: Point[][] = rows.map((row, i) =>
  Array.from(row).map((point, j) => ({
    row: i,
    column: j,
    value: point,
  }))
);

const numberOfColumns = grid[0].length;

function getNeighbors(point: Point, g: Point[][]) {
  const neighbors: Array<Point> = [];
  for (let index = 0; index < 3; index++) {
    const currentRowIndex = point.row + index - 1;
    if (currentRowIndex < 0 || currentRowIndex >= g.length) {
      continue;
    }
    const columnStart = point.column - 1 < 0 ? 0 : point.column - 1;
    const columnEnd =
      point.column + 1 >= numberOfColumns ? numberOfColumns : point.column + 1;
    const currentRow = g[currentRowIndex]
      .slice(columnStart, columnEnd + 1)
      .filter((p) => !(p.column === point.column && p.row === point.row));
    neighbors.push(...currentRow);
  }
  return neighbors;
}

function countAccessible(g: Point[][]) {
  const points: Point[] = [];
  g.forEach((row) => {
    row.forEach((point) => {
      if (point.value !== "@") {
      } else if (
        getNeighbors(point, g).filter((p) => p.value === "@").length < 4
      ) {
        points.push(point);
      }
    });
  });
  return points;
}

function removePoints(g: Point[][], points: Point[]) {
  points.forEach((p) => (g[p.row][p.column].value = "x"));
  return g;
}

function solve() {
  let res = 0;
  let g = grid;
  while (true) {
    const pointsToRemove = countAccessible(g);
    if (pointsToRemove.length === 0) {
      return res;
    }
    res += pointsToRemove.length;
    g = removePoints(grid, pointsToRemove);
  }
}

console.log(solve());
