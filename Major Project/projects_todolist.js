// === GLOBAL STATE ===
let todos = [];
let currentFilter = "all"; // 'all', 'active', 'completed'

let mainElement = document.querySelector("main");
let formElement = document.querySelector("#todo-form");
let inputElement = document.querySelector("#todo-input");
let addTodoElement = document.querySelector(".add-btn");
let filterButtons = document.querySelectorAll(".filter-btn");
let todoList = document.querySelector(".todo-list");
const clearButton = document.querySelector(".clear-btn");

// === STORAGE HELPERS ===
function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function loadTodos() {
  const saved = localStorage.getItem("todos");
  todos = saved ? JSON.parse(saved) : [];
}

// === FORMAT DATE ===
function formatDate() {
  const today = Date.now();
  const dateObject = new Date(today);
  const year = dateObject.getFullYear();
  const month = String(dateObject.getMonth() + 1).padStart(2, "0");
  const day = String(dateObject.getDate()).padStart(2, "0");
  const hours = String(dateObject.getHours()).padStart(2, "0");
  const minutes = String(dateObject.getMinutes()).padStart(2, "0");
  const seconds = String(dateObject.getSeconds()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}


// === RENDER TODOS ===
function renderTodos() {
  todoList.innerHTML = "";

  todos.forEach((todo) => {
    const liItem = document.createElement("li");
    liItem.classList.add("todo-item");
    liItem.dataset.id = todo.id;
    liItem.setAttribute("data-filter", todo.completed ? "completed" : "active");
    if (todo.completed) liItem.classList.add("completed");

    // Checkbox
    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.classList.add("todo-checkbox");
    checkBox.checked = todo.completed;
    checkBox.addEventListener("change", () => {
      todo.completed = checkBox.checked;
      liItem.setAttribute(
        "data-filter",
        todo.completed ? "completed" : "active"
      );
      liItem.classList.toggle("completed", todo.completed);
      saveTodos();
      updateTodoCounter();
    });
    liItem.appendChild(checkBox);

    // Text
    const todoText = document.createElement("span");
    todoText.classList.add("todo-text");
    todoText.textContent = todo.text;
    todoText.addEventListener("click", editTodoText);
    liItem.appendChild(todoText);

    // Buttons
    const buttonsDiv = document.createElement("div");
    buttonsDiv.classList.add("todo-actions");

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.classList.add("edit-btn");
    editButton.addEventListener("click", editTodo);
    buttonsDiv.appendChild(editButton);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-btn");
    deleteButton.addEventListener("click", deleteTodo);
    buttonsDiv.appendChild(deleteButton);

    liItem.appendChild(buttonsDiv);
    todoList.appendChild(liItem);
  });

  updateTodoCounter();
}

// === ADD TODO ===
formElement.addEventListener("submit", (e) => {
  e.preventDefault();
  addTodo();
});

function addTodo() {
  const newTodo = inputElement.value.trim();

  if (newTodo.length >= 3) {
    const todoItem = {
      id: Date.now(),
      text: newTodo,
      completed: false,
      createdAt: formatDate(),
    };

    todos.push(todoItem);
    saveTodos();
    renderTodos();

    inputElement.value = "";
  } else {
    console.log("Your to do item must be at least 3 characters.");
  }
}

// === EDIT (button) ===
function editTodo(event) {
  const editButton = event.target;
  const listItem = editButton.closest(".todo-item");
  const id = Number(listItem.dataset.id);
  const todo = todos.find((t) => t.id === id);

  if (editButton.textContent === "Edit") {
    const input = document.createElement("input");
    input.type = "text";
    input.value = todo.text;
    input.classList.add("todo-edit-input");

    const spanText = listItem.querySelector("span.todo-text");
    listItem.replaceChild(input, spanText);

    editButton.textContent = "Save";

    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        todo.text = input.value.trim();
        saveTodos();
        renderTodos();
      }
    });
  } else {
    const input = listItem.querySelector(".todo-edit-input");
    todo.text = input.value.trim();
    saveTodos();
    renderTodos();
  }
}

// === EDIT (click text) ===
function editTodoText(event) {
  const span = event.target;
  const listItem = span.closest(".todo-item");
  const id = Number(listItem.dataset.id);
  const todo = todos.find((t) => t.id === id);

  const input = document.createElement("input");
  input.type = "text";
  input.value = todo.text;
  input.classList.add("todo-edit-input");
  const editButton = document.querySelector(".edit-btn");
  editButton.textContent = 'Save';

  span.replaceWith(input);
  input.focus();

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      todo.text = input.value.trim();
      saveTodos();
      renderTodos();
    }
  });
}

// === DELETE ===
function deleteTodo(event) {
  const listItem = event.target.closest(".todo-item");
  const id = Number(listItem.dataset.id);

  todos = todos.filter((t) => t.id !== id);
  saveTodos();
  renderTodos();
}

// === CLEAR COMPLETED ===
clearButton.addEventListener("click", clearCompletedTodos);

function clearCompletedTodos() {
  todos = todos.filter((t) => !t.completed);
  saveTodos();
  renderTodos();
}

// === FILTERS ===
filterButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const dataToggle = button.getAttribute("data-toggle");
    currentFilter = dataToggle;

    let activeButton = document.querySelector(".active");
    if (activeButton) {
      activeButton.classList.remove("active");
    }
    this.classList.add("active");

    document.querySelectorAll(".todo-item").forEach((task) => {
      const dataFilter = task.getAttribute("data-filter");
      if (currentFilter === "all" || dataFilter === currentFilter) {
        task.style.display = "flex";
      } else {
        task.style.display = "none";
      }
    });
  });
});

// === COUNTER ===
function updateTodoCounter() {
  const remainingItems = todos.filter((t) => !t.completed).length;
  const totalItems = todos.length;
  const counter = document.querySelector("#todo-count");
  counter.textContent =
    totalItems === 0
      ? "0 items remaining"
      : `${remainingItems} of ${totalItems} item${
          totalItems !== 1 ? "s" : ""
        } remaining`;
}

// === INIT ===
window.addEventListener("DOMContentLoaded", () => {
  loadTodos();
  renderTodos();
});
