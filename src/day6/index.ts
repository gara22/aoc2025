import { readFile } from "fs/promises";
const file = "input.txt";
const lines = await readFile(`./src/day6/${file}`, {
  encoding: "utf8",
});
const rows = lines.split("\n");

const input = rows.map((r) => {
  return r
    .split(" ")
    .map((el) => el.trim())
    .filter((f) => f !== "");
});

const numberOfRows = input.length;

function calculateColumn(numbers: number[], symbol: string) {
  const initValue = symbol === "*" ? 1 : 0;
  return numbers.reduce((acc, n) => {
    if (symbol === "*") {
      return acc * n;
    }
    return acc + n;
  }, initValue);
}

function solve() {
  return input[0].reduce((acc, _, i) => {
    const subArray: number[] = [];

    const symbol = input[numberOfRows - 1][i];
    for (let j = 0; j < numberOfRows - 1; j++) {
      subArray.push(parseInt(input[j][i]));
    }
    const columnValue = calculateColumn(subArray, symbol);
    // console.log(`value of column ${subArray}, ${symbol} is ${columnValue}`);
    return acc + columnValue;
  }, 0);
}

console.log(solve());
