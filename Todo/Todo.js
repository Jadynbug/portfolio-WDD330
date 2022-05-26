import readFromLS from "./ls.js";
import writeToLS from "./ls.js";
import onTouch from "./utilities.js";

const toDoList = null;

export default class Todo {
    constructor (element, key, task) {
        const element = element;
        const lsKey = key;
        let whatYaGot = {id: Date.now(), content: task, completed: false};
    }
    
}

function saveTodo (task, key) {
    let todo = new Todo();
    toDoList.push(todo);
}
function getTodo (key) {
    if (toDoList == null) {
        toDoList = readFromLS(key);
    }
    return toDoList;
}