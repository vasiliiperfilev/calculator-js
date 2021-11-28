//current operator and nums
let operator = null;
let num1 = null;
let num2 = null;
//check for recent operations
let isAfterOperation = false;
//display divs
let display = document.querySelector(".secondLine");
let resultDisplay = document.querySelector(".firstLine");

//add event listeners to nums
const numButtons = document.querySelectorAll(".btn.num");
numButtons.forEach(btn => {
    btn.addEventListener('click', displayValue);
})

//add event listener to signs
const operatorButtons = document.querySelectorAll(".btn.operator");
operatorButtons.forEach(btn => {
    btn.addEventListener('click', storeValues);
})

//clear button event
const clearBtn = document.querySelector("input[value = 'Clear']");
clearBtn.addEventListener('click', clearDisplay);

//delete character event
const deleteBtn = document.querySelector("input[value = 'Delete']");
deleteBtn.addEventListener('click', deleteCharacter);

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
        return num2 === 0 ? NaN : divide(num1, num2);
    }
}

//display value
function displayValue(){
    //clear display after operation 
    if(isAfterOperation){
        display.textContent = '';
        isAfterOperation = false;
    }
    //max input length
    if(display.textContent.length === 12){
        return
    }
    //dot insertion
    if (this.value === '.'){
        if (display.textContent.split('').includes('.')){
            return
        } else {
            display.textContent += '.';
        }
    }
    else if (display.textContent === '0'){
        display.textContent = this.value;
    }
    else {
        display.textContent += this.value;
    }
}

function storeValues() {
    //if operator already exist perform evaluation before proceeding
    if (operator !== null) {
        //store for chain operations if not equal opearator and true evaluation
        if (!evaluate() || this.value === '=') return;
    }  
    operator = this.value;
    num1 = Number(display.textContent);
    resultDisplay.textContent = String(num1 + operator);
    isAfterOperation = true;
}

function evaluate() {
    num2 = Number(display.textContent);
    let result = operate(operator, num1, num2);
    //handling division by zero
    if (isNaN(result)) {
        alert("Prohibited operation")
        clearDisplay();
        return false;
    };
    //display result
    resultDisplay.textContent = roundNumber(result);
    display.textContent = roundNumber(result);
    operator = null;
    isAfterOperation = true;
    return result;
}

function roundNumber(num){
    return Math.round(num * 1000) / 1000;
}

function clearDisplay(){
    operator = null;
    num1 = null;
    num2 = null;
    display.textContent = '0';
    resultDisplay.textContent = '';
}

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