function evalFunction(equationArr) {
    if (equationArr.length < 3) return equationArr[0]; // if no operation return first operand
    let a = equationArr[0];
    let b = equationArr[2];
    switch(equationArr[1]) {
        case "+":
            return a+b;
        case "-":
            return a-b;
        case "÷":
            return a/b;
        case "×":
            return a*b;
    }
}

function updateLower(text) {
    document.querySelector(".lower").textContent = text;
}

function updateUpper(text = "", operator = "") {
    document.querySelector(".upper").textContent = text + operator;
}
// a buffer string for concatenating digits to number
var numberBuffer = "0";
// an internal representation of an equation, i.e. [operand, operator, operand]
var equationArr = [numberBuffer];
var hasDot = false;

document.querySelectorAll("button[data-type=\"num\"]").forEach(elem => {
    elem.addEventListener("click", e => {
        // integer part of the number cannot begin with zero
        if (numberBuffer === "0") numberBuffer = "";
        if(numberBuffer.length < 15) { // limit the length of the number
            numberBuffer = numberBuffer.concat(e.target.textContent);
        }
        // overwrite most rightward operand
        equationArr[equationArr.length - 1] = numberBuffer;
        updateLower(numberBuffer);
   });
});

document.querySelectorAll("button[data-type=\"oprt\"]").forEach(elem => {
    elem.addEventListener("click", e => {
        // clear buffer
        equationArr[equationArr.length - 1] = parseFloat(numberBuffer)
        numberBuffer = "0";
        // truncate equation
        if(equationArr.length == 3) {
            equationArr = [evalFunction(equationArr)];
        }

        hasDot = false;
        equationArr.push(e.target.textContent);
        equationArr.push(numberBuffer);
        updateUpper(equationArr[0], e.target.textContent);
        updateLower(numberBuffer);
   });
});

document.querySelector("#equals").addEventListener("click", e => {
    // clear number buffer, isn't called on subsequent clicks of equals
    if (numberBuffer != "") {
        equationArr[equationArr.length - 1] = parseFloat(numberBuffer);
        numberBuffer = "";
    }
    equationArr[0] = evalFunction(equationArr);
    // the product of the equation can be non-integer
    hasDot = equationArr[0].toString().includes(".");
    updateUpper();
    updateLower(equationArr[0]);
});

document.querySelector("#all-clear").addEventListener("click", e => {
    numberBuffer = "0";
    equationArr = [numberBuffer];
    hasDot = false;
    updateLower(numberBuffer);
    updateUpper();
});

document.querySelector("#clear").addEventListener("click", e => {
    if (numberBuffer.charAt(numberBuffer.length - 1) == ".") hasDot = false;
    // truncate string
    numberBuffer = numberBuffer.substring(0, numberBuffer.length - 1);
    if (numberBuffer.length == 0) numberBuffer = "0";
    equationArr[equationArr.length - 1] = numberBuffer;
    updateLower(numberBuffer);
});

document.querySelector("#dot").addEventListener("click", e => {
    if(!hasDot) {
        numberBuffer = numberBuffer.concat(".");
        hasDot = true;
        updateLower(numberBuffer);
    }
});