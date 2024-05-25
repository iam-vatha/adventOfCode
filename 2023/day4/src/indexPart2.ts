import { log } from 'console';
import { data } from './input'

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

const scratchCardTracker = {}

const solveThePuzzle = async () => {
    for (let i = 0; i < data.length; i++) {
        const scratchcard = data[i]
        const numbersSplit = scratchcard.split(':')
        const numbers = numbersSplit[1].split('|')
        const winningNumbersFromScratchcard = await getNumbersFromStringArray(numbers[0])
        const playingNumbersFromScratchcard = await getNumbersFromStringArray(numbers[1])
        const playersWinningNumbers: number[] = []
        for (const number of playingNumbersFromScratchcard) {
            if (winningNumbersFromScratchcard.includes(number)) {
                playersWinningNumbers.push(number)
            }
        }

        scratchCardTracker[i] = {
            winningNumbersFromScratchcard: winningNumbersFromScratchcard,
            playingNumbersFromScratchcard: playingNumbersFromScratchcard,
            playersWinningNumbers: playersWinningNumbers,
            count: 1
        }
    }

    const keys = Object.keys(scratchCardTracker)
    
    for (let i = 0; i < keys.length; i++) {
        for (let j = 1; j < scratchCardTracker[i].playersWinningNumbers.length + 1; j++) {
            scratchCardTracker[i + j].count += scratchCardTracker[i].count
        }
    }

    let totalCountOfCards = 0;

    for (let i = 0; i < keys.length; i++) {
        totalCountOfCards += scratchCardTracker[i].count
    }
    
    console.log(totalCountOfCards);
    
}

solveThePuzzle()

