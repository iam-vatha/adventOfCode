import { data } from './input';
let total = 0;

for (let str of data) {
    let runningNumber = 0;
    let firstNum = "";
    let secondNum = "";
    for (let char of str) {
        if (firstNum.length === 0) {
            if (parseInt(char)) {
                firstNum = char;
            }
        }
        if (parseInt(char)) {
            secondNum = char;
        }
    }
    if (parseInt(firstNum) && parseInt(secondNum)) {
        total += parseInt(firstNum + secondNum)
    } else {
        total += parseInt(firstNum + firstNum)
    }
}

console.log(total)