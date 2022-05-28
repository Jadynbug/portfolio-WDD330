import readFromLS from "./ls.js";
import writeToLS from "./ls.js";
import onTouch from "./utilities.js";

const toDoList = null;

export default class Todo {
    constructor (task, key="one", ele="task-list") {
        const element = ele;
        const lsKey = key;
        const timestamp = Date.now();
        const content = task;
        const completed = false;
        this.listTodos();
    }
    addTodo () {
        let ele = document.getElementById("input").value;
        saveTodo(ele, this.lsKey);
        this.listTodos();
    }  

    completeTodo () {

    }

    removeTodo() {
        
        console.log("removing");
        this.renderTodoList();
    }
    
    /* foreach todo in list, build a li element for the todo, and append it to element
    @param {array} list The list of tasks to render to HTML @param {element} element The DOM
    element to insert our list elements into.*/
    renderTodoList (list, element) {
        let eleList = "";
        for (i in list) {
            eleList.pust(`<li class="task"><input type="checkbox" class="check"><p>${i.content}</p><button class="remove">X</button></li>`);
        }
        console.log(eleList);
        if (eleList != null) { 
            document.getElementById("task-list").innerHTML = eleList;
        } else {
            console.log("Where's my list?");
        }
        setRemove();        
    }

    listTodos () {
        this.renderTodoList(toDoList, this.element);
    }

    filterList (range) {
        let comp = [];
        let uncomp = [];
        if (range != "all") {
            for (i in toDoList) {
                if (i.completed == false) {
                    uncomp.push(i);
                } else if (i.completed == true) {
                    comp.push(i);
                }
            }
        }
        switch (range) {
            case "all": 
                this.renderTodoList(toDoList, this.element);
                break;
            case "active":
                this.renderTodoList(uncomp, this.element);
                break;
            case "completed": 
                this.renderTodoList(comp, this.element);
                break;
        }
    }
}


/* build a todo object, add it to the todoList, and save the new list to local storage.
@param {string} key The key under which the value is stored under in LS @param {string}
 task The text of the task to be saved.*/
function saveTodo (task=undefined, key) {
    if (task != undefined) {
        let todo = new Todo(task, key);
        toDoList.push(todo);
        console.log('added to todo list');
    }
    console.log(toDoList);
    writeToLS(key, toDoList);
}

/* check the contents of todoList, a local variable containing
 a list of ToDos. If it is null then pull the list of todos from 
 localstorage, update the local variable, and return it
@param {string} key The key under which the value is stored under in 
LS @return {array} The value as an array of objects*/
function getTodo (key) {
    if (toDoList == null) {
        toDoList = readFromLS(key);
        console.log("updated toDoList");
    }
    return toDoList;
}
//set event listeners for the delete task buttons
function setRemove () {
    let buttons = document.getElementsByClassName("remove");
    for (i in buttons) {
        i.addEventListener("touch", toDos.removeTodo());
        i.addEventListener("click", toDos.removeTodo());
    }
}

