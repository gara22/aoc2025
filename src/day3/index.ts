import { readFile } from "fs/promises";
const file = "input.txt";
const lines = await readFile(`./src/day3/${file}`, {
  encoding: "utf8",
});

const rows = lines.split("\n");

type JoltageRating = {
  originalIndex: number;
  value: string;
};

const banks = rows.map((bankStr) =>
  Array.from(bankStr).map((b, i) => ({ originalIndex: i, value: b }))
);

function findLargestJoltage(bank: JoltageRating[]): number {
  const sorted = bank.toSorted((a, b) => +b.value - +a.value);
  let [first, second] = [sorted[0], sorted[1]];
  if (first.originalIndex < second.originalIndex) {
    return parseInt(first.value + second.value);
  }

  if (first.originalIndex === bank.length - 1) {
    first = second;
  }

  const arrayAfterLargest = bank.slice(first.originalIndex + 1);
  const largestInRest = arrayAfterLargest.toSorted(
    (a, b) => +b.value - +a.value
  )[0];

  return parseInt(first.value + largestInRest.value);
}

const result = banks.reduce((acc, bank, i) => {
  const largest = findLargestJoltage(bank);
  // console.log(`largest from ${rows[i]} is ${largest}`);
  return acc + largest;
}, 0);

console.log(result);
