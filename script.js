const ops = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  "*": (a, b) => a * b,
  "/": (a, b) => {
    if (b === 0) throw new Error("Division by zero");
    return a / b;
  },
};

document.addEventListener("DOMContentLoaded", () => {
  try {
    const form = document.getElementById("calcForm");
    const history = document.getElementById("history");

    function addToHistory(text, isError = false) {
      const currentNew = history.querySelector(".new");
      if (currentNew) currentNew.className = "old";

      const line = document.createElement("div");
      line.textContent = isError ? `Error: ${text}` : text;
      line.className = "new";

      history.appendChild(line);

      Array.from(history.children)
        .slice(0, -3)
        .forEach((el) => el.remove());
    }

    form.onsubmit = (e) => {
      e.preventDefault();

      try {
        const a = Number(form.elements.num1.value);
        const b = Number(form.elements.num2.value);
        const operator = form.elements.op.value;

        if (isNaN(a) || isNaN(b)) throw new Error("Invalid number");
        if (!ops[operator]) throw new Error(`Unknown operator: ${operator}`);

        addToHistory(`${a} ${operator} ${b} = ${ops[operator](a, b)}`);
      } catch (err) {
        addToHistory(err.message, true);
      }
    };
  } catch (err) {
    console.error("Initialization error:", err);
  }
});
