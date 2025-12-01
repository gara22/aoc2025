import { readFile } from "fs/promises";
const file = "input.txt";
const lines = await readFile(`./src/day1/${file}`, {
  encoding: "utf8",
});

const inputs = lines.split("\n");

const rotations = inputs.map((r, i) => {
  const valueStr = r.slice(1);
  return {
    index: i + 1,
    direction: r[0],
    value:
      valueStr.length > 2
        ? parseInt(valueStr.slice(valueStr.length - 2, valueStr.length))
        : parseInt(valueStr),
  };
});

type Rotation = (typeof rotations)[number];

// console.log(rotations);

const startPosition = 50;

let index = 0;
let zeroCount = 0;

function dial(start: number): number {
  if (index === rotations.length) {
    return start;
  }

  const rotation = rotations[index];

  const nextPosition = calculateNextPosition(start, rotation);
  // console.log(
  //   `start postition was ${start}, we rotate ${
  //     rotation.direction + rotation.value
  //   } NEXT position is ${nextPosition}`
  // );
  index++;

  if (nextPosition === 0) {
    zeroCount++;
  }

  return dial(nextPosition);
}

function calculateNextPosition(start: number, rotation: Rotation): number {
  if (rotation.direction === "R") {
    const value = start + rotation.value;
    return value >= 100 ? Math.abs(100 - value) : value;
  }
  if (rotation.direction === "L") {
    const value = start - rotation.value;

    return value < 0 ? 100 - Math.abs(value) : value;
  }

  throw Error("bad input");
}

dial(startPosition);

console.log(zeroCount);
