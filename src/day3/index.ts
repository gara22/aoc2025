import { readFile } from "fs/promises";
const file = "input.txt";
const lines = await readFile(`./src/day3/${file}`, {
  encoding: "utf8",
});

const rows = lines.split("\n");

type JoltageRating = {
  originalIndex: number;
  value: string;
  eliminated: boolean;
};

const banks = rows.map((bankStr) =>
  Array.from(bankStr).map((b, i) => ({
    value: b,
    originalIndex: i,
    eliminated: false,
  }))
);

const RESULT_LENGTH = 12;

function bankToValue(bank: JoltageRating[]): string[] {
  return bank.map((b) => b.value);
}

function findLargestJoltage(bank: JoltageRating[]): number {
  const sorted = bank.toSorted((a, b) => +b.value - +a.value);
  const digits: JoltageRating[] = [];

  while (digits.length < RESULT_LENGTH) {
    inner: for (let index = 0; index < sorted.length; index++) {
      const joltage = sorted[index];
      const startIndex = digits[digits.length - 1]?.originalIndex + 1 || 0;
      const endIndex = bank.length - (RESULT_LENGTH - digits.length) + 1;
      const shortenedArray = bankToValue(bank).slice(startIndex, endIndex);

      const shouldPushDigit =
        shortenedArray.includes(joltage.value) && !joltage.eliminated;

      if (shouldPushDigit) {
        for (let i = joltage.originalIndex; i >= 0; i--) {
          bank[i].eliminated = true;
        }
        digits.push(joltage);
        break inner;
      }
    }
  }

  return parseInt(digits.map((j) => j.value).join(""));
}

const result = banks.reduce((acc, bank, i) => {
  const largest = findLargestJoltage(bank);
  // console.log(`largest from ${rows[i]} is ${largest}`);
  return acc + largest;
}, 0);

console.log("end result: " + result);
