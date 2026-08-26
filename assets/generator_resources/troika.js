//get the json file and parse it
fetch('/assets/generator_resources/troika.json')
  .then(
    function (response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }

      // Examine the text in the response
      response.json().then(function (data) {
        troika = data;
        grabParamsURL();
      });
    }
  )
  .catch(function (err) {
    console.log('Fetch Error :-S', err);
  });

var seedCode = "abc123";
var mode = "chaos";
var tr_CHARname = "";
var tr_allColors = ["Crimson", "Purple", "Gold", "Lime", "Teal", "Honeydew", "Coral", "Silver", "Fuchsia", "Orange", "Olive", "Green", "Blue", "Yellow", "Maroon", "Navy", "Indigo", "Tomato", "Tan", "Brown", "Grey"];
var tr_degrees = 0;
var tr_background;
var allTokens = [];
var playerNames = [];
var tr_card = document.getElementById('troikacardsides');
var currentToken;

function grabParamsURL() {
  //if someone is loading a character code
  if (window.location.search != "") {
    //console.log(window.location.search);
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('code') && urlParams.get('mode')) {
      //populate the generator with the saved info
      tr_generate(urlParams.get('mode'), urlParams.get('code'));
    } else if (urlParams.get('mode')) {
      //generate a new with mode
      tr_generate(urlParams.get('mode'));
    } else {
      console.log("invalid code, using new code");
    }
  } else {
    console.log("no params, using new code");
  }
}

function tr_generate(mode, oldSeed) {
  //hide tracker
  //document.getElementById("turnCard").style.display = "none";
  //document.getElementById("showTracker").style.display = "block";

  //create a new code if we don't have one
  if (!oldSeed) {
    seedCode = (Math.random() * 1e32).toString(36);
  } else {
    seedCode = oldSeed;
  }
  myrng = new Math.seedrandom(seedCode);

  skill = Math.floor(myrng() * 3) + 4;
  stamina = Math.floor(myrng() * 6) + Math.floor(myrng() * 6) + 14;
  luck = Math.floor(myrng() * 6) + 7;

  document.getElementById("stam").innerHTML = stamina;
  document.getElementById("luck").innerHTML = luck;
  document.getElementById("skill").innerHTML = skill;

  startingProvisions = ["2d6 Silver Pence", "Knife (DMG 2, 2, 2, 2, 4, 8, 10)", "Lantern & flask of oil", "Rucksack", "6 Provisions"];

  if (mode == "core") {
    tr_background = troika.Backgrounds[Math.floor(myrng() * 36)];
  } else if (mode == "bridgetown") {
    tr_background = troika.Backgrounds[(Math.floor(myrng() * (12)) + 36)];
    startingProvisions = ["A rucksack","2d6 provisions","A length of rope","A flint knife","A pocket full of dried tinder-moss"];
  } else if (mode == "bonesdeep"){
    tr_background = troika.Backgrounds[(Math.floor(myrng() * (6)) + 48)];
  } else if (mode == "dimensional"){
    tr_background = buildDimensional();
  } else {
    tr_background = troika.Backgrounds[Math.floor(myrng() * troika.Backgrounds.length)];
  }

  tr_CHARname = tr_background.Name;
  document.getElementById("bgName").innerHTML = tr_CHARname;
  document.getElementById("bgSrc").innerHTML = tr_background.Source;
  if (tr_background.hasOwnProperty('Text') && tr_background.Text != "") {
    document.getElementById("descr").innerHTML = tr_background.Text;
  }

  //SKILLS                                       truthy
  if (tr_background.hasOwnProperty('Skills') && tr_background.Skills) {
    skillHTML = "<h3 class=\"tightSpacing\">Advanced Skills & Spells</h3>" +
      "<p>Add your Skill ( + <span style=\"color: rgb(216, 96, 73);\">" + skill +
      "</span> ) to each of these:</p><ul>";
    for (s in tr_background.Skills) {
      skillHTML = skillHTML + "<li>" + tr_background.Skills[s] + "</li>";
    }
    skillHTML = skillHTML + "</ul>";

    document.getElementById("skills").innerHTML = skillHTML;
    document.getElementById("skills").style.display = "block";

  } else {
    document.getElementById("skills").style.display = "none";
  }

  //POSSESSIONS                                        truthy
  if (tr_background.hasOwnProperty('Possessions') && tr_background.Possessions) {
    poss = tr_background.Possessions;
    totalPoss = poss.concat(startingProvisions);
    possHTML = "<h3>Possessions</h3><ul>";

    for (p in totalPoss) {
      possHTML = possHTML + "<li>" + totalPoss[p] + "</li>";
    }

    possHTML = possHTML + "</ul>";

    document.getElementById("possessions").innerHTML = possHTML;
    document.getElementById("possessions").style.display = "block";

  } else {
    document.getElementById("possessions").style.display = "none";
  }

  //SPECIAL
  if (tr_background.hasOwnProperty('Special') && tr_background.Special != "") {
    document.getElementById("special").innerHTML = "<h3 class=\"tightSpacing\">Special</h3><p>" + 
    tr_background.Special + "</p>";
    document.getElementById("special").style.display = "block";
  } else {
    document.getElementById("special").style.display = "none";
  }

  document.getElementById("charCard").style.display = "block";
  //document.getElementById("generateCharButton").innerHTML = "Generate Another Character";

  //set the url to match the current code
  document.title = tr_CHARname;
  window.history.replaceState(null, null, "?mode=" + mode + "&code=" + seedCode);
  document.getElementById("saveCharacter").innerHTML = "<a href=\"" + window.location.href + "\"> copy this link</a>";
}

function buildDimensional(){
  //PROCESS: we go through each background and have a 1/3 chance to grab something from that background.
  numberOfBGs = 6;
  chanceToPullFromEach = .66;

  //create a new Troika Background from 6 other Troika Backgrounds.
  dimensionalBackgrounds = [];
  for (i = 0; i < numberOfBGs; i++){
    dimensionalBackgrounds.push(troika.Backgrounds[Math.floor(myrng() * troika.Backgrounds.length)]);
  }

  //Build the dimensional Name
  dimensionalName = "";
  for (i=0; i< dimensionalBackgrounds.length; i++){
    if (myrng() <= chanceToPullFromEach){
      words = dimensionalBackgrounds[i].Name.split(" ");
      dimensionalName = dimensionalName + "" + words[Math.floor(myrng() * words.length)] + " ";
      //console.log("Dimensional Name: " + dimensionalName);
    }
  }

  //Build the dimensional Text
  dimensionalText = "";
  for (i=0; i< dimensionalBackgrounds.length; i++){
    if (myrng() <= chanceToPullFromEach){
      if (dimensionalBackgrounds[i].hasOwnProperty('Text') && dimensionalBackgrounds[i].Text != "") {
        //regex from here: https://stackoverflow.com/questions/18914629/split-string-into-sentences-in-javascript
        sentences = dimensionalBackgrounds[i].Text.replace(/(\.+|\:|\!|\?)(\"*|\'*|\)*|}*|]*)(\s|\n|\r|\r\n)/gm, "$1$2|").split("|");
        console.log(sentences);
        dimensionalText = dimensionalText +  "" + sentences[Math.floor(myrng() * sentences.length)] + " ";
        console.log("Dimensional Text: " + dimensionalText);
      }
    }
  }

  //Build the dimensional Possessions
  dimensionalPossessions = [];
  for (i=0; i< dimensionalBackgrounds.length; i++){
    if (myrng() <= chanceToPullFromEach){
      if (dimensionalBackgrounds[i].hasOwnProperty('Possessions') && dimensionalBackgrounds[i].Possessions) {
        dimensionalPossessions.push("" + dimensionalBackgrounds[i].Possessions[Math.floor(myrng() * dimensionalBackgrounds[i].Possessions.length)] + "");
        //console.log("Dimensional Possessions: " + dimensionalPossessions);
      }
    }
  }

  //Build the dimensional Skills
  dimensionalSkills = [];
  for (i=0; i< dimensionalBackgrounds.length; i++){
    if (myrng() <= chanceToPullFromEach){
      if (dimensionalBackgrounds[i].hasOwnProperty('Skills') && dimensionalBackgrounds[i].Skills) {
        dimensionalSkills.push("" + dimensionalBackgrounds[i].Skills[Math.floor(myrng() * dimensionalBackgrounds[i].Skills.length)] + "");
        //console.log("Dimensional Skills: " + dimensionalSkills);
      }
    }
  }

  //Build the dimensional Special
  dimensionalSpecial = "";
  for (i=0; i< dimensionalBackgrounds.length; i++){
    if (myrng() <= chanceToPullFromEach){
      if (dimensionalBackgrounds[i].hasOwnProperty('Special') && dimensionalBackgrounds[i].Special != "") {
        //regex from here: https://stackoverflow.com/questions/18914629/split-string-into-sentences-in-javascript
        specials = dimensionalBackgrounds[i].Special.replace(/(\.+|\:|\!|\?)(\"*|\'*|\)*|}*|]*)(\s|\n|\r|\r\n)/gm, "$1$2|").split("|");
        console.log(specials);
        dimensionalSpecial = dimensionalSpecial + "" + specials[Math.floor(myrng() * specials.length)] + " ";
        console.log("Dimensional Special: " + dimensionalSpecial);
      }
    }
  }

  //Build the dimensional Source
  dimensionalSource = "was generated using:<ul>";
  for (i=0; i< dimensionalBackgrounds.length; i++){
    dimensionalSource = dimensionalSource + "<li><strong>" +  dimensionalBackgrounds[i].Name +"</strong> " + dimensionalBackgrounds[i].Source + "</li>";
    //console.log("Dimensional Source: " + dimensionalSource);
  }

  dimensionalBG = new Object();
  dimensionalBG.Name = dimensionalName;
  dimensionalBG.Text = dimensionalText;
  dimensionalBG.Possessions = dimensionalPossessions;
  dimensionalBG.Skills = dimensionalSkills;
  dimensionalBG.Special = dimensionalSpecial;
  dimensionalBG.Source = dimensionalSource + "</ul>";

  return dimensionalBG;
}

window.addEventListener('resize', cardResize);

function cardResize (){
  containerWidth = document.getElementById("troikacardContainer").clientWidth;

  if (containerWidth > 350) {
    containerWidth = 350;
  }
  containerHeight = containerWidth * 1.4;
  turnHeight = containerHeight * .4;

  document.getElementById("troikacard").style.width = containerWidth + "px";
  document.getElementById("troikacard").style.height = containerHeight + "px";
  document.getElementById("turnList").style.cssText = "overflow-x: clip;white-space: nowrap;margin:unset;overflow-y:scroll;text-overflow:ellipsis;height:"+turnHeight + "px;";
}

function tr_showTracker() {
  //hide the generator, clear url
  //document.getElementById("charCard").style.display = "none";

  //show tracker
  document.getElementById("turnCard").style.display = "block";
  document.getElementById("showTracker").style.display = "none";
  playerNames = [];
  populateNames();
  cardResize();
  addPlayer();
  addPlayer();
}

function addPlayer() {
  updateNames();
  //Add a new player name to the end
  playerNames.push(tr_allColors[playerNames.length] + " Player");
  populateNames();
}

function populateNames(){
    //clear it out, repopulate without blanks
    var currentPlayers = "";
    for (i=0;i<playerNames.length;i++){
      currentPlayers = currentPlayers + "<div class=\"col-md-6 col-12\">" +
      "<input class=\"troika-input pcboxes\" type=\"text\" id=\"player_" + i + "\" name=\"" + playerNames[i] + 
      "\" value=\"" + playerNames[i] + "\"></div>";
    }
    document.getElementById("playerNames").innerHTML = currentPlayers;
}

function updateNames(){
  var scannedNames = [];
  for (i=0;i<document.getElementById("playerNames").childElementCount; i++){
    //grabs the column --> input --> name
    newName = document.getElementById("player_"+i).value;

    if (newName) {
      scannedNames.push(newName);
    }
  }
  playerNames = scannedNames;
}

function tr_startRound() {
  updateNames();
  //hide spinners, change buttons, etc
  document.getElementById("newRoundbtn").innerText = "Start New Round";
  document.getElementById("nextTurnbtn").style.display = "block";
  document.getElementById("spinners").style.display = "none";
  document.getElementById("turnInfo").style.display = "block";
  allTokens = [];
  turnNumber = 0;
  tr_flipCard("Round Start");

  var numHenchmen = document.getElementById("turnHench").value;
  var numEnemy = document.getElementById("turnEnemy").value;
  roundEnd = false;

  //count players
  for (var i = 0; i < playerNames.length; i++) {
      allTokens.push(i);
      allTokens.push(i);
  }

  for (var i = 0; i < numHenchmen; i++) {
    allTokens.push("Henchmen");
  }

  for (var i = 0; i < numEnemy; i++) {
    allTokens.push("Enemy");
  }

  allTokens.push("End Round");
  tr_countTokens();

  document.getElementById("nextTurnbtn").scrollIntoView({
    behavior: 'smooth', // smooth scroll
    block: 'start' // the upper border of the element will be aligned at the top of the visible part of the window of the scrollable area.
  })
}

function tr_newRound() {
  updateNames();
  populateNames();
  document.getElementById("newRoundbtn").innerText = "Start New Round";
  document.getElementById("nextTurnbtn").style.display = "none";
  document.getElementById("spinners").style = "text-align:center;";
  document.getElementById("turnInfo").style.display = "none";
  tr_flipCard("Round Start");

}

function tr_nextTurn() {
  if (!roundEnd) {
    var grabToken = allTokens.splice(Math.floor(Math.random() * allTokens.length), 1)[0];
    tr_flipCard(grabToken);

    tr_countTokens();

    if (grabToken == "End Round") {
      roundEnd = true;
      document.getElementById("nextTurnbtn").style.display = "none";
    }
  }

  console.log("Remaining Tokens: " + allTokens);
}

function tr_flipCard(token) {

  currentToken = token;

  turnText = document.getElementById("turnList").innerHTML;
  var bgImage, cardTxt, bgColor;
  turnNumber = turnNumber + 1;

  switch (currentToken) {
    case ("Enemy"):
      //flip a full 360
      tr_degrees = tr_degrees + 180;
      bgImage = "url('/images/troika_enemy.png')";
      cardTxt = "Any<br>Enemy";
      bgColor = "silver";
      turnText = "<p style=\"margin: unset;\">" + turnNumber + ". Enemy" +
        "</p>" + turnText;
      break;

    case ("Henchmen"):
      //flip a full 360
      tr_degrees = tr_degrees + 180;
      bgImage = "url('/images/troika_henchling.png')";
      cardTxt = "Henchmen";
      bgColor = "silver";
      turnText = "<p style=\"margin: unset;\">" + turnNumber + ". Henchmen" +
        "</p>" + turnText;
      break;

    case ("Round Start"):
      //flip just flip 180
      turnNumber = 0;
      bgImage = "url('/images/troika_end_of_round.png')";
      cardTxt = "Start of<br>Round";
      bgColor = "white";
      turnText = "<p style=\"margin: unset;\">0. New Round</p>";
      break;

    case ("End Round"):
      //flip just flip 180
      tr_degrees = tr_degrees + 180;
      bgImage = "url('/images/troika_end_of_round.png')";
      cardTxt = "End of <br>Round";
      bgColor = "white";
      turnText = "<p style=\"margin: unset;\">" + turnNumber + ". End Round" + "</p>" + turnText;
      //document.getElementById("delayButton").innerText = "Keep Going";
      break;

    default:
      tr_degrees = tr_degrees + 180;
      bgImage = "url('/images/troika_characters.png')";
      cardTxt = playerNames[currentToken];
      bgColor = tr_allColors[currentToken];
      turnText = "<p style=\"margin: unset;\">" + turnNumber + ". " + playerNames[parseInt(currentToken)] + "</p>" + turnText;
      document.getElementById("delayButton").innerText = "Delay";
  }

  tr_card.style.transform = "rotateY(" + tr_degrees + "deg)";


  tr_degrees = tr_degrees + 180;
  document.getElementById("turnList").innerHTML = turnText;

  //wait for tr_card to finish spinning before you spin it back
  tr_card.ontransitionend = function () {
    document.getElementById('troikacardback').style.backgroundColor = bgColor;
    document.getElementById('troikacardback').style.backgroundImage = bgImage;
    document.getElementById('troikacardback').style.backgroundSize = "contain";
    document.getElementById("backText").innerHTML = cardTxt;

    if (currentToken != "Round Start" && currentToken != "Henchmen" && currentToken != "Enemy" && currentToken != "End Round") {
      document.getElementById("delayButton").style.display = "block";
    } else {
      document.getElementById("delayButton").style.display = "none";
    }

    tr_card.style.transform = "rotateY(" + tr_degrees + "deg)";
  }
}

function tr_delayTurn(){
  if (currentToken == "End Round"){
    document.getElementById("nextTurnbtn").style.display = "block";
    roundEnd = false;
  } else {
    document.getElementById("turnList").innerHTML = "<p style=\"margin: unset;\"><i>" +  playerNames[parseInt(currentToken)] + " delayed their turn.</i></p>" + document.getElementById("turnList").innerHTML;
  }
  allTokens.push(currentToken);
  tr_nextTurn();
}

function tr_countTokens() {

  var countPCs = 0;
  var countHenchmen = 0;
  var countEnemies = 0;
  var countEnd = 0;

  var listPCs = {};

  for (i in allTokens) {

    switch (allTokens[i]) {
      case ("Enemy"):
        countEnemies++;
        break;
      case ("Henchmen"):
        countHenchmen++;
        break;
      case ("End Round"):
        countEnd++;
        break;
      default:
        countPCs++;

        if (listPCs[playerNames[allTokens[i]]]){
          listPCs[playerNames[allTokens[i]]]++;
        } else {
          listPCs[playerNames[allTokens[i]]] = 1;
        } 
    }
  }

  tokenText = "<h3 class=\"tightSpacing\">Tokens left in the Bag</h3><p><ul>";

  for (players in listPCs) {
    tokenText = tokenText + "<li>" + listPCs[players] + " " + players + "</li>";
  }
  if (countHenchmen > 0) {
    tokenText = tokenText + "<li>" + (countHenchmen) + " Henchmen</li>";
  }
  if (countEnemies > 0) {
    tokenText = tokenText + "<li>" + (countEnemies) + " Enemies</li>";
  }
  if (countEnd > 0) {
    tokenText = tokenText + "<li>" + (countEnd) + " End Round</li>";
  }

  document.getElementById("tokenList").innerHTML = tokenText + "</ul>";
}
