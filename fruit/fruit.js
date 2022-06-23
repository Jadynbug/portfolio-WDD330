
let options = [...document.querySelectorAll("#options div")];
let views = [...document.querySelectorAll("#viewBox div")];

class Model {
    constructor() {}
}

class View {
    constructor() {
        this.setupInitListeners();
    }

    seeMe () {
        options.forEach(e => {
            let index = options.findIndex(e);
            let item = views[index];
            if (e.classList.contains("clicked")){
                item.classList.add("seen");
            }
            else {
                item.classList.remove("seen");
            }
        })
    }
    switcher(event) {
        options.forEach(e => {
            if (e.id === event.target.id) {
                document.getElementById(e.id).classList.add("clicked");
            }
            else {
                document.getElementById(e.id).classList.remove("clicked");
            }
        })
        views.forEach(e => {
            if (e.getAttribute("data-name") === event.target.getAttribute("data-name")) {
                document.getElementById(e.id).classList.add("seen");
            }
            else {
                document.getElementById(e.id).classList.remove("seen");
            }
        })
        console.log(this);
    }
    setupInitListeners() {
        options.forEach(e => {e.addEventListener("click", this.switcher)})
    }


}

class Controller {
    constructor(view) {
        this.v = view;

        this.v.setupInitListeners();
    }
}

let start = new Controller(new View);


function readFromLS(key) {
    let seri = localStorage.getItem(key);
    console.log("read from ls");
    if (seri != null) {
        return JSON.parse(seri);
    }
    return [];
}

function writeToLS(key, data) {
    let seri = JSON.stringify(data);
    localStorage.setItem(key, seri);
    console.log("write to ls " + key);
}
