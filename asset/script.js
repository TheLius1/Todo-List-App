const btn = document.querySelector(".round-btn");
const input_todo = document.getElementById("todo-list__text");
const icon = document.getElementById("icon");
const number = document.querySelector(".number");
const allBtn = document.querySelectorAll(".all__category");
const activeBtn = document.querySelectorAll(".active__category");
const completedBtn = document.querySelectorAll(".completed__category");
const clearCompletedBtn = document.querySelector(".clear-completed");
const todoListContainer = document.querySelector(".todoList__container");
const categoryButton = document.querySelectorAll("h4");

const todos = [];
let activeFilter = "all";

const addTodo = function (text) {
  if (activeFilter === "completed") {
    return;
  } else {
    todos.push({ text: text, checked: false });
  }
  itemsLeft();
  displayTodos(activeFilter);
};

const toggleChecked = function (index) {
  todos[index].checked = !todos[index].checked;
  itemsLeft();
  displayTodos(activeFilter);
};

// DISPLAY UI
const displayTodos = (filter = "all") => {
  activeFilter = filter;
  todoListContainer.innerHTML = "";
  todos.forEach((todo, index) => {
    if (
      filter === "all" ||
      (filter === "done" && todo.checked) ||
      (filter === "undone" && !todo.checked)
    ) {
      const html = `<div class="todo-list__row">
<div class="todo-list__btnp">
  <span class="check__btn " onClick="toggleChecked(${index})" style="background: ${
        todo.checked
          ? "linear-gradient(to bottom, #55ddff 0%, #c058f3 100%)"
          : ""
      };">
<img src="/images/icon-check.svg" id="check__icon" class="check__icon " style="${
        todo.checked ? "display: block" : "display: none"
      }" alt="Check Icon"></span>
  <p class="todoText" style="color: ${
    todo.checked ? " var(--marked-state-CLR)" : ""
  }; text-decoration: ${todo.checked ? "line-through" : ""}">${todo.text}</p>
</div>
<img src="/images/icon-cross.svg" class="cancel__icon " alt="Cancel Icon" onClick="removeTodo(${index})">
</div>`;

      todoListContainer.insertAdjacentHTML("afterbegin", html);
    }
  });
};

// BUTTON TO ADD A TEXT TO THE TODOLIST
btn.addEventListener("click", (e) => {
  e.preventDefault();
  input_todo.value === "" ? "" : addTodo(input_todo.value);
  input_todo.value = "";
});

// ADD THE TEXT TO THE TODOLIST WHEN THE EMTER BUTTON IS PRESSED
input_todo.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    input_todo.value === "" ? "" : addTodo(input_todo.value);
    input_todo.value = "";
  }
});

// ALL BUTTON
allBtn.forEach((allButton) =>
  allButton.addEventListener("click", () => displayTodos("all"))
);

// ACTIVE BUTTON
activeBtn.forEach((activeButton) =>
  activeButton.addEventListener("click", () => displayTodos("undone"))
);

// COMPLETED BUTTON;
completedBtn.forEach((completedButton) =>
  completedButton.addEventListener("click", () => displayTodos("done"))
);
// FUNCTION TO REMOVE THE TEXT FROM THE TODOLIST
function removeTodo(index) {
  todos.splice(index, 1);
  itemsLeft();
  displayTodos("all");
}

// FUNCTION TO CALCULATE THE TODOS THAT ARE NOT COMPLETED
const itemsLeft = function () {
  const itemsLefts = todos.reduce((acc, undone) => {
    if (!undone.checked) {
      acc++;
    }
    return acc;
  }, 0);
  number.textContent = itemsLefts;
};

// DELETE THE CHECKED TODOS
clearCompletedBtn.addEventListener("click", () => {
  console.log("checkeds");
  for (let i = todos.length - 1; i >= 0; i--) {
    if (todos[i].checked === true) {
      todos.splice(i, 1);
    }
  }
  itemsLeft();
  displayTodos(activeFilter);
});

// CHANGE THE ACTIVE CLASS BASED ON THE BUTTON CLICKED

categoryButton.forEach((button) =>
  button.addEventListener("click", () => {
    categoryButton.forEach((btn) => btn.classList.remove("active"));

    button.classList.add("active");
  })
);

// THEME
icon.onclick = () => {
  document.body.classList.toggle("light-theme");
  document.body.classList.contains("light-theme")
    ? (icon.src = "/images/icon-moon.svg")
    : (icon.src = "/images/icon-sun.svg");
};
