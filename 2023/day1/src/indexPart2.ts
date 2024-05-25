import { data } from "./input"
const getConfigSum = () => {
    let sum = 0
    for (const config of data) {
        const trackNumbers: number[] = []
        for (let i = 0; i < config.length; i++) {
            if (!isNaN(parseInt(config[i]))) {
                trackNumbers.push(parseInt(config[i]))
            } else {
                const threeLetterNumber = checkIfNumberInText(config[i] + config[i + 1] + config[i + 2])
                const fourLetterNumber = checkIfNumberInText(config[i] + config[i + 1] + config[i + 2] + config[i + 3])
                const fiveLetterNumber = checkIfNumberInText(config[i] + config[i + 1] + config[i + 2] + config[i + 3] + config[i + 4])
                if (typeof threeLetterNumber === 'number') {
                    trackNumbers.push(threeLetterNumber)
                } else if (typeof fourLetterNumber === 'number') {
                    trackNumbers.push(fourLetterNumber)
                } else if (typeof fiveLetterNumber === 'number') {
                    trackNumbers.push(fiveLetterNumber)
                }
            }
        }
        if (trackNumbers.length === 1) {
            sum += parseInt((trackNumbers[0].toString() + trackNumbers[0].toString()))
        } else if (trackNumbers.length === 2) {
            sum += parseInt((trackNumbers[0].toString() + trackNumbers[1].toString()))
        } else if (trackNumbers.length > 2) {
            sum += parseInt((trackNumbers[0].toString() + trackNumbers[trackNumbers.length - 1].toString()))
        }
    }
    console.log(sum)
}
const checkIfNumberInText = (stringOfNumber: string): number | undefined => {
    switch (stringOfNumber) {
        case 'one':return 1
        case 'two':return 2
        case 'three':return 3
        case 'four':return 4
        case 'five':return 5
        case 'six': return 6
        case 'seven':return 7
        case 'eight':return 8
        case 'nine':return 9
        default:return undefined
    }
}
getConfigSum()