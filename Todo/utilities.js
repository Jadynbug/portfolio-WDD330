function qs(selector) {
    let ele = document.getElementById(selector);
    if (ele != null) {
        console.log("got element");
        return ele;
    }
    console.log("failed to get element");
}
function onTouch (elementSelector, callback) {
    let selector = qs(elementSelector);
    selector.addEventListener("touchend", callback);
    selector.addEventListener("click", callback);
}