function getElementOrThrow(id) {
  const element = document.getElementById(id);
  if (!element) {
    throw new Error(`Element with id "${id}" does not exist`);
  }
  return element;
}

function getFormFieldOrThrow(form, name) {
  const field = form.elements[name];
  if (!field) {
    throw new Error(`Form field "${name}" does not exist`);
  }
  return field;
}

const form = getElementOrThrow("calcForm");
const history = getElementOrThrow("history");

const ops = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  "*": (a, b) => a * b,
  "/": (a, b) => {
    if (b === 0) throw new Error("Division by zero");
    return a / b;
  },
};

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
    const a = Number(getFormFieldOrThrow(form, "num1").value);
    const b = Number(getFormFieldOrThrow(form, "num2").value);
    const operator = getFormFieldOrThrow(form, "op").value;

    if (isNaN(a) || isNaN(b)) throw new Error("Invalid number");
    if (!ops[operator]) throw new Error(`Unknown operator: ${operator}`);

    addToHistory(`${a} ${operator} ${b} = ${ops[operator](a, b)}`);
  } catch (err) {
    addToHistory(err.message, true);
  }
};
