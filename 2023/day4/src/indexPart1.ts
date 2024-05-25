import { data } from './input'

const dataTable = {
    0: 0,
    1: 1,
    2: 2,
    3: 4,
    4: 8,
    5: 16,
    6: 32,
    7: 64,
    8: 128,
    9: 256,
    10: 512,
    11: 1024,
    12: 2048
}

const getNumbersFromStringArray = async (str: string): Promise<number[]> => {
    return new Promise((resolve, reject) => {
        let numArray: number[] = []
        for (let i = 0; i < str.length; i++) {
            let currentString = "";
            while (!isNaN(parseInt(str[i]))) {
                currentString += str[i]
                i++
            }
            if (currentString.length > 0) {
                let number = parseInt(currentString)
                numArray.push(number)
            }
        }
        resolve(numArray)
    })
}

const solveThePuzzle = async () => {
    let runningTotal = 0;
    for (const card of data) {
        let amountOfWinningNumbers = 0
        const numbersSplit = card.split(':')
        const numbers = numbersSplit[1].split('|')
        const winningNumbers = await getNumbersFromStringArray(numbers[0])
        const playingNumbers = await getNumbersFromStringArray(numbers[1])
        for (const number of playingNumbers) {
            if (winningNumbers.includes(number)) {
                amountOfWinningNumbers++
            }
        }
        runningTotal += dataTable[amountOfWinningNumbers]
    }
    console.log(runningTotal);
    
}

solveThePuzzle();