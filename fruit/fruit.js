
let options = [...document.querySelectorAll("#options div")];
let views = [...document.querySelectorAll("#viewBox div.container")];
let listOBerries1 = [];
let listOBerries2 = [];
let searchOBerries = [];
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

    setLister () {
        let stuff = renderLister(listOBerries2);
        document.querySelector("#lister ul").innerHTML = stuff;
        let btnsD = document.querySelectorAll("#lister .details");
        //needs more stuff!!!
        let btnsA = document.querySelectorAll("#lister .add");
        btnsD.forEach((e) => {
            e.addEventListener("click", () => {
                let name = e.parentNode.getAttribute("name");
                console.log(name);
                let n = document.querySelector(`.${name}`);
                n.classList.toggle("see-flex");
                n.classList.toggle("no-see-flex");
                console.log(n, n.classList);
            })
        })
    }

    setSearcher () {
        let e = document.getElementById("searching");
        e.addEventListener("click", searchIt);
        console.log(e);
        let stuff = renderSearcher(searchOBerries);
        console.log(stuff);
        if (stuff != undefined) {
            document.querySelector("#searcher ul").innerHTML = stuff;
        }
        let btnsD = document.querySelectorAll("#searcher .details");
        //needs more stuff!!!
        let btnsA = document.querySelectorAll("#searcher .add");
        btnsD.forEach((e) => {
            e.addEventListener("click", () => {
                let name = e.parentNode.getAttribute("name");
                console.log(name);
                let n = document.querySelector(`.${name}`);
                n.classList.toggle("see-flex");
                n.classList.toggle("no-see-flex");
                console.log(n, n.classList);
            })
        })
        
    }

    
    render() {
        let filter = document.querySelector(".seen").id;
        if (filter == "lister") {
            this.setLister();
        }
        if (filter == "searcher") {
            console.log("preping searcher");
            this.setSearcher();
        }
        if (filter == "bowler") {
            console.log("preparing bowler");
        }
        console.log("rendering");
    }
    switcher(event) {
        let v = new View;
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
        v.render();
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

function renderLister () {
    let content;
    listOBerries2.forEach(element => {
        let mess = `<li class="berry" name="${element.name}"><h2>${element.name}</h2>
            <button class="details round">Details</button><button class="add round">
            Add to berry bowl</button>
            <div class="details-div ${element.name} no-see-flex">
            <h3>${element.fullName}</h3>
            <p>Size: ${element.size}</p>
            <p>Smoothness: ${element.smoothness}</p>
            </div></li>`
        content += mess;
    });
    let content2 = content.slice(9, -1);
    return content2;
}
function renderSearcher () {
    let content;
    if (searchOBerries.length > 0 && searchOBerries != undefined) {
        searchOBerries.forEach(element => {
        let mess = `<li class="berry" name="${element.name}"><h2>${element.name}</h2>
            <button class="details round">Details</button><button class="add round">
            Add to berry bowl</button>
            <div class="details-div ${element.name} no-see-flex">
            <h3>${element.fullName}</h3>
            <p>Size: ${element.size}</p>
            <p>Smoothness: ${element.smoothness}</p>
            </div></li>`
        content += mess;
        });
    } else {
        console.log("no search here")
    }
    if (content != undefined) {
        let content2 = content.slice(9, -1);
        return content2;
    }
}
function renderBowler () {
    //need fixing
    let content;
    listOBerries2.forEach(element => {
        let mess = `<li class="berry" name="${element.name}"><h2>${element.name}</h2>
            <button class="details round">Details</button><button class="add round">
            Add to berry bowl</button>
            <div class="details-div ${element.name} no-see-flex">
            <h3>${element.fullName}</h3>
            <p>Size: ${element.size}</p>
            <p>Smoothness: ${element.smoothness}</p>
            </div></li>`
        content += mess;
        console.log(mess);
    });
    return content;
}
function searchIt () {
    console.log("searching, searching");
    searchOBerries = [];
    let term = document.getElementById("search-input").value;
    let term2 = term.toLowerCase();
    listOBerries2.forEach((berry) => {
        if (term2 == berry.name || term2 == berry.fullName) {
            searchOBerries.push(berry);
        }
    })
    start.v.render();
}

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
