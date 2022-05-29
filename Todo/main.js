import Todo from "./Todo.js";
import onTouch from "./utilities.js";


window.toDos = new Todo("test-1", "task-list");


function listen () {
    document.getElementById("addTask").addEventListener("click", window.toDos.addTodo());
    onTouch("all", window.toDos.doTouch);
    onTouch("active", window.toDos.doTouch);
    onTouch("completed", window.toDos.doTouch);
}

listen();
