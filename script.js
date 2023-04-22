// initialize variables
let firstNumber = "";
let operator = "";
let secondNumber = "";

// helper function to update display
function updateDisplay(value) {
  const display = document.querySelector(".display");
  display.textContent = value;
}

// helper function to clear calculator
function clearCalculator() {
  firstNumber = "";
  operator = "";
  secondNumber = "";
  updateDisplay("0");
}

// basic math functions
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    return "Error: Division by zero";
  }
  return a / b;
}

// perform calculation
function calculate() {
  let result;
  const num1 = parseFloat(firstNumber);
  const num2 = parseFloat(secondNumber);

  switch (operator) {
    case "+":
      result = add(num1, num2);
      break;
    case "-":
      result = subtract(num1, num2);
      break;
    case "*":
      result = multiply(num1, num2);
      break;
    case "/":
      result = divide(num1, num2);
      break;
    default:
      break;
  }

  updateDisplay(result.toString());

  // reset variables
  firstNumber = result.toString();
  operator = "";
  secondNumber = "";
}

// clear one digit function

function clearOneDigit() {
  const display = document.querySelector(".display");
  let currentValue = display.textContent;
  if (currentValue.length === 1) {
    currentValue = "0";
  } else {
    currentValue = currentValue.slice(0, -1);
  }
  updateDisplay(currentValue);

  if (operator === "") {
    firstNumber = currentValue;
  } else {
    secondNumber = currentValue;
  }
}

// add event listeners to buttons

// add event listeners to buttons
const buttons = document.querySelectorAll("button");
buttons.forEach(function (button) {
  button.addEventListener("click", function () {
    const value = button.getAttribute("value");

    // number button
    if (!isNaN(value)) {
      if (operator === "") {
        firstNumber += value;
        updateDisplay(firstNumber);
      } else {
        secondNumber += value;
        updateDisplay(secondNumber);
      }
    }

    // decimal button
    if (value === ".") {
      if (operator === "") {
        if (!firstNumber.includes(".")) {
          firstNumber += ".";
          updateDisplay(firstNumber);
        }
      } else {
        if (!secondNumber.includes(".")) {
          secondNumber += ".";
          updateDisplay(secondNumber);
        }
      }
    }

    // operator button
    if (value === "+" || value === "-" || value === "*" || value === "/") {
      if (operator === "") {
        operator = value;
      } else {
        calculate();
        operator = value;
      }
    }

    // equals button
    if (value === "=") {
      if (operator !== "" && secondNumber !== "") {
        calculate();
      }
    }

    // clear button
    if (value === "clear") {
      clearCalculator();
    }
    if (value === "clear-one") {
      clearOneDigit();
    }
  });
});
