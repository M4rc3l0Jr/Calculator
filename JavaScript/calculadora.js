const previusOperantionText = document.querySelector("#previous-operantions");
const currentOperantionText = document.querySelector("#current-operantions");
const historyOperantionText = document.querySelector("#historico");
const buttons = document.querySelectorAll("#button-container button");

class Calculator {
    constructor(previusOperantionText, currentOperantionText, historyOperantionText) {
        this.previusOperantionText = previusOperantionText;
        this.currentOperantionText = currentOperantionText;
        this.historyOperantionText = historyOperantionText;
        this.currentOperantion = "";
    }

    addDigit(digit){
        if(digit === "." && currentOperantionText.innerText.includes(".")){
            return;
        }
        this.currentOperantion = digit;
        this.updateScreen();
    }

    processOperantion(operantion){
        if(this.currentOperantionText.innerText === "" && operantion !== "C"){
            if(this.previusOperantionText.innerText !== ""){
                this.changeOperantion(operantion);
            }
            return;
        }

        let operantionValue;
        const previous = +this.previusOperantionText.innerText.split(" ")[0];
        const current = +this.currentOperantionText.innerText;
        const x = 0;

        switch(operantion) {
            case "+":
                operantionValue = previous + current;
                this.updateScreen(operantionValue, operantion, current, previous);
                break;
            case "-":
                operantionValue = previous - current;
                this.updateScreen(operantionValue, operantion, current, previous);
                break;
            case "x":
                operantionValue = previous * current;
                this.updateScreen(operantionValue, operantion, current, previous);
                break;
            case "/":
                operantionValue = previous / current;
                this.updateScreen(operantionValue, operantion, current, previous);
                break;
            case "DEL":
                this.processDelOperat();
                break;
            case "CE":
                this.processClearCurrentOperat();
                break;
            case "C":
                this.processClearOperat();
                break;
            case "=":
                this.processEqualOperat();
                break;
            default:
                return; 
        }
    }

    updateScreen(operantionValue = null, operantion = null, current = null, previous = null) {
            if(operantionValue === null) {
                var lastValue = this.historyOperantionText.innerText.split(" ");
                var last = lastValue.at(-1)
                if(this.currentOperantionText.innerText === last){
                    this.currentOperantionText.innerText = ""
                }
                this.currentOperantionText.innerText += this.currentOperantion;
            } else {
                if(previous === 0){
                    operantionValue = current;
                }
                
                this.previusOperantionText.innerText = `${operantionValue} ${operantion}`;
                this.currentOperantionText.innerText = "";
            }
    }

    changeOperantion(operantion){

        const mathOperantion = ["x", "/", "+", "-"];

        if(!mathOperantion.includes(operantion)){
            return;
        }
        this.previusOperantionText.innerText = this.previusOperantionText.innerText.slice(0, -1) + operantion;
    }

    processDelOperat(){
        this.currentOperantionText.innerText = this.currentOperantionText.innerText.slice(0, -1);
    }   

    processClearCurrentOperat(){
        this.currentOperantionText.innerText = "";
    }

    processClearOperat(){
        this.currentOperantionText.innerText = "";
        this.previusOperantionText.innerText = "";
    }

    processEqualOperat(){

        const previousValue = previusOperantionText.innerText.split(" ")[0];
        const operantion = previusOperantionText.innerText.split(" ")[1];
        const currentValue = currentOperantionText.innerText;
        let operantionValue;

        switch(operantion){
            case "+":
                operantionValue = parseInt(previousValue) + parseInt(currentValue);
                this.updadeHistory(operantionValue, previousValue, currentValue, operantion);
                this.currentOperantionText.innerText = operantionValue;
                this.previusOperantionText.innerText = "";
                break;
            case "-":
                operantionValue = parseInt(previousValue) - parseInt(currentValue);
                this.updadeHistory(operantionValue, previousValue, currentValue, operantion)
                this.currentOperantionText.innerText = operantionValue;
                this.previusOperantionText.innerText = "";
                break;
            case "x":
                operantionValue = previousValue * currentValue;
                this.updadeHistory(operantionValue, previousValue, currentValue, operantion)
                this.currentOperantionText.innerText = operantionValue;
                this.previusOperantionText.innerText = "";
                break;
            case "/":
                operantionValue = previousValue / currentValue;
                this.updadeHistory(operantionValue, previousValue, currentValue, operantion)
                this.currentOperantionText.innerText = operantionValue;
                this.previusOperantionText.innerText = "";
                break;
            default:
                return;
        }
    }

    updadeHistory(operantionValue, previousValue, currentValue, operantion){
        const lastOperantion = (`${previousValue} ${operantion} ${currentValue}`)
        const historyValue = operantionValue;
        if(this.historyOperantionText.innerText === ""){
            this.historyOperantionText.innerText = lastOperantion + "\n = " + `${operantionValue}` 
        } else {
            this.historyOperantionText.innerText = this.historyOperantionText.innerText + "\n\n" + lastOperantion + "\n = " + `${operantionValue}`
        }
    }

}

const calc = new Calculator(previusOperantionText, currentOperantionText, historyOperantionText);

buttons.forEach((btn) => {
    btn.addEventListener("click", (e) =>{
        const value = e.target.innerText;

        if(+value >= 0 || value == "."){
            calc.addDigit(value);
        }else {
            calc.processOperantion(value);
        }
    });
});
