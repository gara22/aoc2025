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
  const idString = id.toString();
  if (idString.length % 2 === 1) return false; // TODO: this could be optimized to not even evaluate odd length ids
  const halfPoint = idString.length / 2;
  const [firstHalf, secondHalf] = [
    idString.slice(0, halfPoint),
    idString.slice(halfPoint),
  ];

  return firstHalf === secondHalf;
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
