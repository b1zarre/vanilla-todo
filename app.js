//Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);
//Functions
function addTodo(e) {
  event.preventDefault();
  //todo Div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  //create new li
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);
  //adding new todo to localStorage
  saveTodosLocally(todoInput.value);
  //check mark button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = "<i class= 'fas fa-check'></i>";
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);
  //check trash button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = "<i class= 'fas fa-trash'></i>";
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);
  //appending to list
  todoList.appendChild(todoDiv);
  todoInput.value = "";
}
function deleteCheck(e) {
  const item = e.target;
  const todo = item.parentElement;
  //delete todo
  if (item.classList[0] === "trash-btn") {
    if (todo.classList[1] === "completed") {
      todo.classList.toggle("completed");
    }
    removeLocalTodos(todo);
    todo.classList.add("removed");
    setTimeout(() => {
      todo.remove();
    }, 500);
  }

  if (item.classList[0] === "complete-btn") {
    // const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach((todo) => {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function saveTodosLocally(todo) {
  //checking if we have smth in localstorage already
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach((todo) => {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    const completedButton = document.createElement("button");
    completedButton.innerHTML = "<i class= 'fas fa-check'></i>";
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    const trashButton = document.createElement("button");
    trashButton.innerHTML = "<i class= 'fas fa-trash'></i>";
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    todoList.appendChild(todoDiv);
  });
}
const removeLocalTodos = (todo) => {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
};
