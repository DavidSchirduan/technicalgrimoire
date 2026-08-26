//get the json file and parse it
fetch('/assets/generator_resources/bridgetown.json')
  .then(
    function (response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }

      // Examine the text in the response
      response.json().then(function (data) {
        bridgeStuff = data;
        generateSpan();
      });
    }
  )
  .catch(function (err) {
    console.log('Fetch Error :-S', err);
  });

var Locations = []; //JSON for all 3 locations
var NPCs = []; //pre-select the NPCs of locations 1 and 3
var Events = [] //pre-select the Events of locations 1 and 3
var weather = {};

function selectRandom(jsonList) {
  result = jsonList[Math.floor(Math.random() * jsonList.length)];
  return result;
}

function generateSpan(){
  
  Locations = []; //JSON for all 3 locations
  NPCs = []; //pre-select the NPCs of locations 1 and 3
  Events = [] //pre-select the Events of locations 1 and 3
  weather = {};
  document.getElementById("bridgetownDiv").style.display = "none";


  Locations.push(selectRandom(bridgeStuff.Locations));
  NPCs.push(selectRandom(Locations[0].NPCs));
  Events.push(selectRandom(Locations[0].Events));

  Locations.push(selectRandom(bridgeStuff.Gatehouses));
  NPCs.push("Gatehouses don't have NPCs");
  Events.push("Gatehouses don't have NPCs");

  Locations.push(selectRandom(bridgeStuff.Locations));
  //to prevent dupes
  while (Locations[0].Name == Locations[2].Name){
    Locations.pop();
    Locations.push(selectRandom(bridgeStuff.Locations));
  }
  NPCs.push(selectRandom(Locations[2].NPCs));
  Events.push(selectRandom(Locations[2].Events));

  weather = selectRandom(bridgeStuff.Weather);

  renderSpan();
}

function renderSpan(){
  
  //stuff with images

  backgroundImageSrc = "";

  for (l=0;l<Locations.length;l++){
    backgroundImageSrc = backgroundImageSrc + "url(/assets/generator_resources/bridgetown/" + Locations[l].Image + "), ";
  }
  
  backgroundImageSrc = backgroundImageSrc + "url(/assets/generator_resources/bridgetown/bt_base.png)";
  document.getElementById("spanImage").style.backgroundImage = backgroundImageSrc;

  //set button titles
  document.getElementById("loc1Button").innerText = Locations[0].Name;
  document.getElementById("loc2Button").innerText = Locations[1].Name;
  document.getElementById("loc3Button").innerText = Locations[2].Name;

  changeWeather();

}

function showLocation(num){

  document.getElementById("locName").innerText = Locations[num].Name;
  document.getElementById("locQuote").innerText = "\"" + Locations[num].Quote + "\"";
  document.getElementById("locQuoter").innerText = "- " + Locations[num].Quoter;
  document.getElementById("locDescription").innerHTML = Locations[num].Description;

  //Gatehouses look different
  if (num == 1){
    document.getElementById("locHeader2").innerText = "TOLL";
    document.getElementById("locSection2").innerText = Locations[num].Toll;

    document.getElementById("locHeader3").innerText = "DETAILS: ";
    //For each Detail, lay it out
    descriptionHTML = ""
    for (i=0;i<Locations[num].Details.length; i++){
      descriptionHTML = descriptionHTML + "<p><strong>" + Locations[num].Details[i].Description + "</strong></p>";

      //lay out the bullets
      if (Locations[num].Details[i].Bullets.length > 0){
        descriptionHTML = descriptionHTML + "<ul>";
        for (b=0; b<Locations[num].Details[i].Bullets.length; b++){
          descriptionHTML = descriptionHTML + "<li>" + Locations[num].Details[i].Bullets[b] + "</li>";
        }
        descriptionHTML = descriptionHTML + "</ul>";
      }
    }

    document.getElementById("locSection3").innerHTML = descriptionHTML;

  } else {
    document.getElementById("locHeader2").innerText = "NPC: " + NPCs[num].Name;
    document.getElementById("locSection2").innerText = NPCs[num].Description;

    document.getElementById("locHeader3").innerText = "EVENT: " + Events[num].Name;
    document.getElementById("locSection3").innerHTML = "<p>" + Events[num].Description + "</p>";

  }
  
  changeWeather(); 
  document.getElementById("bridgetownDiv").style.display = "block";

}

function changeWeather(){
  weather = selectRandom(bridgeStuff.Weather);
  document.getElementById("weather").innerText = "WEATHER: " + weather.Name;
  document.getElementById("weatherDescription").innerText = weather.Description;
}
