/*read a value from local storage and parse it as
 JSON @param {string} key The key under which the 
 value is stored under in LS
@return {array} The value as an array of objects*/
export default function readFromLS(key) {
    let seri = localStorage.getItem(key);
    console.log("read from ls");
    if (seri != null) {
        alert(seri + " not null");
        return JSON.parse(seri);
    }
    alert(seri + " null");
    return [];
}


/*write an array of objects to local storage under the provided
 key @param {string} key The key under which the value is stored under in LS
* @param {array} data The information to be stored as an array of objects. Must be serialized.*/
export function writeToLS(key, data) {
    let seri = JSON.stringify(data);
    alert(seri + " writing to ls");
    localStorage.setItem(key, seri);
    console.log("write to ls");
}