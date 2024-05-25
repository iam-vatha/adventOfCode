import * as fs from 'fs';
const txtOfGames = fs.readFileSync('C:\\Coding\\adventOfCode\\2023\\day2\\src\\input.txt', 'utf-8')
const arrOfGames = txtOfGames.split('\r\n')
const constraints = {
    red: 12,
    green: 13,
    blue: 14
}
const checkCubeConundrum = () => {
    let sumOfGameIDs = 0;
    for (let x = 0; x < arrOfGames.length; x++) {
        const splitGameIDAndDicePairs = arrOfGames[x].split(':')
        const splitGameID = splitGameIDAndDicePairs[0].split(' ')
        const gameID = splitGameID[1]
        const splitDicePairs = splitGameIDAndDicePairs[1].split(';')
        let gamePossibility = true;
        for (let j = 0; j < splitDicePairs.length; j++) {
            const pattern = /(\d+)\s*(red|green|blue)/g;
            const dicePair = splitDicePairs[j]
            let match;
            while ((match = pattern.exec(dicePair)) !== null) {
                const number = match[1]
                const color = match[2]
                if (parseInt(number) > constraints[color as keyof typeof constraints]) {
                    gamePossibility = false;
                }
            }
        }
        if (gamePossibility) { 
            sumOfGameIDs += parseInt(gameID)
        }
    }
    console.log(sumOfGameIDs);
}
checkCubeConundrum();