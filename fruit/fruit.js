
let options = [...document.querySelectorAll("#options div")];
let views = [...document.querySelectorAll("#viewBox div.container")];
let listOBerries1 = [];
let listOBerries2 = [];
let bowlOBerries = [];

class Model {
    constructor(name, fullname, size, smoothness) {
        this.name = name;
        this.fullName = fullname;
        this.size = size,
        this.smoothness = smoothness;
    }
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
    renderLister (array) {
        let content;
        array.forEach(element => {
            let mess = `<li class="berry" name="${element.url}">${element.name}<button class="details">Details</button><button class="add">Add to berry bowl</button></li>`
            content += mess;
            console.log(mess);
        });
        return content;
    }
    setBtnListeners () {
        let buttons = [...document.querySelector("button")];
        buttons.forEach((button) => {
            if (button.classList.contains("detals-btn")) {
                button.addEventListener("click", () => {
                    console.log("details, details");
                })
            }
            if (button.classList.contains("add")) {
                button.addEventListener("click", () => {
                    console.log("adding, adding");
                })
            }
        })
    }
    render() {
        let filter = document.querySelector('.clicked').id;
        if (filter == "lister") {
            let stuff = this.renderLister(listOBerries2);
            document.querySelector("#lister ul").innerHTML = stuff;
        }
        if (filter == "searcher") {
            console.log("preping searcher");
        }
        if (filter == "bowler") {
            console.log("preparing bowler");
        }
        this.setBtnListeners();        
    }
    switcher(event) {
        options.forEach(e => {
            let element = document.getElementById(e.id);
            if (element.id === event.target.id) {
                element.classList.add("clicked");
            }
            else {
                element.classList.remove("clicked");
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
    }
    setupInitListeners() {
        options.forEach(e => {e.addEventListener("click", this.switcher)});
    }


}

class Controller {
    constructor(view) {
        this.v = view;
        

        this.v.setupInitListeners();
        this.fetchIt("https://pokeapi.co/api/v2/berry?limit=10000&offset=0");
    }

    fetchIt (r) {
        fetch(r)
            .then(response => response.json())
            .then(myJson => {
                listOBerries1 = myJson.results;
                listOBerries1.forEach((berry) => {
                    fetch(berry.url).then(response => response.json())
                    .then(myJson => {
                        let item = new Model(myJson.name, myJson.item.name, myJson.size, myJson.smoothness);
                        listOBerries2.push(item);
                    })
                })
                console.log(listOBerries2);                
            });
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
