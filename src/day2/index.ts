import { readFile } from "fs/promises";
const file = "input.txt";
const lines = await readFile(`./src/day2/${file}`, {
  encoding: "utf8",
});

type Range = [number, number];

const ranges: Range[] = lines.split(",").map((r) => {
  const rangeStr = r.split("-");
  return [Number(rangeStr[0]), Number(rangeStr[1])];
});

function isIdInvalid(id: number) {
  const idStr = id.toString();
  const maxSequenceLength =
    idStr.length % 2 === 0 ? idStr.length / 2 : Math.floor(idStr.length / 2);

  for (let index = 1; index <= maxSequenceLength; index++) {
    if (hasSequence(idStr, index)) return true;
  }
  return false;
}

function hasSequence(word: string, n: number) {
  if (!(word.length % n === 0) && n !== 1) return false;
  const subStringToCheck = word.substring(0, n);
  for (let i = 0; i < word.length; i += n) {
    const subString = word.substring(i, i + n);
    if (subString !== subStringToCheck) return false;
  }
  return true;
}

function calculateInvalidIds(range: Range): number[] {
  const invalidIds = [];
  for (let id = range[0]; id <= range[1]; id++) {
    if (isIdInvalid(id)) invalidIds.push(id);
  }
  // console.log(
  //   `range is ${range}, it has ${invalidIds.length} invalid ids ${invalidIds}`
  // );
  return invalidIds;
}

const badIdCount = ranges.reduce((acc, range) => {
  const sumOfRange = calculateInvalidIds(range).reduce(
    (acc, inv) => acc + inv,
    0
  );
  return acc + sumOfRange;
}, 0);

console.log(badIdCount);
