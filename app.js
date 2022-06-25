const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');

// Calculate first and secon values depending on operator
const calculate = {
   '/': (firstNumber, secondNumber) => firstNumber / secondNumber,
   '*': (firstNumber, secondNumber) => firstNumber * secondNumber,
   '+': (firstNumber, secondNumber) => firstNumber + secondNumber,
   '-': (firstNumber, secondNumber) => firstNumber - secondNumber,
   '=': (firstNumber, secondNumber) => secondNumber,
}

let firstValue = 0;
let operatorValue = '';
let awaitingNextValue = false;

function sendNumberValue(number) {
   // replace current display value if first value is entered
   if (awaitingNextValue) {
      calculatorDisplay.textContent = number;
      awaitingNextValue = false;
   } else {
      // if current display value is 0, replace it, if not add number
      calculatorDisplay.textContent = calculatorDisplay.textContent === '0' ? number : calculatorDisplay.textContent += number;

   }
}

function addDecimal() {
   // if operator pressed, don't add decimal
   if (awaitingNextValue) return;
   // if no decimal , add one
   if (!calculatorDisplay.textContent.includes('.')) {
      calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
   }
}

function useOperator(operator) {
   const currentValue = Number(calculatorDisplay.textContent);
   // Prevent multiple operators
   if (operatorValue && awaitingNextValue) {
      operatorValue = operator;
      return
   }
   // Asign firstvalue if no value
   if (!firstValue) {
      firstValue = currentValue;
   } else {
      const calculation = calculate[operatorValue](firstValue, currentValue);
      calculatorDisplay.textContent = calculation;
      firstValue = calculation;
   }
   // ready for next value, store operator
   awaitingNextValue = true;
   operatorValue = operator;
}

// Reset all values, display
function resetAll() {
   calculatorDisplay.textContent = '0';
   firstValue = 0;
   operatorValue = '';
   awaitingNextValue = false;
}

// Add event listeners for numbers, operators, decimal buttons
inputBtns.forEach((inputBtn) => {
   if (inputBtn.classList.length === 0) {
      inputBtn.addEventListener('click', () => sendNumberValue(inputBtn.value))
   } else if (inputBtn.classList.contains('operator')) {
      inputBtn.addEventListener('click', () => useOperator(inputBtn.value))
   } else if (inputBtn.classList.contains('decimal')) {
      inputBtn.addEventListener('click', addDecimal)
   }
})
// Event listener
clearBtn.addEventListener('click', resetAll); 