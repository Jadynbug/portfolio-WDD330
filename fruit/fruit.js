
let options = [...document.querySelectorAll("#options div")];
let views = [...document.querySelectorAll("#viewBox div.container")];

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
        console.log(this);
    }
    setupInitListeners() {
        options.forEach(e => {e.addEventListener("click", this.switcher)})
        document.getElementById("viewBox").addEventListener("click", (e) => {
            if (e.target.classList.contains("details-btn")) {
                //fetchAll();
                let client = new HttpClient();
                client.get('https://www.fruityvice.com/api/fruit/Banana', (response) => {
                    console.log(response, response.json());
                });
                /*let express = require('express')
                let cors = require('cors')
                let app = express()
                
                app.use(cors())
                
                app.get('https://www.fruityvice.com/api/fruit/Banana', function (req, res, next) {
                res.json({msg: 'This is CORS-enabled for all origins!'})
                })
                
                app.listen(80, function () {
                console.log('CORS-enabled web server listening on port 80')
                })*/
            }
            else if (e.target.classList.contains("add")) {
                console.log(e.target.parentNode);
            }
        })

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

function fetchAll () {

    let http = new XMLHttpRequest();
    http.onload((response) => console.log(response.json()));
    http.open("GET", "https://www.fruityvice.com/api/fruit/all", true);
    http.sent();

    /*const myHeaders = new Headers();
    //myHeaders.set("orgin", "https://www.fruityvice.com");
    myHeaders.set("Access-Control-Allow-Origin", "https://jadynbug.github.io")
    //myHeaders.set("orgin", "https://jadynbug.github.io/portfolio-WDD330/fruit/fruit.html");
    myHeaders.set("orgin", "https://jadynbug.github.io");

    const myRequest = new Request('https://www.fruityvice.com/api/fruit/all', {
    method: 'GET',
    headers: myHeaders,
    mode: 'cors',
    cache: 'default',
    credentials: "include",
    });

    console.log(myRequest);

    fetch(myRequest)
    .then(response => {
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new TypeError("Oops, we haven't got JSON!");
        }
        return response.json();
     })
     .then(data => {
          process your data further 
     })
     .catch(error => console.error(error));
    /*.then((response) => {
        if (!response.ok) {
           return response.text().then(result => Promise.reject(new Error(result)));
        }
    
        return response.json();
    })
    .then((response) => {
        console.log(response);
    });*/
};

class HttpClient {
    constructor () {
        this.get = function(aUrl, aCallback) {
            var anHttpRequest = new XMLHttpRequest();
            anHttpRequest.onreadystatechange = function() { 
                if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                    aCallback(anHttpRequest.responseText);
            }
            anHttpRequest.open( "GET", aUrl, true );   
            anHttpRequest.setRequestHeader('access-control-allow-origin', "https://github.io");         
            anHttpRequest.send();
        }
    }
}
