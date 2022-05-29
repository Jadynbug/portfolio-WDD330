import Todo from "./Todo.js";
import onTouch from "./utilities.js";


self.toDos = new Todo("Task 1", "test-1", "task-list");
//setTimeout(toDos.setup, 1000);



function listen () {
    document.getElementById("addTask").addEventListener("click", self.toDos.addTodo());
    onTouch("all", self.toDos.filterList("all"));
    onTouch("active", self.toDos.filterList("active"));
    onTouch("completed", self.toDos.filterList("completed"));
}

