import { readFile } from "fs/promises";
const file = "input.txt";
const lines = await readFile(`./src/day5/${file}`, {
  encoding: "utf8",
});
type Range = [number, number];
const rows = lines.split("\n");
const splitIndex = rows.findIndex((r) => r === "");
const ranges: Range[] = rows.slice(0, splitIndex).map((row) => {
  return [parseInt(row.split("-")[0]), parseInt(row.split("-")[1])];
});

function isInRange(n: number, range: Range) {
  return n >= range[0] && n <= range[1];
}

function calculateLengthOfRange(range: Range) {
  return range[1] - range[0] + 1;
}

const sortedRanges = ranges.toSorted((a, b) => {
  if (a[0] - b[0] === 0) {
    return a[1] - b[1];
  }
  return a[0] - b[0];
});

function mergeRange(r1: Range, r2: Range): Range {
  if (!isInRange(r2[0], r1) && !isInRange(r2[0], r1)) {
    throw Error("ranges are not overlapping");
  }
  const end = r1[1] > r2[1] ? r1[1] : r2[1];
  const start = r1[0];
  return [start, end];
}

function solve() {
  const mergedRanges: Range[] = [];

  let stepper = 1;

  for (let index = 0; index < sortedRanges.length; index += stepper) {
    let innerIndex = index;
    const current = sortedRanges[index];
    let merged = current;
    let skipCounter = 0;

    inner: while (true) {
      try {
        merged = mergeRange(merged, sortedRanges[innerIndex + 1]);
        innerIndex++;
        skipCounter++;
      } catch (error) {
        mergedRanges.push(merged);
        stepper = skipCounter + 1;
        break inner;
      }
    }
  }

  return mergedRanges.reduce(
    (acc, hole) => acc + calculateLengthOfRange(hole),
    0
  );
}

console.log(solve());
