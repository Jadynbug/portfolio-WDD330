import Todo from "./Todo.js";
import onTouch from "./utilities.js";


let toDos = new Todo("Task 1", "test-1", "task-list");

function clicker (range) {
    toDos.filterList(range);
}

document.getElementById("addTask").addEventListener("onClick", toDos.addTodo());
onTouch("all", toDos.filterList("all"));
onTouch("active", toDos.filterList("active"));
onTouch("completed", toDos.filterList("completed"));