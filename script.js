//basic functions

function add(num1, num2){
    return num1 + num2;
}

function substract(num1, num2){
    return num1 - num2;
}

function multiply(num1, num2){
    return num1 * num2;
}

function divide(num1, num2){
    if (num2 == 0){
        return "Zero division";
    }
    else {
        return num1 / num2;
    }
}


//perform operation
function operate(operator, num1, num2){
    if (operator === '+'){
        return add(num1, num2);
    }
    else if (operator === '-') {
        return substract(num1, num2);
    }
    else if (operator === '×'){
        return multiply(num1, num2)
    }
    else if(operator === '÷') {
        return divide(num1, num2);
    }
}

//add event listeners to nums
const numButtons = document.querySelectorAll(".btn.num");
numButtons.forEach(btn => {
    btn.addEventListener('click', displayValue);
})

//check for recent operations
let isAfterOperation = false;

//display divs
let display = document.querySelector(".secondLine");
let resultDisplay = document.querySelector(".firstLine");

//display value
function displayValue(){
    //clear display after operation 
    if(isAfterOperation){
        display.textContent = '';
        isAfterOperation = false;
    }
    if(display.textContent.length === 12){
        return
    }
    else if (this.value === '.'){
        if (display.textContent.split('').includes('.')){
            return
        } else {
            display.textContent += '.';
        }
    }
    else if (display.textContent === '0' || display.textContent === 'NaN'){
        display.textContent = this.value;
    }
    else {
        display.textContent += this.value;
    }
}

//add event listener to signs
const operatorButtons = document.querySelectorAll(".btn.operator");
operatorButtons.forEach(btn => {
    btn.addEventListener('click', storeValues);
})

//current operator and nums
let operator = null;
let num1 = null;
let num2 = null;

//when operator pressed
function storeValues(){
    //if operator was choosen before and there are two values: assigned and entered to display
    if (operator !== null && num1 !== null && display.textContent !== ''){
        //store num2
        num2 = Number(display.textContent);
        //perform calculations
        let result = operate(operator, num1, num2);
        //rounding for decimals
        let stringResult = String(Math.round(result * 100000) / 100000);
        //check bool value to switch input mode in displayValue()
        isAfterOperation = true;
        //if operator called is '=' or result is NaN or infinity change values to default
        if (this.value === '=' || stringResult === 'NaN' || stringResult === Infinity){
            operator = null;
            num1 = null;
            num2 = null;
            display.textContent = stringResult;
            resultDisplay.textContent = '';
        }
        //else assign new operator, result is num1, display and wait for the num2
        else {
            operator = this.value;
            resultDisplay.textContent = String(stringResult + operator);
            num1 = result;
            num2 = result;
            display.textContent = stringResult;
        }
    }
    //if it is first operator and num1 is not assigned and exclude equal operation
    else if (operator === null && num1 === null && this.value !== '='){
        //if previous result displayed NaN do nothing
        if (display.textContent === 'NaN') return;
        operator = this.value;
        num1 = Number(display.textContent);
        num2 = Number(display.textContent);
        isAfterOperation = true;
        resultDisplay.textContent = String(num1 + operator);
    }
    //if num1 left after previous equal operation
    else if (operator === null && this.value !== '='){
        operator = this.value;
        resultDisplay.textContent += operator;
    }

}

//clear button event
const clearBtn = document.querySelector("input[value = 'Clear']");
clearBtn.addEventListener('click', clearDisplay);

function clearDisplay(){
    operator = null;
    num1 = null;
    num2 = null;
    display.textContent = '0';
    resultDisplay.textContent = '';
}

//delete character event
const deleteBtn = document.querySelector("input[value = 'Delete']");
deleteBtn.addEventListener('click', deleteCharacter);

function deleteCharacter(){
    let input = display.textContent;
    if (!Number(input) || input == 'Infinity'){
        display.textContent = '0';
    }
    else if (input.length > 1){
        display.textContent = input.slice(0, display.textContent.length - 1);
    }
    else if (input.length === 1){
        display.textContent = '0';
    }
}