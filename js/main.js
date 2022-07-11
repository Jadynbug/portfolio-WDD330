const links = [
    {
        label: "Week 01 notes",
        url: "W01\\W01-index.html"
    },
    {
        label: "Week 02 notes",
        url: "W02\\W02-index.html"
    },
    {
        label: "Week 03 notes",
        url: "W03\\W03-index.html"
    },
    {
        label: "Week 04 notes",
        url: "W04\\W04-index.html"
    },
    {
        label: "Week 05 notes",
        url: "W05\\W05-index.html"
    },
    {
        label: "Week 06 notes",
        url: "W06\\W06-index.html"
    },
    {
        label: "Week 07 notes",
        url: "W07\\W07-index.html"
    },
    {
        label: "Week 08 notes",
        url: "W08\\W08-index.html"
    },
    {
        label: "Week 09 notes",
        url: "W09\\W09-index.html"
    },
    {
        label: "Week 10 notes",
        url: "W10\\W10-index.html"
    },
    {
        label: "Week 11 notes",
        url: "W11\\W11-index.html"
    },
    {
        label: "week 12 notes",
        url: "w12\\w12-index.html"
    },
    {
        label: "week 13 notes",
        url: "W13\\W13-index.html"
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