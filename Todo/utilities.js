/*do a querySelector lookup @param {string} selector The selector 
passed to querySelector
@return {element} The matching element or null if not found*/
function qs(selector) {
    let ele = document.getElementById(selector);
    if (ele != null) {
        console.log("got element");
        return ele;
    }
    console.log("failed to get element");
}

/*add a touchend event listener to an element for mobile with a click event 
fallback for desktops @param {string} elementSelector The selector for the 
element to attach the listener to
* @param {function} callback The callback function to run*/
export default function onTouch (elementSelector, callback) {
    let selector = qs(elementSelector);
    console.log(selector);
    if (selector != null) {
        selector.addEventListener("touchend", callback);
        selector.addEventListener("onClick", callback);
    } else {
        console.log("failed to add event listeners");
    }
}