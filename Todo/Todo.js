import readFromLS from "./ls.js";
import writeToLS from "./ls.js";
import onTouch from "./utilities.js";

const toDoList = [];

export default class Todo {
    constructor (task, key="one", element="task-list") {
        this.element = element;
        this.lsKey = key;
        this.timestamp = Date.now();
        this.content = task;
        this.completed = false;
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
        if (list != [] || list != undefined) {
            for (let l in list) {
                eleList +=`<li class="task"><input type="checkbox" class="check"><p>${l.content}</p><button class="remove">X</button></li>`;
            }
        } else {
            console.log("problem with rendering list");
        }
        console.log(eleList);
        if (eleList != null) { 
            document.getElementById(this.element).innerHTML = eleList;
        } else {
            console.log("Where's my list?");
        }
        if (document.getElementById(this.element).innerHTML != "") {
            this.setRemove();
        }
    }

    listTodos () {
        console.log(this.element);
        this.renderTodoList(toDoList, this.element);
        console.log("listing todos");
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

    setRemove () {
        let buttons = document.getElementsByClassName("remove");
        for (let b in buttons) {
            b.addEventListener("click", this.removeTodo());
            b.addEventListener("touch", this.removeTodo());
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
//help