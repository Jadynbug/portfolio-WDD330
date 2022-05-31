import {readFromLS, writeToLS} from "./ls.js";
import onTouch from "./utilities.js";

const b1 = document.getElementById("all");
const b2 = document.getElementById("active");
const b3 = document.getElementById("completed");

class Todo { 
    constructor (name, completed) {
        this.id = Date.now() + '';
        this.content = name;
        this.completed = completed;
    }
 }

let toDoList = null;

export default class Todos {
    constructor (key="one", name="task-list") {
        this.element = name;
        this.lsKey = key;
        this.listTodos();
    }

    // Callback
    addTodo () {
        let name = document.getElementById("input").value;
        let todo = new Todo(name, false);
        saveTodo(todo, window.toDos.lsKey);
        window.toDos.listTodos();
    }  

    // Callback
    completeTodo () {
        let idStr = String(this.id);
        let id = idStr.substring(this.id, 4);
        console.log("completeTodo() called " + id);
        completeTodo(id, this.checked, window.toDos.lsKey);
        window.toDos.listTodos();
        console.log("completeTodo() called");
    }

    // Callback
    removeTodo() {
        let idStr = String(this.id);
        let id = idStr.substring(this.id, 4);
        console.log("removeTodo() called " + id);
        removeTodo(id, window.toDos.lsKey);
        window.toDos.listTodos();
    }
    
    /* foreach todo in list, build a li element for the todo, and append it to element
    @param {array} list The list of tasks to render to HTML @param {element} element The DOM
    element to insert our list elements into.*/
    renderTodoList (list, element) {
        let eleList = "";
        if (list != []) {
            for (let l in list) {
                let checked = list[l].completed ? 'checked' : '';
                eleList +=`<li class="task"><input type="checkbox" id="chk_${list[l].id}" class="check" ${checked}><p>${list[l].content}</p><button id="rem_${list[l].id}" class="remove">X</button></li>`;
            }
        }
        console.log(eleList);
        document.getElementById(element).innerHTML = eleList;
        if (document.getElementById(element).innerHTML != "") {
            this.setRemove();
        }
    }

    listTodos () {
        console.log(this.element);
        toDoList = getTodo(this.lsKey);
        this.renderTodoList(toDoList, this.element);
    }

    filterList (range) {
        console.log("FilterList(" + range + ")");
        let comp = [];
        let uncomp = [];
        if (range != "all") {
            for (let i in toDoList) {
                if (i.completed == false) {
                    uncomp.push(i);
                } else if (i.completed == true) {
                    comp.push(i);
                }
            }
        }
        b1.classList.remove("clicked");
        b2.classList.remove("clicked");
        b3.classList.remove("clicked");
        switch (range) {
            case "all": 
                this.renderTodoList(toDoList, this.element);
                b1.classList.add("clicked");
                break;
            case "active":
                this.renderTodoList(uncomp, this.element);
                b2.classList.add("clicked");
                break;
            case "completed": 
                this.renderTodoList(comp, this.element);
                b3.classList.add("clicked");
                break;
        }
    }

    setRemove () {
        let r = document.getElementsByClassName("remove");
        console.log(r);
        let buttons = Array.from(r);
        //var arr = [].slice.call(htmlCollection);

        console.log(typeof(buttons));
        //r.foreach((element) => {} );
        for (let i of r) {
            ['touch', 'click'].forEach(e => i.addEventListener(e, this.removeTodo));
        }
    }
}


/* build a todo object, add it to the todoList, and save the new list to local storage.
@param {string} key The key under which the value is stored under in LS @param {string}
 task The text of the task to be saved.*/
function saveTodo (task, key) {
    toDoList = getTodo(key);
    toDoList.push(task);
    console.log('added ' + task.content + ' to todo list ' + toDoList);
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

function removeTodo (id, key) {
    toDoList = getTodo(key);
    let index = toDoList.findIndex(x => {x.id == id});
    toDoList.splice(index, 1);
        
    console.log('removed ' + id + ' from todo list');
    console.log(toDoList);
    writeToLS(key, toDoList);
}

function completeTodo (id, completed, key) {
    toDoList = getTodo(key);
    let index = toDoList.findIndex(x => {x.id == id});
    if (index >= 0) {
        toDoList[index].completed = completed;
        console.log('changed ' + id + ' in todo list');
    } else {
        console.log('Could not find ' + id + ' in todo list');
    }
    console.log(toDoList);
    writeToLS(key, toDoList);
}
