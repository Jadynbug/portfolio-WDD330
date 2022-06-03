//create an array of hikes
const hikeList = [
    {
      name: "Bechler Falls",
      imgSrc: "falls.jpg",
      imgAlt: "Image of Bechler Falls",
      distance: "3 miles",
      difficulty: "Easy",
      description:
        "Beautiful short hike along the Bechler river to Bechler Falls",
      directions:
        "Take Highway 20 north to Ashton. Turn right into the town and continue through. Follow that road for a few miles then turn left again onto the Cave Falls road.Drive to the end of the Cave Falls road. There is a parking area at the trailhead."
    },
    {
      name: "Teton Canyon",
      imgSrc: "falls.jpg",
      imgAlt: "Image of Bechler Falls",
      distance: "3 miles",
      difficulty: "Easy",
      description: "Beautiful short (or long) hike through Teton Canyon.",
      directions:
        "Take Highway 33 East to Driggs. Turn left onto Teton Canyon Road. Follow that road for a few miles then turn right onto Staline Raod for a short distance, then left onto Alta Road. Veer right after Alta back onto Teton Canyon Road. There is a parking area at the trailhead."
    },
    {
      name: "Denanda Falls",
      imgSrc: "falls.jpg",
      imgAlt: "Image of Bechler Falls",
      distance: "7 miles",
      difficulty: "Moderate",
      description:
        "Beautiful hike through Bechler meadows river to Denanda Falls",
      directions:
        "Take Highway 20 north to Ashton. Turn right into the town and continue through. Follow that road for a few miles then turn left again onto the Cave Falls road. Drive to until you see the sign for Bechler Meadows on the left. Turn there. There is a parking area at the trailhead."
    }
  ];
  
  const imgBasePath = "//byui-cit.github.io/cit261/examples/";
  //on load grab the array and insert it into the page
  /*window.addEventListener("load", () => {
    showHikeList();
  });*/

  class newComment {
    constructor (hikeName, comment, type) {
      this.name = hikeName;
      this.date = new Date();
      this.content = comment;
      this.type = type;
    }
  }
  let commentList = null;

  class commentManager {
    constructor (key, element) {
      this.key = key;
      this.comments = getComments(this.key);
      this.element = element;
    }

    getAllComments() {
      this.listComments();
    }

    renderCommentList(list, element) {
        let eleList = "";
        if (list != []) {
            for (let l in list) {
              eleList +=`<li class="comment"><p>${list[l].content}</p><button id="rem_${list[l].id}" class="remove">X</button></li>`;
            }
        }
        console.log(eleList);
        document.getElementById(element).innerHTML = eleList;
        if (document.getElementById(element).innerHTML != "") {
            this.setCallbackForClassName("remove", this.removeComment);
        }
        this.addCommentListener();
    }

    listComments () {
      console.log(this.element);
      commentList = getComments(this.key);
      this.renderCommentList(commentList, this.element);
    }

    filterCommentsByName(list, name) {
      let newList = [];
      for (let i in list) {
        if (list[i].name == name) {
          newList.push(list[i])
        }
      }
      this.renderCommentList(newList, this.element);
    }

    addComment() {
      let name = document.getElementById("hikeNameInput").value;
      let type = document.getElementById("hikeTypeInput").value;
      let content = document.getElementById("hikeContentInput").value;
      let comment = new newComment(name, content, type);
      this.saveComments(comment, this.key);
      this.listComments();
    }
    removeComment() {
      let idStr = String(this.date);
      let id = parseInt(idStr.substring(4));
      console.log("removeComments() called " + id);
      removeComments(id, this.key);
      this.listComments();
    }
    addCommentListener() {
      document.getElementById("addNewComment").addEventListener("click", this.comment.addComment);
    }
    saveComments(comment) {
      commentList = getComments(this.key);
      commentList.push(comment);
      console.log('added ' + comment.content + ' to todo list ' + commentList);
      writeToLS(key, commentList);
    }

    setCallbackForClassName (name, callback) {
      let r = document.getElementsByClassName(name);
      console.log(r);
      for (let i of r) {
          ['touch', 'click'].forEach(e => i.addEventListener(e, callback));
      }
  }
  }

  export default class Hikes {
    constructor(elementId) {
      this.parentElement = document.getElementById(elementId);
      // we need a back button to return back to the list. This will build it and hide it. When we need it we just need to remove the 'hidden' class
      this.backButton = this.buildBackButton();
      this.comments = new commentManager("test01", "ul");
    }
    // why is this function necessary?  hikeList is not exported, 
    //and so it cannot be seen outside of this module. I added this in case 
    //I ever need the list of hikes outside of the module. This also sets me up 
    //nicely if my data were to move. I can just change this method to the new 
    //source and everything will still work if I only access the data through this getter.
    getAllHikes() {
      return hikeList;
    }
    // For the first stretch we will need to get just one hike.
    getHikeByName(hikeName) {
      return this.getAllHikes().find(hike => hike.name === hikeName);
    }
    //show a list of hikes in the parentElement
    showHikeList() {
        this.parentElement.innerHTML = '';
        // notice that we use our getter above to grab the list instead of getting it directly...this makes it easier on us if our data source changes...
        renderHikeList(this.parentElement, this.getAllHikes());
        this.addHikeListener();
        // make sure the back button is hidden
        this.backButton.classList.add('hidden');
    }
    // show one hike with full details in the parentElement
    showOneHike(hikeName) {
        const hike = this.getHikeByName(hikeName);
        this.parentElement.innerHTML = '';
        this.parentElement.appendChild(renderOneHikeFull(hike));
        // show the back button
        this.backButton.classList.remove('hidden');
    }
    // in order to show the details of a hike ontouchend we will need to attach a listener AFTER the list of hikes has been built. The function below does that.
    addHikeListener() {
      // We need to loop through the children of our list and attach a listener to each, remember though that children is a nodeList...not an array. So in order to use something like a forEach we need to convert it to an array.
        const childrenArray = Array.from(this.parentElement.children);
        childrenArray.forEach(child => {
            child.addEventListener('click', e => {
              // why currentTarget instead of target?
              this.showOneHike(e.currentTarget.dataset.name);
            });
        });
    }

    buildBackButton() {
        const backButton = document.createElement('button');
        backButton.innerHTML = '&lt;- All Hikes';
        backButton.addEventListener('click', () => {
        this.showHikeList();
        });
        backButton.classList.add('hidden');
        this.parentElement.before(backButton);
        return backButton;
    }

  }
  
  function renderHikeList(parent, hikes) {
    hikes.forEach(hike => {
      parent.appendChild(renderOneHikeLight(hike));
    });
  }

  function renderOneHikeLight(hike) {
    const item = document.createElement('li');
    item.classList.add('light');
    // setting this to make getting the details for a specific hike easier later.
    item.setAttribute('data-name', hike.name);
    item.innerHTML = ` <h2>${hike.name}</h2>
  <div class="image"><img src="${imgBasePath}${hike.imgSrc}" alt="${hike.imgAlt}"></div>
  <div>
          <div>
              <h3>Distance</h3>
              <p>${hike.distance}</p>
          </div>
          <div>
              <h3>Difficulty</h3>
              <p>${hike.difficulty}</p>
          </div>
          <div>
            <ul id="${hike.name}-list"></ul>
          </div>
  </div>`;
  
    return item;
  }
  function renderOneHikeFull(hike) {
    const item = document.createElement('li');
    item.innerHTML = ` 
      
          <img src="${imgBasePath}${hike.imgSrc}" alt="${hike.imgAlt}">
          <h2>${hike.name}</h2>
          <div>
              <h3>Distance</h3>
              <p>${hike.distance}</p>
          </div>
          <div>
              <h3>Difficulty</h3>
              <p>${hike.difficulty}</p>
          </div>
          <div>
              <h3>Description</h3>
              <p>${hike.description}</p>
          </div>
          <div>
              <h3>How to get there</h3>
              <p>${hike.directions}</p>
          </div>
          <div>
            <form>
              <input placeholder="Enter Name of Hike" id="hikeNameInput"/>
              <input placeholder="Enter Comment" id="hikeCommentInput"/><button id="addNewComment">Add Comment</button>
              <input placeholder="Enter Type of Comment" id="hikeTypeInput"/>
            </form>
            <ul id="${hike.name}-list"></ul>
          </div>
      
      `;
    return item;
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

function getComments (key) {
  if (commentList == null) {
      commentList = readFromLS(key);
      console.log("updated commentList");
  }
  return commentList;
}

function removeComments (id, key) {
  commentList = getComments(key);
  let index = commentList.findIndex((x) => x.id === id);
  commentList.splice(index, 1);
      
  console.log('removed ' + id + ' from comment list');
  console.log(commentList);
  writeToLS(key, commentList);
}