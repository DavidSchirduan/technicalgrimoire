/** TODO: 
 * Add all the images
 * Expand the text descriptions of each creature
 */

//get the json file and parse it
fetch('/assets/generator_resources/hsi.json')
  .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }

      // Examine the text in the response
      response.json().then(function(data) {
        hsi = data;
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });

function hsi_threedsix(jsonList) {
  /*We don't add +1 because we'll be referencing tables, which start at 0*/
  var diceSum = Math.floor(Math.random() * 6) + Math.floor(Math.random() * 6) + Math.floor(Math.random() * 6);

  return jsonList[diceSum];
}


function hsi_rollDice(text) {

  var diceFormula = /([1-9]\d*)?d([1-9]\d*)([+-]\d+)?/gi;
  matches = text.match(diceFormula);

  for (var i in matches) {

    var result = droll.roll(matches[i]);

    text = text.replace(matches[i], result.total);

  }

  return text;
}

function hsi_overlandEncounter(regionName) {

  var overlandHTML = "";
  var motivation = "";

  type = hsi_threedsix(hsi.regionTables[regionName]);

  /*Some of the step 1 table results are factions*/
  if (type == "Fuegonauts" || type == "Night Axe") {
    creature = type;
  } else {
    creature = hsi_threedsix(hsi[type][regionName]);
  }

  switch (creature) {
    case ("Adventurer"):
      motivation = hsi_threedsix(hsi.Intelligent.Motivations);
      var advNames = Object.keys(hsi.Intelligent.Adventurers);
      var adv = advNames[Math.floor(Math.random() * advNames.length)];
      var desc = hsi_rollDice(hsi.Intelligent.Adventurers[adv]);

      overlandHTML = "<h2 class=\"tightSpacing\">" + adv + "</h2><h3 class=\"tightSpacing\">(<i>" + motivation + ")</i></h3><p>" + desc + "</p>";
      break;
    case ("Fuegonauts"):
    case ("Night Axe"):
    case ("Lizardmen"):
    case ("Nereid"):
    case ("Vyderac"):
      /*Dont add +1 to each dice roll because we need to reference a table anyway*/
      var diceSum = Math.floor(Math.random() * 6) + Math.floor(Math.random() * 6) + Math.floor(Math.random() * 6);
      motivation = hsi_threedsix(hsi.Intelligent.Motivations);

      for (unit in hsi.Intelligent[creature]) {

        if (hsi.Intelligent[creature][unit][diceSum] == 1) {
          overlandHTML = overlandHTML + "<h2 class=\"tightSpacing\">" +
            hsi.Intelligent[creature][unit][diceSum] + " " + unit +
            "</h2><h3 class=\"tightSpacing\">(<i>" + motivation + ")</i></h3>";

          overlandHTML = overlandHTML + "<p>" + hsi.creatureDetails[unit] + "</p>";
        } else if (hsi.Intelligent[creature][unit][diceSum] > 1) {
          overlandHTML = overlandHTML + "<h2 class=\"tightSpacing\">" +
            hsi.Intelligent[creature][unit][diceSum] + " " + unit +
            "s</h2><h3 class=\"tightSpacing\">(<i>" + motivation + ")</i></h3>";

          overlandHTML = overlandHTML + "<p>" + hsi.creatureDetails[unit] + "</p>";
          /*overlandHTML = overlandHTML + "<p>" + hsi.creatureDetails[unit] + "<br><a href=\"/images/HSI/" + unit + ".png\" target=\"_blank\">SHOW IMAGE</a></p>";*/
        }

      }
      break;
    default:

      var number = "1";
      motivation = hsi_threedsix(hsi.Elemental.Motivations);

      if (type == "Beast") {
        rawnumber = hsi_threedsix(hsi.Beast.NumberOf);
        number = hsi_rollDice(rawnumber);
        motivation = hsi_threedsix(hsi.Beast.Motivations)
      }

      if (number == "1") {
        overlandHTML = "<h2 class=\"tightSpacing\">" + number + " " + creature + "</h2><h3 class=\"tightSpacing\">(<i>" + motivation + ")</i></h3>";
      } else {
        overlandHTML = "<h2 class=\"tightSpacing\">" + number + " " + creature + "s</h2><h3 class=\"tightSpacing\">(<i>" + motivation + ")</i></h3>";
      }

      overlandHTML = overlandHTML + "<p>" + hsi.creatureDetails[creature] + "</p>";

      /*overlandHTML = overlandHTML + "<p>" + hsi.creatureDetails[creature] + "<br><a href=\"/images/HSI/" + creature + ".png\" target=\"_blank\">SHOW IMAGE</a></p>";*/
  }

  return [motivation, overlandHTML];

}

function hsi_Overland(regionName) {

  var encounter = hsi_overlandEncounter(regionName);

  if (regionName == "Light" || regionName == "Heavy" || regionName == "Mountainous") {
    var areaText = regionName + " Jungle";
  } else {
    var areaText = regionName;
  }

  var motivation = encounter[0];
  var htmlBLOCK = "<h2 class=\"tightSpacing\" style=\"text-align:right\">" +
    areaText + "</h2>" + encounter[1];

  indent = 20;

  while (motivation.includes("*")) {

    encounter = hsi_overlandEncounter(regionName);

    motivation = encounter[0];
    htmlBLOCK = htmlBLOCK + "<div style=\"margin-left: " + indent + "px;border-left:3px solid darkgrey;padding-left: 5px;\">" +
      encounter[1] + "</div>";

    indent = indent + 20;

  }

  document.getElementById("overlandData").innerHTML = htmlBLOCK;

}

function hsi_Locations(mapName) {

  var happ = hsi_threedsix(hsi.mapLocations[mapName].Happening);
  var locationStuff = "<h2 class=\"tightSpacing\" style=\"text-align:right\">" +
    mapName + "</h2>" + "<p><strong>What is going on?</strong><br>" + hsi_rollDice(happ) + "</p>";

  for (var i = 0; i < hsi.mapLocations[mapName].Areas.length; i++) {

    var indent = 20;
    var border = 0;
    var motivation = "*";

    locationStuff = locationStuff + "<h3 class=\"tightSpacing\">" + hsi.mapLocations[mapName].Areas[i] + "</h3>";

    while (motivation.includes("*")) {

      motivation = hsi_threedsix(hsi.mapLocations[mapName].Motivation);
      encoun = hsi_threedsix(hsi.mapLocations[mapName].Encounter);

      locationStuff = locationStuff + "<p style=\"padding-left: 5px;margin-left:" + indent + "px;border-left:solid darkgrey " + border + "px\">" + hsi_rollDice(encoun) + " <i>(" + motivation + ")</i></p>";

      indent = indent + 20;
      border = 3;

    }

  }

  document.getElementById("locationData").innerHTML = locationStuff;

}

function hsi_HotSpringsCity() {

  var cityStuff = "<h2 class=\"tightSpacing\" style=\"text-align:right\">Hot Springs City</h2>";

  cityStuff = cityStuff + "<p><strong>What is going on today?</strong><br>" + hsi_rollDice(hsi_threedsix(hsi["Hot Springs City"].Tables.dayHappening)) + "</p>";

  cityStuff = cityStuff + "<p><strong>What is going on tonight?</strong><br>" + hsi_rollDice(hsi_threedsix(hsi["Hot Springs City"].Tables.nightHappening)) + "</p>";

  for (var area in hsi['Hot Springs City']) {

    if (area != "Tables") {
      cityStuff = cityStuff + "<h2 class=\"tightSpacing\">" + area + "</h2>";

      /*Day Encounter*/
      var indent = 20;
      var border = 0;
      var motivation = "*";
      cityStuff = cityStuff + "<h3 class=\"tightSpacing\">Day Encounter</h3>";
      while (motivation.includes("*")) {

        motivation = hsi_threedsix(hsi["Hot Springs City"].Tables.dayMotivation);
        encoun = hsi_threedsix(hsi["Hot Springs City"].Tables.dayEncounter);

        cityStuff = cityStuff + "<p style=\"padding-left: 5px;margin-left:" + indent + "px;border-left:solid darkgrey " + border + "px\">" + hsi_rollDice(encoun) + " <i>(" + motivation + ")</i></p>";

        indent = indent + 20;
        border = 3;
      }

      /*Night Encounter*/
      var indent = 20;
      var border = 0;
      var motivation = "*";

      cityStuff = cityStuff + "<h3 class=\"tightSpacing\">Night Encounter</h3>";
      while (motivation.includes("*")) {

        motivation = hsi_threedsix(hsi["Hot Springs City"].Tables.nightMotivation);
        encoun = hsi_threedsix(hsi["Hot Springs City"].Tables.nightEncounter);

        cityStuff = cityStuff + "<p style=\"padding-left: 5px;margin-left:" + indent + "px;border-left:solid darkgrey " + border + "px\">" + hsi_rollDice(encoun) + " <i>(" + motivation + ")</i></p>";

        indent = indent + 20;
        border = 3;
      }

      /* 4 random buildings*/
      cityStuff = cityStuff + "<button class=\"collapse btn-black\">" + area + " Buildings</button><div class=\"collapsecontent\"><p><ul>";
      for (var i = 0; i < 4; i++) {

        cityStuff = cityStuff + "<li>" +
          "A <strong>" + hsi["Hot Springs City"][area].building[Math.floor(Math.random() * 6)] +
          "</strong> built from <strong>" + hsi["Hot Springs City"][area].material[Math.floor(Math.random() * 6)] +
          "</strong>. It was a <strong>" + hsi["Hot Springs City"][area].was[Math.floor(Math.random() * 6)] +
          "</strong> and now <strong>" + hsi["Hot Springs City"][area].now[Math.floor(Math.random() * 6)] +
          "</strong>. Hidden inside are <strong>" + hsi["Hot Springs City"][area].hides[Math.floor(Math.random() * 6)] +
          "</strong>. Unfortunately guarded by <strong>" + hsi["Hot Springs City"][area].guarded[Math.floor(Math.random() * 6)] +
          "</strong>, you may also encounter <strong>" + hsi["Hot Springs City"][area].Encounter[Math.floor(Math.random() * 6)] +
          "</strong>.</li>";
      }
      cityStuff = cityStuff + "</ul></p></div>";
    }
  }

  document.getElementById("locationData").innerHTML = cityStuff;

  var coll = document.getElementsByClassName("collapse");

  for (var i = 0; i < coll.length; i++) {

    coll[i].addEventListener("click", function () {
      var content = this.nextElementSibling;

      if (content.style.display === "block") {
        content.style.display = "none";
      } else {
        content.style.display = "block";
      }
    });
  }
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function hsi_treasure() {
  /*
  0-49: Fuegonauts
  50-99: Ancient
  100-149: Night Axe
  150-199: Nereid
  200-249: Elven
  250-299: Lizardmen
   */
  var treasureText = "<div class=\"row\">";
  var num = 300;

  var factionTables = [
    ["Fuegonauts", 0, 49],
    ["Ancient", 50, 99],
    ["Night Axe", 100, 149],
    ["Nereid", 150, 199],
    ["Elven", 200, 249],
    ["Lizardmen", 250, 299]
  ];

  for (i = 0; i < factionTables.length; i++) {

    num = getRndInteger(factionTables[i][1], factionTables[i][2]);
    var name = Object.keys(hsi.Treasure)[num];
    var desc = hsi.Treasure[name];
    treasureText = treasureText + "<div class=\"col-md-6 col-12\"><h2 class=\"tightSpacing\">" +
      factionTables[i][0] + "</h2>" +
      "<p><strong>" + name + "</strong><br>" + desc + "<p></div>";

  }
  var treasureText = treasureText + "</div>";

  document.getElementById("extraData").innerHTML = treasureText;
  hsi_showCard("extra");
}

function hsi_rumors() {

  document.getElementById("extraData").innerHTML = "<p>" +
    hsi.Rumors[Math.floor(Math.random() * hsi.Rumors.length)] +
    "</p>" + "<hr><p>" +
    hsi.Rumors[Math.floor(Math.random() * hsi.Rumors.length)] +
    "</p>" + "<hr><p>" +
    hsi.Rumors[Math.floor(Math.random() * hsi.Rumors.length)] +
    "</p>";

    hsi_showCard("extra");

}

function hsi_golems() {

  golemText = "<h2 class=\"tightSpacing\">Three Random Golems</h2>";

  for (i = 0; i < 2; i++) {

    golemText = golemText + "<p>" +
      hsi.Golems.Sound[Math.floor(Math.random() * hsi.Golems.Sound.length)] + "<br>" +
      hsi.Golems.Shape[Math.floor(Math.random() * hsi.Golems.Shape.length)] + "<br>" +
      hsi.Golems.Substance[Math.floor(Math.random() * hsi.Golems.Substance.length)] + "<br>" +
      hsi.Golems.Does[Math.floor(Math.random() * hsi.Golems.Does.length)] + "<br>" +
      hsi.Golems.But[Math.floor(Math.random() * hsi.Golems.But.length)] + "<br>" +
      "<i>Contains a chime made of " +
      hsi.Golems.Material[Math.floor(Math.random() * hsi.Golems.Material.length)] +
      ", engraved with " +
      hsi.Golems.Engraved[Math.floor(Math.random() * hsi.Golems.Engraved.length)] +
      ". " +
      hsi.Golems.Effect[Math.floor(Math.random() * hsi.Golems.Effect.length)] + "</i></p><hr>";
  }
  /*Split up to get rid of that stupid hanging HR*/
  golemText = golemText + "<p>" +
    hsi.Golems.Sound[Math.floor(Math.random() * hsi.Golems.Sound.length)] + "<br>" +
    hsi.Golems.Shape[Math.floor(Math.random() * hsi.Golems.Shape.length)] + "<br>" +
    hsi.Golems.Substance[Math.floor(Math.random() * hsi.Golems.Substance.length)] + "<br>" +
    hsi.Golems.Does[Math.floor(Math.random() * hsi.Golems.Does.length)] + "<br>" +
    hsi.Golems.But[Math.floor(Math.random() * hsi.Golems.But.length)] + "<br>" +
    "<i>Contains a chime made of " +
    hsi.Golems.Material[Math.floor(Math.random() * hsi.Golems.Material.length)] +
    ", engraved with " +
    hsi.Golems.Engraved[Math.floor(Math.random() * hsi.Golems.Engraved.length)] +
    ". " +
    hsi.Golems.Effect[Math.floor(Math.random() * hsi.Golems.Effect.length)] + "</i></p>";

  document.getElementById("extraData").innerHTML = golemText;
  hsi_showCard("extra");
}

function hsi_showCard(name) {

  switch (name) {
    case "overland":
      document.getElementById("overlandCard").style = "margin-bottom: 30px;";
      document.getElementById("locationCard").style = "margin-bottom: 30px;display:none;";
      break;
    case "location":
      document.getElementById("locationCard").style = "margin-bottom: 30px;";
      document.getElementById("overlandCard").style = "margin-bottom: 30px;display:none;";
      break;
    case "extra":
      document.getElementById("extraCard").style = "margin-bottom: 30px;";
      break;
  }
}

