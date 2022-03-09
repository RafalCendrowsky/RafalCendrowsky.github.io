function evalEquation(equationArr) {
    var operatorStack = [];
    var operandStack = [];
    equationArr.push(")");
    equationArr.forEach(element => {
        if (typeof element === "number") {
            operandStack.push(element);
        } else if (element === ")") {
            let operator = operatorStack.pop();
            let b = operandStack.pop();
            let a = operandStack.pop();
            operandStack.push(evalFunction(a, b, operator));
        } else if (element !== "(") {
            operatorStack.push(element);
        }
    });
    return operandStack[0];
}

function evalFunction(a, b, operator) {
    if(a === undefined) {
        return b;
    }
    switch (operator) {
        case "+":
            return a+b;
        case "-":
            return a-b;
        case "×":
            return a*b;
        case "÷":
            return a/b;
    }
}

console.log(evalEquation(["(", 12, "÷", 16, ")"]));