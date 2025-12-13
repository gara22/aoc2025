import { readFile } from "fs/promises";
const file = "input.txt";
const lines = await readFile(`./src/day9/${file}`, {
  encoding: "utf8",
});

const rows = lines.split("\n");

const MAX_SIZE = 100_000;

type Point = {
  row: number;
  column: number;
};

function calculateDistance(p1: Point, p2: Point): number {
  return Math.abs(p1.row - p2.row) + Math.abs(p1.column - p2.column);
}

function calculateDiagonalPoints(ps: Point[]) {
  let topLeft: Point | undefined;
  ps.reduce((acc, p) => {
    const dist = calculateDistance({ row: 0, column: 0 }, p);
    if (dist < acc) {
      topLeft = p;
      return dist;
    }
    return acc;
  }, Infinity);

  let topRight: Point | undefined;
  ps.reduce((acc, p) => {
    const dist = calculateDistance({ row: 0, column: MAX_SIZE }, p);
    if (dist < acc) {
      topRight = p;
      return dist;
    }
    return acc;
  }, Infinity);

  let bottomLeft: Point | undefined;
  ps.reduce((acc, p) => {
    const dist = calculateDistance({ row: MAX_SIZE, column: 0 }, p);
    if (dist < acc) {
      bottomLeft = p;
      return dist;
    }
    return acc;
  }, Infinity);

  let bottomRight: Point | undefined;
  ps.reduce((acc, p) => {
    const dist = calculateDistance({ row: MAX_SIZE, column: MAX_SIZE }, p);
    if (dist < acc) {
      bottomRight = p;
      return dist;
    }
    return acc;
  }, Infinity);

  return [
    [topLeft, bottomRight],
    [topRight, bottomLeft],
  ];
}

function calculateRectangle(p1: Point, p2: Point): number {
  const width =
    Math.abs(p1.column - p2.column) > Math.abs(p2.column - p1.column)
      ? Math.abs(p1.column - p2.column) + 1
      : Math.abs(p2.column - p1.column) + 1;

  const height =
    Math.abs(p1.row - p2.row) > Math.abs(p2.row - p1.row)
      ? Math.abs(p1.row - p2.row) + 1
      : Math.abs(p2.row - p1.row) + 1;

  return width * height;
}

const points: Point[] = rows.map((r) => {
  const [column, row] = r.split(",");

  return {
    column: parseInt(column),
    row: parseInt(row),
    toString() {
      return `${this.column}, ${this.row}`;
    },
  };
});

function solve() {
  const diagonals = calculateDiagonalPoints(points);
  return diagonals.reduce((acc, pair) => {
    const rectangle = calculateRectangle(pair[0]!, pair[1]!);
    // console.log(
    //   `area of rectangle made of ${pair[0]} and ${pair[1]} is ${rectangle}`
    // );
    return rectangle > acc ? rectangle : acc;
  }, 0);
}

console.log(solve());
