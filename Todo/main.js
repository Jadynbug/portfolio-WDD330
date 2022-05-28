import Todo from "./Todo.js";


let toDos = new Todo("task-list", "test-1");

document.getElementById("add-task").addEventListener("click", toDos.addToDo());
onTouch("#all", toDos.filterList("all"));
onTouch("active", toDos.filterList("active"));
onTouch("completed", toDos.filterList("completed"));