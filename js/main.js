const links = [
    {
        label: "week 01 notes",
        url: "W01\W01-index.html"
    }
]

function listLinks () {
    var len = links.length;
    var fullContent = "";
    for (var i = 0; i < len; i++) {
        var content = '<li><a href="' + links[i][label] + '">' + links[i][url]
        fullContent += content;
    }
    document.getElementById("link_list").innerHTML = fullContent;
}
listLinks();