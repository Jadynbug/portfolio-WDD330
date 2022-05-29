import Todo from "./Todo.js";
import onTouch from "./utilities.js";


let toDos = new Todo("Task 1", "test-1", "task-list");

document.getElementById("addTask").addEventListener("click", toDos.addTodo());
onTouch("all", toDos.filterList("all"));
onTouch("active", toDos.filterList("active"));
onTouch("completed", toDos.filterList("completed"));