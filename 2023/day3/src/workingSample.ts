import * as fs from "fs";

const lines: string[] = fs.readFileSync("C:\\Coding\\adventOfCode\\2023\\day3\\src\\input.txt", "utf-8").split("\n");
let numbersList = getNumbers();

let count = 0;
countValidNumbers(numbersList);

console.log(count);

function getNumbers() {
  let numbersList: Number[] = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const numberPattern = /\d+/g;
    let match;
    while ((match = numberPattern.exec(line)) !== null) {
      const foundItem: Number = {
        number: parseInt(match[0]),
        start: match.index,
        end: match.index + match[0].length,
        line,
        lineNumber: i,
      };
      numbersList.push(foundItem);
    }
  }
  return numbersList;
}

function countValidNumbers(numbersList: Number[]) {
  for (const number of numbersList) {
    const currentLine = number.line;

    let previousLine;
    if (number.lineNumber === 0) {
      previousLine = null;
    } else {
      previousLine = lines[number.lineNumber - 1];
    }

    let nextLine;
    if (number.lineNumber === lines.length - 1) {
      nextLine = null;
    } else {
      nextLine = lines[number.lineNumber + 1];
    }

    // check same line symbols
    if (
      (number.start > 0 && isSymbol(currentLine[number.start - 1])) ||
      isSymbol(currentLine[number.end])
    ) {
      count += number.number;
      continue;
    }
    //check above and below line symbols
    for (let i = number.start - 1; i <= number.end; i++) {
      if (i >= currentLine.length || i < 0) {
        continue;
      }
      if (
        (previousLine !== null && isSymbol(previousLine[i])) ||
        (nextLine !== null && isSymbol(nextLine[i]))
      ) {
        count += number.number;
        break;
      }
    }
  }
}

function isSymbol(char: string) {
  if (char.match(/\d/) || char === "." || char === "\r") {
    return false;
  }
  return true;
}

type Number = {
  number: number;
  start: number;
  end: number;
  line: string;
  lineNumber: number;
};