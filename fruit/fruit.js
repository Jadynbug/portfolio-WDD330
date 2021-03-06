
let options = [...document.querySelectorAll("#options div")];
let views = [...document.querySelectorAll("#viewBox div.container")];
let listOBerries1 = [];
let listOBerries2 = [];
let searchOBerries = [];
let bowlOBerries = [];
let key = "berryTest";

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
        let btnsA = document.querySelectorAll("#lister .add");
        btnsA.forEach((e) => {
            e.addEventListener("click", addIt);
        })        
        let btnsD = document.querySelectorAll("#lister .details");
        btnsD.forEach((e) => {
            e.addEventListener("click", () => {
                let name = e.parentNode.getAttribute("name");
                let n = document.querySelector(`[name="${name}"]`);
                n.classList.toggle("bigger");
            })
        })
    }

    setSearcher () {
        document.querySelector("#searcher ul").innerHTML = "";
        let e = document.getElementById("searching");
        e.addEventListener("click", searchIt);
        let stuff = renderSearcher(searchOBerries);
        if (stuff != undefined) {
            document.querySelector("#searcher ul").innerHTML = stuff;
            let btnsA = document.querySelectorAll("#searcher .add");
            btnsA.forEach((e) => {
                e.addEventListener("click", addIt);
            })
            let btnsD = document.querySelectorAll("#searcher .details");
            btnsD.forEach((e) => {
                e.addEventListener("click", () => {
                    console.log("click");
                    let name = e.parentNode.getAttribute("name");
                    let n = document.querySelector(`[name="${name}"]`);
                    console.log(n);
                    n.classList.toggle("bigger");
                    console.log(n.classList);
                })
            })
        }
        else {
            document.querySelector("#searcher ul").innerHTML = "";
        }
        
        
    }

    setBowler () {
        let stuff = renderBowler();
        if (stuff != undefined) {
            document.querySelector("#bowler ul").innerHTML = stuff;
        }
        else {
            document.querySelector("#bowler ul").innerHTML = "";
        }
        let btnsR = document.querySelectorAll("#bowler .remove");
        btnsR.forEach((e) => {
            e.addEventListener("click", removeIt)});        
        let btnsE = document.querySelectorAll("#bowler .eat");
        btnsE.forEach((e) => {
            e.addEventListener("click", removeIt)});
        
    }   
 

    
    render() {
        let filter = document.querySelector(".seen").id;
        if (filter == "lister") {
            this.setLister();
        }
        if (filter == "searcher") {
            this.setSearcher();
        }
        if (filter == "bowler") {
            this.setBowler();
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
            <div class="details-div ${element.name}">
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
            <div class="details-div ${element.name}">
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
    bowlOBerries = readFromLS(key);
    let content;
    if (bowlOBerries .length > 0 && bowlOBerries != undefined) {
        bowlOBerries.forEach(element => {
            let mess = `<li class="berry" name="${element.name}"><h2>${element.name}</h2>
                <button class="remove round">Remove berry</button><button class="eat round">
                Eat berry</button></li>`
            content += mess;
            console.log(mess);
        });
    }
    if (content != undefined) {
        let content2 = content.slice(9, -1);
        return content2;
    }
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
function addIt (e) {
    bowlOBerries = readFromLS(key);
    let b = "";
    let term = e.target.parentNode.getAttribute("name");
    listOBerries2.forEach((berry) => {
        if (term == berry.name) {
            bowlOBerries.push(berry);
            b = berry.fullName;
        }
    })
    let x = document.getElementById("snackbar");
    x.innerHTML = `Added ${b} to berry bowl`
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);

    writeToLS(key, bowlOBerries);
}
function removeIt (e) {
    console.log("removing, removing");
    let term = e.target.parentNode.getAttribute("name");
    let index = bowlOBerries.findIndex((x) => x.name === term);
    let b = bowlOBerries[index].fullName;
    bowlOBerries.splice(index, 1);
        
    console.log('removed ' + term + ' from berryBowl');
    writeToLS(key, bowlOBerries);
    let x = document.getElementById("snackbar");
    if (e.target.classList.contains("eat")) {
        x.innerHTML = `Ate ${b}. Yumm!`

    } else if (e.target.classList.contains("remove")) {
        x.innerHTML = `Removed ${b} from berry bowl`

    }
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
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
