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
const availableIngredients = rows.slice(splitIndex + 1).map((r) => parseInt(r));

function isInRange(n: number, range: Range) {
  return n >= range[0] && n <= range[1];
}

function solve() {
  let res = 0;
  for (const ingredient of availableIngredients) {
    inner: for (const range of ranges) {
      if (isInRange(ingredient, range)) {
        // console.log(`ingredient ${ingredient} is in ${range}`);
        res++;
        break inner;
      }
    }
  }
  return res;
}

console.log(solve());
