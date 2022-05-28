import Todo from "./Todo.js";


let toDos = new Todo("task-list", "test-1");

document.getElementById("add-task").addEventListener("click", toDos.addToDo());