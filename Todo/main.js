import Todo from "./Todo.js";


let toDos = new Todo("test-1", "task-list");

document.getElementById("add-task").addEventListener("click", toDos.addToDo());
onTouch("#all", toDos.filterList("all"));
onTouch("active", toDos.filterList("active"));
onTouch("completed", toDos.filterList("completed"));