const links = [
    {
        label: "week 01 notes",
        url: "W01\\W01-index.html"
    },
    {
        label: "Week 02 notes",
        url: "W02\\W02-index.html"
    },
    {
        label: "Week 03 nothes",
        url: "W02\\W02-index.html"
    }
]

function listLinks () {
    var len = links.length;
    var fullContent = "";
    for (var i = 0; i < len; i++) {
        var content = '<li><a href="' + links[i]["url"] + '">' + links[i]["label"] + "</li>";
        fullContent += content;
    }
    document.getElementById("link_list").innerHTML = fullContent;
}