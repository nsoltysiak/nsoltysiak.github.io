// Takes in a number and updates the readonly display input
function updateDisplay(value) {
  const display = document.getElementById("display");
  display.value = String(parseFloat(value));
}

// Gets the value from the readonly display input
// Returns a number
// Doesn't need to be used but can help you verify
// the current value on the display
function getDisplay() {
  const display = document.getElementById("display");
  //parseFloat changes the string into a number we can use
  return display.value;
}

//Set up display to show zero when starting
updateDisplay(0);

console.log("Initial value of display: ", getDisplay());

let firstOperand = null;
let operator = null;
let shouldResetDisplay = false;
let displayValue = "0";
let numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
let operators = ["+", "-", "*", "/"];

/**
 * Main input handler called from HTML buttons
 * This function receives ALL button clicks and routes them to the appropriate handler
 * @param {string} input - The input value from button clicks
 */
function handleInput(input) {
  console.log(`Button clicked: ${input}`);
  if (numbers.includes(input)) {
    handleNumber(input);
  } else if (operators.includes(input)) {
    handleOperator(input);
  } else if (input === ".") {
    handleDecimal();
  } else if (input === "CE") {
    displayValue = "0";
  } else if (input === "C") {
    resetCalculator();
  } else if (input === "=") {
    executeOperation();
  }
  updateDisplay(displayValue);
}

function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  if (num2 === 0) {
    console.error("Cannot divide by 0");
    return "Cannot divide by 0";
  } else {
    return num1 / num2;
  }
}

/**
 * Handles number input (0-9)
 * @param {string} number - The number that was clicked
 */
function handleNumber(number) {

  // This is handling the second number input after an operator is hit (strings)
  if (shouldResetDisplay) {
    displayValue = number;
    shouldResetDisplay = false;
  }
  // This is handling the first number input (all strings)
  else {
    displayValue = displayValue === "0" ? number : displayValue + number;
  }
}

/**
 * Handles decimal point input
 */
function handleDecimal() {
  if (!displayValue.includes(".")) {
    displayValue += ".";
  }
}

/**
 * Handles operator input (+, -, *, /)
 * @param {string} nextOperator - The operator that was clicked
 */
function handleOperator(nextOperator) {
  if (firstOperand === null) {
    firstOperand = parseFloat(displayValue);
  }
  operator = nextOperator;
  shouldResetDisplay = true;
}

/**
 * Executes the calculation when = is pressed
 */
function executeOperation() {
  if (operator === null || firstOperand === null) {
    return;
  }
  let secondOperand = parseFloat(displayValue);
  let result = 0;

  switch (operator) {
    case "+":
      result = add(firstOperand, secondOperand);
      break;
    case "-":
      result = subtract(firstOperand, secondOperand);
      break;
    case "*":
      result = multiply(firstOperand, secondOperand);
      break;
    case "/":
      result = divide(firstOperand, secondOperand);
      break;
    default:
      return "Incorrect operation";
  }
  firstOperand = result;
  displayValue = result.toString();
  operator = null;
  shouldResetDisplay = true;
}

/**
 * Resets the calculator (C button)
 */
function resetCalculator() {
  firstOperand = null;
  operator = null;
  shouldResetDisplay = false;
  displayValue = "0";
}
