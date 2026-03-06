const form = document.getElementById('calcForm');
const history = document.getElementById('history');
const ops = {
    "+": (a,b) => a + b,
    "-": (a,b) => a - b,
    "*": (a,b) => a * b,
    "/": (a,b) => {
        if (b === 0) throw new Error("Деление на ноль");
        return a / b;
    }
};

form.onsubmit = (e) => {
    e.preventDefault();
    
    try {
        const num1 = form.elements.num1;
        const num2 = form.elements.num2;
        const op = form.elements.op;
        
        if (num1.value.trim() === "" || num2.value.trim() === "") {
            throw new Error("Оба поля должны быть заполнены!");
        }

        const a = Number(num1.value);
        const b = Number(num2.value);
        const operator = op.value;

        if (Number.isNaN(a) || Number.isNaN(b)) {
            throw new Error("Введите корректные числа");
        }

        const result = ops[operator](a, b);

        const line = document.createElement("div");
        line.textContent = `${a} ${operator} ${b} = ${result}`;
        line.className = "new";

        const currentNew = history.querySelector(".new");
        if(currentNew) currentNew.className = "old";

        history.appendChild(line);

    } catch(e) {
        const errorLine = document.createElement("div");
        errorLine.textContent = `Ошибка: ${e.message}`;
        errorLine.className = "new";
        
        const currentNew = history.querySelector(".new");
        if(currentNew) currentNew.className = "old";
        
        history.appendChild(errorLine);
    }

    while(history.children.length > 3) {
        history.removeChild(history.firstChild);
    }
};