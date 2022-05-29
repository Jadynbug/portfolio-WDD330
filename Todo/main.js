import Todo from "./Todo.js";
import onTouch from "./utilities.js";


window.toDos = new Todo("test-1", "task-list");


function listen () {
    document.getElementById("addTask").addEventListener("click", window.toDos.addTodo);
    onTouch("all", doTouch);
    onTouch("active", doTouch);
    onTouch("completed", doTouch);
}

function doTouch (ev) {
    window.toDos.filterList(ev.target.id);
}


listen();
