import { data, sample } from './input'

function waitFiveSeconds() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('Done waiting for 5 seconds');
        }, 500);
    });
}

const solveThePuzzle = async () => {
    let sumOfAllNumbers = 0;
    for (let j = 0; j < data.length; j++) {
        console.log(`Row ${j + 1}`)
        const prevLine = data[j - 1] ? data[j - 1] : undefined;
        const currentLine = data[j];
        const nextLine = data[j + 1] ? data[j + 1] : undefined;
        for (let i = 0; i < data[j].length; i++) {
            let prevSpot = i - 1;
            let currentSpot = i;
            let nextSpot = i + 1;
            //create a box around the iterator to find adjacent numbers
            const topLeft = prevLine ? prevLine[prevSpot] ? prevLine[prevSpot] : undefined : undefined
            const topMiddle = prevLine ? prevLine[currentSpot] ? prevLine[currentSpot] : undefined : undefined
            const topRight = prevLine ? prevLine[nextSpot] ? prevLine[nextSpot] : undefined : undefined
            const midLeft = currentLine[prevSpot] ? currentLine[prevSpot] : undefined
            const center = currentLine[currentSpot]
            const midRight = currentLine[nextSpot] ? currentLine[nextSpot] : undefined
            const bottomLeft = nextLine ? nextLine[prevSpot] ? nextLine[prevSpot] : undefined : undefined
            const bottomMiddle = nextLine ? nextLine[currentSpot] ? nextLine[currentSpot] : undefined : undefined
            const bottomRight = nextLine ? nextLine[nextSpot] ? nextLine[nextSpot] : undefined : undefined

            const topArr = [topLeft, topMiddle, topRight]
            const midArr = [midLeft, center, midRight]
            const botArr = [bottomLeft, bottomMiddle, bottomRight]

            const listOfNumsAroundIterator = [topLeft, topMiddle, topRight, midLeft, midRight, bottomLeft, bottomMiddle, bottomRight]

            if (isNaN(parseInt(center)) && center !== ".") {
                const listOfNumbers: number[] = [];
                //top row possibilities
                    // 1 1 1
                if (topLeft && !isNaN(parseInt(topLeft)) && topMiddle && !isNaN(parseInt(topMiddle)) && topRight && !isNaN(parseInt(topRight))) {
                    let number = parseInt(topLeft + topMiddle + topRight)
                    listOfNumbers.push(number)
                    // 1 1 0
                } else if (topLeft && !isNaN(parseInt(topLeft)) && topMiddle && !isNaN(parseInt(topMiddle)) && topRight && isNaN(parseInt(topRight))) {
                    if (prevLine && !isNaN(parseInt(prevLine[i - 2]))) {
                        let number = parseInt(prevLine[i - 2] + topLeft + topMiddle)
                        listOfNumbers.push(number)
                    } else {
                        let number = parseInt(topLeft + topMiddle)
                        listOfNumbers.push(number)
                    }
                    // 1 0 0
                } else if (topLeft && !isNaN(parseInt(topLeft)) && topMiddle && isNaN(parseInt(topMiddle)) && topRight && isNaN(parseInt(topRight))) {
                    if (prevLine && !isNaN(parseInt(prevLine[i - 2]))) {
                        if (!isNaN(parseInt(prevLine[i - 3]))) {
                            let number = parseInt(prevLine[i - 3] + prevLine[i - 2] + topLeft)
                            listOfNumbers.push(number)
                        } else {
                            let number = parseInt(prevLine[i - 2] + topLeft)
                            listOfNumbers.push(number)
                        }
                    } else {
                        let number = parseInt(topLeft)
                        listOfNumbers.push(number)
                    }
                    // 1 0 1
                } else if (topLeft && !isNaN(parseInt(topLeft)) && topMiddle && isNaN(parseInt(topMiddle)) && topRight && !isNaN(parseInt(topRight))) {
                    if (prevLine && !isNaN(parseInt(prevLine[i - 2]))) {
                        if (!isNaN(parseInt(prevLine[i - 3]))) {
                            let number = parseInt(prevLine[i - 3] + prevLine[i - 2] + topLeft)
                            listOfNumbers.push(number)
                        } else {
                            let number = parseInt(prevLine[i - 2] + topLeft)
                            listOfNumbers.push(number)
                        }
                    } else {
                        let number = parseInt(topLeft)
                        listOfNumbers.push(number)
                    }

                    if (prevLine && !isNaN(parseInt(prevLine[i + 2]))) {
                        if (!isNaN(parseInt(prevLine[i + 3]))) {
                            let number = parseInt(topRight + prevLine[i + 2] + prevLine[i + 3])
                            listOfNumbers.push(number)
                        } else {
                            let number = parseInt(topRight + prevLine[i + 2])
                            listOfNumbers.push(number)
                        }
                    } else {
                        let number = parseInt(topRight)
                        listOfNumbers.push(number)
                    }
                    // 0 0 1
                } else if (topLeft && isNaN(parseInt(topLeft)) && topMiddle && isNaN(parseInt(topMiddle)) && topRight && !isNaN(parseInt(topRight))) {
                    if (prevLine && !isNaN(parseInt(prevLine[i + 2]))) {
                        if (!isNaN(parseInt(prevLine[i + 3]))) {
                            let number = parseInt(topRight + prevLine[i + 2] + prevLine[i + 3])
                            listOfNumbers.push(number)
                        } else {
                            let number = parseInt(topRight + prevLine[i + 2])
                            listOfNumbers.push(number)
                        }
                    } else {
                        let number = parseInt(topRight)
                        listOfNumbers.push(number)
                    }
                    // 0 1 1
                } else if (topLeft && isNaN(parseInt(topLeft)) && topMiddle && !isNaN(parseInt(topMiddle)) && topRight && !isNaN(parseInt(topRight))) {
                    if (prevLine && prevLine[i + 2]) {
                        if (!isNaN(parseInt(prevLine[i + 2]))) {
                            let number = parseInt(topMiddle + topRight + prevLine[i + 2])
                            listOfNumbers.push(number)
                        } else {
                            let number = parseInt(topMiddle + topRight)
                            listOfNumbers.push(number)
                        }
                    }
                    // 0 1 0
                } else if (topLeft && isNaN(parseInt(topLeft)) && topMiddle && !isNaN(parseInt(topMiddle)) && topRight && isNaN(parseInt(topRight))) {
                    let number = parseInt(topMiddle)
                    listOfNumbers.push(number)
                }

                //middle row possibilities
                // 1 1
                if (midLeft && !isNaN(parseInt(midLeft)) && midRight && !isNaN(parseInt(midRight))) {
                    if (currentLine[i - 2] && !isNaN(parseInt(currentLine[i - 2]))) {
                        if (currentLine[i - 3] && !isNaN(parseInt(currentLine[i - 3]))) {
                            let number = parseInt(currentLine[i - 3] + currentLine[i - 2] + midLeft)
                            listOfNumbers.push(number)
                        } else {
                            let number = parseInt(currentLine[i - 2] + midLeft)
                            listOfNumbers.push(number)
                        }
                    } else {
                        let number = parseInt(midLeft)
                        listOfNumbers.push(number)
                    }

                    if (currentLine[i + 2] && !isNaN(parseInt(currentLine[i + 2]))) {
                        if (currentLine[i + 3] && !isNaN(parseInt(currentLine[i + 3]))) {
                            console.log("mid with two to the right")
                            let number = parseInt(midRight + currentLine[i + 2] + currentLine[i + 3])
                            listOfNumbers.push(number)
                        } else {
                            let number = parseInt(midRight + currentLine[i + 2])
                            listOfNumbers.push(number)
                        }
                    } else {
                        let number = parseInt(midRight)
                        listOfNumbers.push(number)
                    }
                } else if (midLeft && !isNaN(parseInt(midLeft)) && midRight && isNaN(parseInt(midRight))) {
                    if (currentLine[i - 2] && !isNaN(parseInt(currentLine[i - 2]))) {
                        if (currentLine[i - 3] && parseInt(currentLine[i - 3])) {
                            let number = parseInt(currentLine[i - 3] + currentLine[i - 2] + midLeft)
                            listOfNumbers.push(number)
                        } else {
                            let number = parseInt(currentLine[i - 2] + midLeft)
                            listOfNumbers.push(number)
                        }
                    } else {
                        let number = parseInt(midLeft)
                        listOfNumbers.push(number)
                    }
                } else if (midLeft && isNaN(parseInt(midLeft)) && midRight && !isNaN(parseInt(midRight))) {
                    if (currentLine[i + 2] && !isNaN(parseInt(currentLine[i + 2]))) {
                        if (currentLine[i + 3] && !isNaN(parseInt(currentLine[i + 3]))) {
                            let number = parseInt(midRight + currentLine[i + 2] + currentLine[i + 3])
                            listOfNumbers.push(number)
                        } else {
                            let number = parseInt(midRight + currentLine[i + 2])
                            listOfNumbers.push(number)
                        }
                    } else {
                        let number = parseInt(midRight)
                        listOfNumbers.push(number)
                    }
                }

                //bottom possibilities
                // 1 1 1
                if (bottomLeft && !isNaN(parseInt(bottomLeft)) && bottomMiddle && !isNaN(parseInt(bottomMiddle)) && bottomRight && !isNaN(parseInt(bottomRight))) { 
                    let number = parseInt(bottomLeft + bottomMiddle + bottomRight)
                    listOfNumbers.push(number)
                    // 1 1 0
                } else if (bottomLeft && !isNaN(parseInt(bottomLeft)) && bottomMiddle && !isNaN(parseInt(bottomMiddle)) && bottomRight && isNaN(parseInt(bottomRight))) {
                    if (nextLine && !isNaN(parseInt(nextLine[i - 2]))) {
                        let number = parseInt(nextLine[i - 2] + bottomLeft + bottomMiddle)
                        listOfNumbers.push(number)
                    } else {
                        let number = parseInt(bottomLeft + bottomMiddle)
                        listOfNumbers.push(number)
                    }
                    // 1 0 0
                } else if (bottomLeft && !isNaN(parseInt(bottomLeft)) && bottomMiddle && isNaN(parseInt(bottomMiddle)) && bottomRight && isNaN(parseInt(bottomRight))) {
                    if (nextLine && !isNaN(parseInt(nextLine[i - 2]))) {
                        if (!isNaN(parseInt(nextLine[i - 3]))) {
                            let number = parseInt(nextLine[i - 3] + nextLine[i - 2] + bottomLeft)
                            listOfNumbers.push(number)
                        } else {
                            let number = parseInt(nextLine[i - 2] + bottomLeft)
                            listOfNumbers.push(number)
                        }
                    } else {
                        let number = parseInt(bottomLeft)
                        listOfNumbers.push(number)
                    }
                    // 1 0 1
                } else if (bottomLeft && !isNaN(parseInt(bottomLeft)) && bottomMiddle && isNaN(parseInt(bottomMiddle)) && bottomRight && !isNaN(parseInt(bottomRight))) {
                    if (nextLine && !isNaN(parseInt(nextLine[i - 2]))) {
                        if (!isNaN(parseInt(nextLine[i - 3]))) {
                            let number = parseInt(nextLine[i - 3] + nextLine[i - 2] + bottomLeft)
                            listOfNumbers.push(number)
                        } else {
                            let number = parseInt(nextLine[i - 2] + bottomLeft)
                            listOfNumbers.push(number)
                        }
                    } else {
                        let number = parseInt(bottomLeft)
                        listOfNumbers.push(number)
                    }

                    if (nextLine && !isNaN(parseInt(nextLine[i + 2]))) {
                        if (!isNaN(parseInt(nextLine[i + 3]))) {
                            let number = parseInt(bottomRight + nextLine[i + 2] + nextLine[i + 3])
                            listOfNumbers.push(number)
                        } else {
                            let number = parseInt(bottomRight + nextLine[i + 2])
                            listOfNumbers.push(number)
                        }
                    } else {
                        let number = parseInt(bottomRight)
                        listOfNumbers.push(number)
                    }
                    // 0 0 1
                } else if (bottomLeft && isNaN(parseInt(bottomLeft)) && bottomMiddle && isNaN(parseInt(bottomMiddle)) && bottomRight && !isNaN(parseInt(bottomRight))) {
                    if (nextLine && !isNaN(parseInt(nextLine[i + 2]))) {
                        if (!isNaN(parseInt(nextLine[i + 3]))) {
                            let number = parseInt(bottomRight + nextLine[i + 2] + nextLine[i + 3])
                            listOfNumbers.push(number)
                        } else {
                            let number = parseInt(bottomRight + nextLine[i + 2])
                            listOfNumbers.push(number)
                        }
                    } else {
                        let number = parseInt(bottomRight)
                        listOfNumbers.push(number)
                    }
                    // 0 1 1
                } else if (bottomLeft && isNaN(parseInt(bottomLeft)) && bottomMiddle && !isNaN(parseInt(bottomMiddle)) && bottomRight && !isNaN(parseInt(bottomRight))) {
                    if (nextLine && nextLine[i + 2]) {
                        if (!isNaN(parseInt(nextLine[i + 2]))) {
                            let number = parseInt(bottomMiddle + bottomRight + nextLine[i + 2])
                            listOfNumbers.push(number)
                        } else {
                            let number = parseInt(bottomMiddle + bottomRight)
                            listOfNumbers.push(number)
                        }
                    }
                } else if (bottomLeft && isNaN(parseInt(bottomLeft)) && bottomMiddle && !isNaN(parseInt(bottomMiddle)) && bottomRight && isNaN(parseInt(bottomRight))) {
                    let number = parseInt(bottomMiddle)
                    listOfNumbers.push(number)
                }
                if (listOfNumbers.length > 0) {
                    console.log(listOfNumbers);
                    for (const num of listOfNumbers) {
                        sumOfAllNumbers += num;
                        //await waitFiveSeconds();
                    }
                }
            }
        }
        console.log(sumOfAllNumbers)
    }
}

solveThePuzzle();