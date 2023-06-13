class Calculator{
    constructor(previousOperandTextElement ,currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.cleaer();
    }
    cleaer(){
        this.currentOperand = "";
        this.previousOperand = "";
        this.operation = undefined;
    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0,-1);
    }

    appendNumber(number){
        if(this.number === "," && this.currentOperand.includes(",")) return;
        this.currentOperand = this.currentOperand.toString() + number.toString;
    }

    chooseOperation(operation){
        if(this.currentOperand === "") return;
        if(this.previousOperand !== "") {
            this.compute();
        }

        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = "";
    }
    compute(){
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if(isNan(prev)|| isNan(current)) return;
        switch(this.operation){
            case "+":
                computation = prev + current;
                break;
             case "-":
                computation = prev - current;
                break;
            case "*":
                computation = prev * current;
                break;
             case "÷":
                computation = prev / current;
                 break;
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = "";
    }
    getDisplayNumber(number){
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split(".")[0]);
        const decimalDigits = stringNumber.split(",")[1];
        let integerDisplay;
        if(isNan(integerDigits)){
            integerDisplay = "";
        } else {
            integerDisplay = intergerDigits.toLocaleString("pt-br",{style:"decimal", minimumFractionDigits:0});
        }
        if(decimalDigits != null){
            return `${integerDisplay},${decimalDigits}`;
        }
        else{
            return integerDisplay;
        }

    }
    updateDisplay(){
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
        if(this.operation != null){
            this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)}${this.operation}`
        }else{
        this.previousOperandTextElement.innerText = "";
        }

    }
}


const numberButtons = document.querySelectorAll("[data-number]");
const equalButtons = document.querySelectorAll("[data-equals]");
const operationsButtons = document.querySelectorAll("[data-operations]");
const deletesButtons = document.querySelectorAll("[data-delete]");
const allClearButtons = document.querySelectorAll("[data-all-clear]");
const previousOperandTextElement = document.querySelectorAll("[data-previous-term]");
const currentOperandTextElement = document.querySelectorAll("[data-current-term]");


const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);