const num1 = document.getElementById("num1");
const num2 = document.getElementById("num2");
const op = document.getElementById("op");
const btn = document.getElementById("calc");
const history = document.getElementById("history");

const ops = {
    "+": (a,b) => a + b,
    "-": (a,b) => a - b,
    "*": (a,b) => a * b,
    "/": (a,b) => {
        if (b === 0) throw new Error("Деление на ноль");
        return a / b;
    }
};

btn.onclick = () => {
    try {

        if (num1.value.trim() === "" || num2.value.trim() === "") {
            throw new Error("Оба поля должны быть заполнены!");
        }

        let a = Number(num1.value);
        let b = Number(num2.value);
        let operator = op.value;

        if (Number.isNaN(a) || Number.isNaN(b)) {
            throw new Error("Введите корректные числа");
        }

        if (!Object.hasOwn(ops, operator)) {
            throw new Error("Неизвестная операция");
        }

        let result = ops[operator](a,b);

        const line = document.createElement("div");
        line.textContent = `${a} ${operator} ${b} = ${result}`;
        line.className = "new";

        const currentNew = history.querySelector(".new");
        if(currentNew) currentNew.className = "old";

        history.appendChild(line);

        while(history.children.length > 3){
            history.removeChild(history.firstChild);
        }

    } catch(e) {
        alert(e.message);
    }
};