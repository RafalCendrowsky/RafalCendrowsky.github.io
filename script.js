function evalEquation(equation) {
    var operatorStack = [];
    var operandStack = [];
    for (index in equation) {
        var char = index.charAt(index);
        if (char.matches("[0-9]+(.[0-9]+)?")) {
            operandStack.push(char);
        } else if (char !== "(") {
            operatorStack.push(char);
        }
    }
}

evalEquation("hello, there");