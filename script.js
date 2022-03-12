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

function display() {
    document.querySelector(".display").textContent = equationArr.join("");
}

document.querySelectorAll("button[data-type=\"num\"]").forEach(elem => {
    elem.addEventListener("click", e => {
        if (numberBuffer === "0") numberBuffer = "";
        numberBuffer = numberBuffer.concat(e.target.textContent);
        equationArr[equationArr.length - 1] = numberBuffer;
        console.log(equationArr);
        display();
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
        console.log(equationArr);
        display();
   });
});

document.querySelector("#equals").addEventListener("click", e => {
    equationArr[equationArr.length - 1] = parseFloat(numberBuffer);
    numberBuffer = "";
    equationArr = [evalFunction(equationArr)];
    equationArr.concat(numberBuffer);
    console.log(equationArr);
    display();
});