document.getElementById('searchSubmit').addEventListener('click', searchPage);

function searchPage(search) {
    search.preventDefault();

    let searchVal = document.getElementById("searchInput").value;
    let s = document.getElementById('selector');
    let type = s.options[s.selectedIndex].value;

    const url = "https://rickandmortyapi.com/api/" + type + "/?name=" + searchVal;

    updatePage(url);

}

function updatePage(url) {
  fetch(url)
    .then(function(got) {
      if (got.status != 200) {
        document.getElementById("multiverseResults").innerHTML = "";
        var errorMessage = document.createElement('h2');
        errorMessage.innerHTML = "Your search returned no results!";
        document.getElementById("multiverseResults").appendChild(errorMessage);
        return {text: "Error calling API service: " + got.statusText}
      }
      return got.json();
    }).then(function(json){
      console.log(json);
      if (!json.text) {
        document.getElementById("multiverseResults").innerHTML = "";
        for (let i = 0; i < json.results.length; i++) {
          document.getElementById("multiverseResults").innerHTML += makeResult(json.results[i]);
        }
        return json.info;
      }
    }).then(function(info) {
      if (info !== undefined){
        var buttonDiv = document.createElement('div');
        buttonDiv.setAttribute('id', 'buttonDiv');
        document.getElementById("multiverseResults").appendChild(buttonDiv);
        if (info.prev !== null) {
          var prevBtn = document.createElement("BUTTON");
          prevBtn.innerHTML = "Prev";
          prevBtn.setAttribute("id", "prev");

          document.getElementById("buttonDiv").appendChild(prevBtn);
          document.getElementById('prev').addEventListener('click', function(prevPage){
            prevPage.preventDefault();
            window.scrollTo(0,600);
            updatePage(info.prev);
          });
        }
        if (info.next !== null) {
          var nextBtn = document.createElement("BUTTON");
          nextBtn.innerHTML = "Next";
          nextBtn.setAttribute("id", "next");

          document.getElementById("buttonDiv").appendChild(nextBtn);
          document.getElementById('next').addEventListener('click', function(nextPage){
            nextPage.preventDefault();
            window.scrollTo(0,600);
            updatePage(info.next);
          });
        }
      }
    });
}

function makeResult(info) {
  let returnHTML = "<div class=\"result\">\n";
  if (info.image) {
    returnHTML += "<div class=\"profilePic\"><img src=\"" + info.image + "\"/></div>\n";
  }
  returnHTML += "<div class=\"infoDiv\">"
  if (info.name) {
    returnHTML += "<h2>" + info.name + "</h2>\n";
  }
  if (info.episode && !info.species) {
    returnHTML += "<h4><em>" + info.episode + "</em></h4>\n"
  }
  if (info.air_date) {
    returnHTML += "<h4>Air Date: " + info.air_date +"</h4>\n"
  }
  if (info.dimension) {
    returnHTML += "<h4><em>" + info.dimension +"</em></h4>\n"
  }
  returnHTML += "<ul class=\"infoList\">";
  if (info.species) {
    returnHTML += "<li>Species: " + info.species +"</li>\n"
  }
  if (info.gender) {
    returnHTML += "<li>Gender: " + info.gender +"</li>\n"
  }
  if (info.type && info.type !== "") {
    returnHTML += "<li>Type: " + info.type +"</li>\n"
  }
  if (info.status) {
    returnHTML += "<li>Status: " + info.status +"</li>\n"
  }
  if (info.location) {
    returnHTML += "<li>Location: " + info.location.name + "</li>\n";
  }
  if (info.origin) {
    returnHTML += "<li>Origin: " + info.origin.name +"</li>\n"
  }
  returnHTML += "</ul>\n</div>\n"
  returnHTML += "</div>";
  return returnHTML;
}
