import Todo from "./Todo.js";
import onTouch from "./utilities.js";


window.toDos = new Todo("Task 1", "test-1", "task-list");
//setTimeout(toDos.setup, 1000);



function listen () {
    document.getElementById("addTask").addEventListener("click", window.toDos.addTodo());
    onTouch("all", window.toDos.filterList("all"));
    onTouch("active", window.toDos.filterList("active"));
    onTouch("completed", window.toDos.filterList("completed"));
}

