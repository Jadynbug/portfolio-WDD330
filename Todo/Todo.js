import readFromLS from "./ls.js";
import writeToLS from "./ls.js";
import onTouch from "./utilities.js";

const b1 = document.getElementById("all");
const b2 = document.getElementById("active");
const b3 = document.getElementById("completed");

class Todo { 
    constructor (name, completed) {
        this.id = Date.now();
        this.content = name;
        this.completed = completed;
    }
 }

let toDoList = null;

export default class Todos {
    constructor (key="one", element="task-list") {
        this.element = element;
        this.lsKey = key;
        this.listTodos();
    }

    addTodo () {
        let name = document.getElementById("input").value;
        let todo = new Todo(name, false);
        saveTodo(todo, this.lsKey);
        this.listTodos();
    }  

    completeTodo () {
        console.log("completeTodo() called");
    }

    removeTodo() {
        console.log("removeTodo() called");
        
        this.renderTodoList();
    }
    
    /* foreach todo in list, build a li element for the todo, and append it to element
    @param {array} list The list of tasks to render to HTML @param {element} element The DOM
    element to insert our list elements into.*/
    renderTodoList (list, element) {
        let eleList = "";
        if (list != []) {
            for (let l in list) {
                eleList +=`<li class="task"><input type="checkbox" class="check"><p>${l.content}</p><button class="remove">X</button></li>`;
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

    doTouch (ev) {
        filterList(ev.target.id);
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
                b2=classList.add("clicked");
                break;
            case "completed": 
                this.renderTodoList(comp, this.element);
                b2.classList.add("clicked");
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
            ['touch', 'click'].forEach(e => i.addEventListener(e, this.removeTodo()));
        }
    }

    setup () {
        document.getElementById("addTask").addEventListener("click", this.addTodo());
        onTouch("all", this.filterList("all"));
        onTouch("active", this.filterList("active"));
        onTouch("completed", this.filterList("completed"));
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
    index = toDoList.findIndex(x => {x.id == id});
    toDoList.splice(index, 1);
        
    console.log('removed ' + id + ' from todo list');
    console.log(toDoList);
    writeToLS(key, toDoList);
}

function completeTodo (id, completed, key) {
    toDoList = getTodo(key);
    index = toDoList.findIndex(x => {x.id == id});
    if (index >= 0) {
        toDoList[index].completed = completed;
        console.log('changed ' + id + ' in todo list');
    } else {
        console.log('Could not find ' + id + ' in todo list');
    }
    console.log(toDoList);
    writeToLS(key, toDoList);
}
