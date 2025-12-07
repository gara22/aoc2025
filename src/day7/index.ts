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

function prettyPrintGrid(g: Point[][]) {
  const prettyGrid = g.map((r) => r.map((p) => p.value));
  const str = prettyGrid.map((r) => r.join("") + "\n");
  console.log(str);
}

let splitCount = 0;
function drawBeam(start: Point, g: Point[][]) {
  let nextGrid = g;
  if (start.row >= numberOfRows - 1) {
    return nextGrid;
  }

  const pointBelow = nextGrid[start.row + 1][start.column];

  if (pointBelow.value === ".") {
    pointBelow.value = "|";
    return drawBeam(pointBelow, nextGrid);
  }

  if (pointBelow.value === "^") {
    splitCount++;

    const neighborPoints = [
      nextGrid[pointBelow.row][start.column - 1],
      nextGrid[pointBelow.row][start.column + 1],
    ];
    neighborPoints[0].value = "|";
    neighborPoints[1].value = "|";
    drawBeam(neighborPoints[0], nextGrid);
    return drawBeam(neighborPoints[1], nextGrid);
  }
}
function solve() {
  const startPoint = grid[0].find((point) => point.value === "S");
  const finalGrid = drawBeam(startPoint!, grid);
  // prettyPrintGrid(finalGrid!);
  return splitCount;
}

console.log(solve());
