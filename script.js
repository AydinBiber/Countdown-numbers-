var bigNumbers = [
    100, 75, 50, 25
];

var littleNumbers = [
    10, 9, 8, 7, 6, 5, 4, 3, 2, 1,
    10, 9, 8, 7, 6, 5, 4, 3, 2, 1
];

var chosenNumbers = Array();

window.onload = function() {
    pickNumbers();
    document.getElementById("target-number").innerText = generateTarget();
}

/*
    Pick 6 numbers from the big numbers and little numbers.
    Right now 2 big ones and 4 little ones are picked. This might change in the future.

    Remove the chosen numbers from their respective arrays and add them to the array of chosen numbers.
*/
function pickNumbers() {
    var firstBig = bigNumbers[Math.floor(Math.random()*bigNumbers.length)];
    var secondBig = bigNumbers[Math.floor(Math.random()*bigNumbers.length)];
    removeFromArrayByValue(bigNumbers, firstBig);
    removeFromArrayByValue(bigNumbers, secondBig);
    chosenNumbers.push(firstBig);
    chosenNumbers.push(secondBig);

    var firstSmall = littleNumbers[Math.floor(Math.random()*littleNumbers.length)];
    var secondSmall = littleNumbers[Math.floor(Math.random()*littleNumbers.length)];
    var thirdSmall = littleNumbers[Math.floor(Math.random()*littleNumbers.length)];
    var fourthSmall = littleNumbers[Math.floor(Math.random()*littleNumbers.length)];
    removeFromArrayByValue(littleNumbers, firstSmall);
    removeFromArrayByValue(littleNumbers, secondSmall);
    removeFromArrayByValue(littleNumbers, thirdSmall);
    removeFromArrayByValue(littleNumbers, fourthSmall);
    chosenNumbers.push(firstSmall);
    chosenNumbers.push(secondSmall);
    chosenNumbers.push(thirdSmall);
    chosenNumbers.push(fourthSmall);
    
    document.getElementById("firstNumber").innerText = chosenNumbers[0];
    document.getElementById("secondNumber").innerText = chosenNumbers[1];
    document.getElementById("thirdNumber").innerText = chosenNumbers[2];
    document.getElementById("fourthNumber").innerText = chosenNumbers[3];
    document.getElementById("fifthNumber").innerText = chosenNumbers[4];
    document.getElementById("sixthNumber").innerText = chosenNumbers[5];
}

/*
    Generate the target value by taking the array of chosen numbers and
    a random selection of a few maths symbols.

    Randomly determine the difficulty by generating an int between 4 and 6, then
    loop over the array of chosen numbers and calculate the target by picking
    a random number, mathematical operation and another number.
*/
function generateTarget() {
    var target = 000;

    // Randomly decide difficulty from 4 to 6 used numbers (4 being the easiest).
    var difficulty = randomIntFromInterval(4, 6);
    
    while(difficulty > 0) {
        var valueA = chosenNumbers[Math.floor(Math.random()*chosenNumbers.length)];
        var valueB = chosenNumbers[Math.floor(Math.random()*chosenNumbers.length)];
        var result = 0;

        var symbol = pickMathSymbol();
        switch(symbol) {
            case '+':
                result = valueA + valueB;
            break;
            case '-':
                result = valueA - valueB;
            break;
            case '*':
                result = valueA * valueB;
            break;
            case '/':
                // Ensure the result does not contain a decimal.
                //result = valueA / valueB;
            break;
        }

        target += result;
        removeFromArrayByValue(chosenNumbers, valueA);
        removeFromArrayByValue(chosenNumbers, valueB);
        chosenNumbers.push(result);

        difficulty--;
    }

    return target;
}

/*
    Pick a random maths symbol from a selection of:
    +, -, *, /
*/
function pickMathSymbol() {
    var i = randomIntFromInterval(1, 4);
    var symbol = '';

    switch(i) {
        case 1:
            symbol = '+';
        break;
        case 2:
            symbol = '-';
        break;
        case 3:
            symbol = '*';
        break;
        case 4:
            symbol = '/';
        break;
        default:
            alert("Error, could not pick symbol.");
        break;
    }

    return symbol;
}

/*
    Remove a single occurance from an array by its value.
*/
function removeFromArrayByValue(array, value) {
    var index = array.indexOf(value);
    if (index > -1) { array.splice(index, 1); }
}

/*
    Get a random integer from between a minimum and maximum value.
*/
function randomIntFromInterval(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}