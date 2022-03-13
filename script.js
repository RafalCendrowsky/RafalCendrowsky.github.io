function evalFunction(equationArr) {
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
var numberBuffer = "0";
var equationArr = [numberBuffer];

function updateLower(text) {
    document.querySelector(".lower").textContent = text;
}

function updateUpper(text = "", operator = "") {
    document.querySelector(".upper").textContent = text + operator;
}

document.querySelectorAll("button[data-type=\"num\"]").forEach(elem => {
    elem.addEventListener("click", e => {
        if (numberBuffer === "0") numberBuffer = "";
        if(numberBuffer.length < 15) {
            numberBuffer = numberBuffer.concat(e.target.textContent);
        }
        equationArr[equationArr.length - 1] = numberBuffer;
        updateLower(numberBuffer);
   });
});

document.querySelectorAll("button[data-type=\"oprt\"]").forEach(elem => {
    elem.addEventListener("click", e => {
        if(numberBuffer !== "") equationArr[equationArr.length - 1] = parseFloat(numberBuffer)
        if(equationArr.length >= 3) {
            equationArr = [evalFunction(equationArr)];
        }
        numberBuffer = "";
        equationArr.push(e.target.textContent);
        equationArr.push(numberBuffer);
        updateUpper(equationArr[0], e.target.textContent);
        updateLower(numberBuffer);
   });
});

document.querySelector("#equals").addEventListener("click", e => {
    equationArr[equationArr.length - 1] = parseFloat(numberBuffer);
    numberBuffer = "";
    equationArr = [evalFunction(equationArr)];
    equationArr.concat(numberBuffer);
    updateUpper();
    updateLower(equationArr[0]);
});

document.querySelector("#all-clear").addEventListener("click", e => {
    numberBuffer = "0";
    equationArr = [numberBuffer];
    updateLower(numberBuffer);
    updateUpper();
});

document.querySelector("#clear").addEventListener("click", e => {
    numberBuffer = numberBuffer.substring(0, numberBuffer.length - 1);
    equationArr[equationArr.length - 1] = numberBuffer;
    updateLower(numberBuffer);
});