//get the json file and parse it
fetch('/assets/generator_resources/test.json')
  .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }

      // Examine the text in the response
      response.json().then(function(data) {
        wyrd = data;
        grabParamsURL();
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });

function grabParamsURL(){
  //if someone is loading a character code
  if (window.location.search != ""){
    console.log("Seed:" + window.location.search);
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('woods') && urlParams.get('target')){
      //populate the generator with the saved info
      beginHunt(decodeURI(urlParams.get('woods')), decodeURI(urlParams.get('target')));
    } else {
      console.log("invalid code, using new code");
    }
  } else {
    console.log("no params, using new code");
  }
}

var locationList; //contains all the html and text for each location

function newHunt(){
  woods = wyrd.names.prefix[Math.floor(Math.random() * wyrd.names.prefix.length)] + " of " + wyrd.names.suffix[Math.floor(Math.random() * wyrd.names.suffix.length)];

  target = wyrd.creatures[Math.floor(Math.random() * wyrd.creatures.length)].name;

  beginHunt(woods, target);
}

function beginHunt(seedWoods, seedTarget) {
  myrng = new Math.seedrandom(seedWoods + seedTarget);

  locationList = [];
  document.getElementById("locationText").innerHTML = "";

  document.getElementById("huntText").innerHTML = "Within the <strong>" + seedWoods + "</strong> there is rumored to be " + wyrd.secrets[Math.floor(myrng() * wyrd.secrets.length)] + " But beware! " + wyrd.dangers[Math.floor(myrng() * wyrd.dangers.length)] + "<br><br> You are hunting one or more <strong>" + seedTarget + "</strong> for fortune, fame, flesh, or some other reason altogether. You will need <strong>" + (Math.floor(myrng() * 20) + 1) + " Marks</strong> to track the creature(s).";

  //MAP GENERATION
  allPaths = ["A","B","C","D","E","F","G","H"];
  pathList = [];
  pathNotes = [];
  //1. pick a random path (A-H)
  pathList.push(allPaths.splice(Math.floor(myrng() *allPaths.length), 1));
  //2. give that path a random description
  pathNotes.push(wyrd.pathDescriptions[Math.floor(myrng() * wyrd.pathDescriptions.length)]);
  //3. Pick another random Path
  pathList.push(allPaths.splice(Math.floor(myrng() *allPaths.length), 1));
  //2. give that path a random description
  pathNotes.push(wyrd.pathDescriptions[Math.floor(myrng() * wyrd.pathDescriptions.length)]);
  //3. Pick another random Path
  pathList.push(allPaths.splice(Math.floor(myrng() *allPaths.length), 1));
  //2. give that path a random description
  pathNotes.push(wyrd.pathDescriptions[Math.floor(myrng() * wyrd.pathDescriptions.length)]);

  //now we have a random list of letters that we attach paths to.
  //pathNotes is the same size as pathList, so we use the same index when referencing it

  //Pull images of the matching two paths and layer them
  document.getElementById("mapIMG").innerHTML = "<img src=\"/images/WyrdMaps/blankMap.png\">";
  document.getElementById("mapIMG").style = "background-image: url(/images/WyrdMaps/path"+pathList[0]+".png),url(/images/WyrdMaps/path"+pathList[1]+".png),url(/images/WyrdMaps/path"+pathList[2]+".png),url(/images/WyrdMaps/BACKGROUND.png);background-size: contain;background-position: center;background-repeat: no-repeat;";

  //LOCATION GENERATION (8)
  logHTML = "<div class=\"logItem col-7\"><a onclick=\"wy_nextEncounter()\"><h3><span class=\"logWyrdLevel\" style=\"color:red;\">!</span>Random Encounter</h3></a></div>";

  //We need this to make the connections
  locationShortList = []
  for (i = 0; i < 6; i++){
    locationShortList.push(wyrd.locations[Math.floor(myrng() * wyrd.locations.length)]);
  }

  for (i = 0; i < 6; i++){
    nextLocation = locationShortList[i];
  
    //Build out the buttons
    logHTML = logHTML + "<div class=\"logItem col-6\"><a onclick=\"wyrd_getLoc('"+i+"')\"><h3><span class=\"logWyrdLevel\">" + (i+1) + "</span> " + nextLocation.name + "</h3></a></div>";

    //now see if any of our chosen paths have exits in this location
    directionKeys = {
      "NN" : "NORTH",
      "NE" : "NORTHEAST",
      "NW" : "NORTHWEST",
      "SS" : "SOUTH",
      "SE" : "SOUTHEAST",
      "SW" : "SOUTHWEST",
      "EE" : "EAST",
      "WW" : "WEST"
    }

  exitText = "<h3>Exits:</h3>";

  //for each path on our list, construct the exits of each location
  //paths look like "1SE5" which means area 1 has a south-eastern exit that leads to 5
  for (path = 0; path < pathList.length; path++){
    //get the exits array for path X
    exits = wyrd.paths[pathList[path]];
    for (var exit of exits){
      if (exit[0] == i+1){ //if the current location has an exit in any of our paths
        direction = exit.substring(1,3);
        destination = parseInt(exit[3] - 1); 
        exitText = exitText + "<p><a class=\"wyrdExit\" onclick=\"wyrd_getLoc('"+destination+"')\">" + directionKeys[direction] + " to " + exit[3] + ". " + locationShortList[destination].name + "</a></strong>  " + 
        pathNotes[path] + " " + wyrd.scenes[Math.floor(myrng() * wyrd.scenes.length)] + " " + wyrd.woods[Math.floor(myrng() * wyrd.woods.length)] + " " + wyrd.senses[Math.floor(myrng() * wyrd.senses.length)] + "</p>";
      }
    }
  }

  if (exitText == "<h3>Exits:</h3>"){
    exitText = "<h3>No Obvious Exits</h3><p>How did you get here?</p>";
  }

  locationtext = nextLocation.description + exitText;
  locationList.push("<h2>" + (parseInt(i)+1) + ". " + nextLocation.name + "</h2><p>" + locationtext + "</p>");
  }

  //make the buttons
  document.getElementById("logContent").innerHTML = logHTML;

  //set url
  document.title = seedWoods; 
  window.history.replaceState(null, null, "?woods="+seedWoods+"&target="+seedTarget);
  document.getElementById("saveHunt").innerHTML = "<i>Bookmark this page to save this hunt,<br>or <a href=\"" + window.location.href + "\"> copy this link</a>.</i>";
}

//display the location they click on
function wyrd_getLoc(x){
  document.getElementById("locationText").innerHTML = locationList[x];
}

function wy_nextEncounter() {
  encounter = wyrd.encounters[Math.floor(myrng() * wyrd.encounters.length)];
  moodText = "";

  if (encounter.moods.length > 0) {
    moodText = "<p><h3>Moods:</h3><ul>";

    for (m=0; m<encounter.moods.length; m++){
      mtext = "<strong>" + encounter.moods[m].replace(/ /, "</strong> ");
      moodText = moodText + "<li>" + mtext + "</li>";
    }
    moodText = moodText + "</ul>";
  }

  imagePath = ""

  if (encounter.image != "") {
    imagePath = "<img style=\"float:right;max-width:40%;\" src=/images/WyrdCreatures/" + encounter.image + ">";
  }
  
  document.getElementById("locationText").innerHTML = imagePath + "<h2>" + encounter.name + "</h2>" + 
  "<p>" + encounter.details + "</p>" + moodText;

}