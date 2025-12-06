import { readFile } from "fs/promises";
const file = "input.txt";
const lines = await readFile(`./src/day6/${file}`, {
  encoding: "utf8",
});
const rows = lines.split("\n");

const blockLengths = rows[rows.length - 1]
  .split(new RegExp(/\*|\+/))
  .map((q) => q.length)
  .slice(1);

blockLengths[blockLengths.length - 1] =
  blockLengths[blockLengths.length - 1] + 1;

function parseRow(row: string) {
  let innerIndex = 0;

  return blockLengths.map((blockSize, i) => {
    let str: string = "";
    for (let j = innerIndex; j < innerIndex + blockSize; j++) {
      const element = row[j];
      str += element;
    }
    innerIndex += blockSize + 1;
    return str;
  });
}

const parsedRows = rows.map((r) => parseRow(r));

const numberOfRows = parsedRows.length;

function transformColumn(col: string[]): number[] {
  const numArr: number[] = [];
  const digitLength = col[0].length;
  for (let index = 0; index < digitLength; index++) {
    let strDigit = "";
    col.forEach((c, j) => {
      strDigit += c[index];
    });

    numArr.push(parseInt(strDigit));
  }
  return numArr;
}

function calculateColumn(numbers: number[], symbolParam: string) {
  const symbol = symbolParam.trim();
  const initValue = symbol === "*" ? 1 : 0;
  return numbers.reduce((acc, n) => {
    if (symbol.includes("*")) {
      return acc * n;
    }
    return acc + n;
  }, initValue);
}

function solve() {
  return parsedRows[0].reduce((acc, _, i) => {
    const subArray: string[] = [];
    const symbol = parsedRows[numberOfRows - 1][i];
    for (let j = 0; j < numberOfRows - 1; j++) {
      subArray.push(parsedRows[j][i]);
    }
    const transformedColumn = transformColumn(subArray);
    const columnValue = calculateColumn(transformedColumn, symbol);
    // console.log(
    //   `value of column ${transformedColumn}, ${symbol} is ${columnValue}`
    // );
    return acc + columnValue;
  }, 0);
}

console.log(solve());
