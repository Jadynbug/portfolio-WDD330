const view = {
    a1: document.getElementById("a-1"),
    a2: document.getElementById("a-2"),
    a3: document.getElementById("a-3"),
    b1: document.getElementById("b-1"),
    b2: document.getElementById("b-2"),
    b3: document.getElementById("b-3"),
    c1: document.getElementById("c-1"),
    c2: document.getElementById("c-2"),
    c3: document.getElementById("c-3"),
    start: document.getElementById("start"),
    reset: document.getElementById("reset"),


    setup () {
        this.a1.innerHTML = "";
        this.a2.innerHTML = "";
        this.a3.innerHTML = "";
        this.b1.innerHTML = "";
        this.b2.innerHTML = "";
        this.b3.innerHTML = "";
        this.c1.innerHTML = "";
        this.c2.innerHTML = "";
        this.c3.innerHTML = "";
    }
}

const game = {
    p1: document.getElementById("player-1"),
    p2: document.getElementById("player-2"),

    turn: 1,

    start () {
        
    },

    writeIn (target) {
        if (this.turn === 1) {
            view.target.innerHTML += "X";
            console.log("X")
        }
        else {
            game.target.innerHTML += "O";
            console.log("O")
        }
        this.turnOver();
    },

    turnOver () {
        if (this.turn === 1) {
            this.p2.style.border = "none";
            this.p1.style.border = "solid chocolate 5px";
            this.turn = 2;
        } 
        else {
            this.p1.style.border = "solid chocolate 5px";
            this.p2.style.border = "none";
            this.turn = 1;
        }
    }
}

window.onload = function () {
    view.start.addEventListener('click', () => game.start(), false);
    view.reset.addEventListener("click", () => view.setup(), false);
    view.a1.addEventListener("touchend", () => game.writeIn("a1"), false);
    view.a1.addEventListener("click", () => game.writeIn("a1"), false);
}