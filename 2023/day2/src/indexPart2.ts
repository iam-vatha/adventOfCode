import * as fs from 'fs';
const txtOfGames = fs.readFileSync('C:\\Coding\\adventOfCode\\2023\\day2\\src\\input.txt', 'utf-8')
const arrOfGames = txtOfGames.split('\r\n')
const checkCubeConundrum = () => {
    let sumOfGamePowers = 0;
    for (let x = 0; x < arrOfGames.length; x++) {
        const splitGameIDAndDicePairs = arrOfGames[x].split(':')
        const splitDicePairs = splitGameIDAndDicePairs[1].split(';')
        let highestGreen = 1;
        let highestRed = 1;
        let highestBlue = 1;
        for (let j = 0; j < splitDicePairs.length; j++) {
            const pattern = /(\d+)\s*(red|green|blue)/g;
            const dicePair = splitDicePairs[j]
            let match;
            while ((match = pattern.exec(dicePair)) !== null) {
                const number = match[1]
                const color = match[2]
                if (color === 'red' && parseInt(number) > highestRed) {
                    highestRed = parseInt(number);
                } else if (color === 'blue' && parseInt(number) > highestBlue) {
                    highestBlue = parseInt(number)
                } else if (color === 'green' && parseInt(number) > highestGreen) {
                    highestGreen = parseInt(number)
                }
            }
        }
        let power = highestBlue * highestGreen * highestRed
        sumOfGamePowers += power;
    }
    console.log(sumOfGamePowers);
}
checkCubeConundrum();