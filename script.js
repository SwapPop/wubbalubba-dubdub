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
        document.getElementById("multiverseResults").innerHTML = "<p>Your search returned no results</p>";
        return {text: "Error calling API service: " + got.statusText}
      }
      return got.json();
    }).then(function(json){
      console.log(json);
      document.getElementById("multiverseResults").innerHTML = "";
      for (let i = 0; i < json.results.length; i++) {
        document.getElementById("multiverseResults").innerHTML += makeResult(json.results[i]);
      }
      return json.info;
    }).then(function(info) {
      if (info.prev !== null) {
        var prevBtn = document.createElement("BUTTON");
        prevBtn.innerHTML = "Prev";
        prevBtn.setAttribute("id", "prev");

        document.getElementById("multiverseResults").appendChild(prevBtn);
        document.getElementById('prev').addEventListener('click', function(prevPage){
          prevPage.preventDefault();
          updatePage(info.prev);
        });
      }
      if (info.next !== null) {
        var nextBtn = document.createElement("BUTTON");
        nextBtn.innerHTML = "Next";
        nextBtn.setAttribute("id", "next");

        document.getElementById("multiverseResults").appendChild(nextBtn);
        document.getElementById('next').addEventListener('click', function(nextPage){
          nextPage.preventDefault();
          updatePage(info.next);
        });
      }
    });
}

function makeResult(info) {
  let returnHTML = "<div class=\"result\">\n";
  if (info.image) {
    returnHTML += "<img src=\"" + info.image + "\"/>\n";
  }
  if (info.name) {
    returnHTML += "<h2>" + info.name + "</h2>\n";
  }
  if (info.episode) {
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
  returnHTML += "</ul>\n"
  returnHTML += "</div>";
  return returnHTML;
}
