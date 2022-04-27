"use strict"
class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    };

    clear() {
        this.previousOperand = '';
        this.currentOperand = '';
        this.operator = undefined;
    };

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    };

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString();
    };

    chooseOperator(operator) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operator = operator;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    };

    changeValue() {
        let value = parseFloat(this.currentOperand);
        value = 0 - value;
        this.currentOperand = value;
    }

    compute() {
        let result;
        const pre = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(pre) || isNaN(current)) return
        switch (this.operator) {
            case '+':
                result = pre + current;
                break;
            case '-':
                result = pre - current;
                break;
            case 'x':
                result = pre * current;
                break;
            case '÷':
                result = pre / current;
                break;
            case '%':
                result = pre % current;
                break;
            default:
                return;
        }
        this.currentOperand = result;
        this.operator = undefined;
        this.previousOperand = '';
    };

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.currentOperand;
        if (this.operator != null) {
            this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation}`;
        } else {
            this.previousOperandTextElement.innerText = '';
        }
    }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const deleteButton = document.querySelector('[data-delete]');
const cleanButton = document.querySelector('[data-clean]');
const equalsButton = document.querySelector('[data-equals]');
const changeValueButton = document.querySelector('[data-change-value]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(function(button) {
    button.addEventListener('click', function() {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

operationButtons.forEach(function(button) {
    button.addEventListener('click', function() {
        calculator.chooseOperator(button.innerText);
        calculator.updateDisplay();
    })
})

equalsButton.addEventListener('click', function(button) {
    calculator.compute();
    calculator.updateDisplay();
});

cleanButton.addEventListener('click', function(button) {
    calculator.clear();
    calculator.updateDisplay();
});

deleteButton.addEventListener('click', function(button) {
    calculator.delete();
    calculator.updateDisplay();
});

changeValueButton.addEventListener('click', function(button) {
    calculator.changeValue();
    calculator.updateDisplay();
});