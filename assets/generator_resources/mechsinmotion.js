
masterTracks = []; //unfilled tracks
filledTracks = []; 

document.getElementById("quickEntry").addEventListener('input', parseQuick, false);
parseQuick();

function getHighestSpeed(trackList) {
  //find the highest speed in the tracklist
  var speeds = [];
  for (i = 0; i < trackList.length; i++) {
    speeds.push(trackList[i][1]);
  }

  speeds.sort(function (a, b) {
    return a - b;
  });
  return speeds[speeds.length - 1];
}

function fillBeats(trackList) {
  var newTracklist = [];
  var sortedTrackList = sortTracklist(trackList); //sort it by speed for display reasons
  var highestSpeed = getHighestSpeed(sortedTrackList);

  for (t = 0; t < sortedTrackList.length; t++) {
    //preserve name and speed
    var beatTrack = [sortedTrackList[t][0], sortedTrackList[t][1]];
    for (a = 2; a < sortedTrackList[t].length; a++) {
      if (sortedTrackList[t][a] == "Move") {
        //Fill blank spaces for speed difference
        var speedDiff = highestSpeed - sortedTrackList[t][1];
        for (s = 0; s < speedDiff; s++) {
          beatTrack.push("Blank");
        }
      }
      beatTrack.push(sortedTrackList[t][a]);
    }
    newTracklist.push(beatTrack);
  }
  return newTracklist;
}

function removeBlankColumns(){
  //iterate through the table and remove all the blank Columns
  var mechTracks = document.getElementById('mechtracks');

  //for each column
  for (col = 2; col < mechTracks.rows[0].cells.length; col++) {
    var allBlanks = true; //if this becomes false, then we're good
    //go through each cell in the column
    for (r = 0; r < mechTracks.rows.length; r++) {
      if (mechTracks.rows[r].cells[col].hasChildNodes()){
        allBlanks = false;
        r = 100;//break the loop
      }
    }
    if (allBlanks){
      for (r = 0; r < mechTracks.rows.length; r++) {
        mechTracks.rows[r].deleteCell(col);//remove that column
      }
      col = col - 1; //so it re-checks the latest column
    }
  }
}

function sortTracklist(trackList) {
  var newTracklist = [];
  var highestSpeed = getHighestSpeed(trackList);

  while (highestSpeed > 0){
    for (t = 0; t < trackList.length; t++) {
      if (trackList[t][1] == highestSpeed) {
        newTracklist.push(trackList[t]);
      }
    }
    highestSpeed = highestSpeed - 1;
  }
  return newTracklist;
}

function logTracklist(trackList) {
  console.log("Tracklist:");
  trackList.forEach(
    logTrack => console.log(logTrack.toString())
  )
}

function countColumns(trackList) {
  var largestTrack = 0;
  for (i = 0; i < trackList.length; i++) {
    if (trackList[i].length > largestTrack) {
      largestTrack = trackList[i].length;
    }
  }
  return largestTrack;
}

function renderTable(trackList) {
  var allColumns = countColumns(trackList);
  //fully rebuilds and re-renders the tracks with each button press
  var mechTracks = document.getElementById('mechtracks');
  mechTracks.innerHTML = ''; //clear everything

  //for each track
  for (i = 0; i < trackList.length; i++) {
    var newRow = mechTracks.insertRow();

    if (i % 2 == 0){
      newRow.style.backgroundColor = "#b3b2b1";
    } else { 
      newRow.style.backgroundColor = "#e5e4e2";
    }

    newRow.style.border = "2px solid black";

    //name
    var cellName = newRow.insertCell();
    cellName.appendChild(document.createTextNode(trackList[i][0]));
    cellName.row = i;
    cellName.col = 0;
    cellName.style.border = "2px solid black";
    cellName.style.background = "unset";
    newRow.appendChild(cellName);

    //speed
    var cellSpeed = newRow.insertCell();
    cellSpeed.appendChild(document.createTextNode(trackList[i][1]));
    cellSpeed.row = i;
    cellSpeed.col = 0;
    cellSpeed.style.border = "2px solid black";
    cellSpeed.style.background = "unset";
    newRow.appendChild(cellSpeed);

    var cellAction;

    //actions
    if (trackList[i].length > 2) {
      for (a = 2; a < trackList[i].length; a++) {
        //skip the first two elements, the label and the speed
        if (trackList[i][a] == "Blank") {
          //do nothing if there's a blank
          cellAction = newRow.insertCell();
          cellAction.style.background = "unset";
          newRow.appendChild(cellAction);
        } else {
          cellAction = newRow.insertCell();
          cellAction.style.background = "unset";
          cellAction.appendChild(createActionHex(trackList[i][a]));
          newRow.appendChild(cellAction);
        }
        if ((a == trackList[i].length-1) && (a < allColumns-1)){ //at the end of the last loop
          //fill in blank columns at the end
          while (a < allColumns-1){
            cellAction = newRow.insertCell();
            cellAction.style.background = "unset";
            newRow.appendChild(cellAction);
            a++;
          }
        }
      }
    }
  }
  removeBlankColumns();
}

function createActionHex(action) {
  // var containerBox = document.createElement('div');
  // containerBox.className = "actionBox";

  // var textBox = document.createElement('div');
  // textBox.className = "actionText";

  var hexImg = document.createElement("img");
  hexImg.className = "actionImg";

  switch (action) {
    case 'Move':
      hexImg.src = "/assets/generator_resources/mechHexes/movehex.png";
      //actionTxt = "M";
      break;
    case 'Quick':
      hexImg.src = "/assets/generator_resources/mechHexes/quickactionhex.png";
      //actionTxt = "Q";
      break;
    case 'Full1':
      hexImg.src = "/assets/generator_resources/mechHexes/fullaction1hex.png";
      //actionTxt = "U";
      break;
    case 'Full2':
        hexImg.src = "/assets/generator_resources/mechHexes/fullaction2hex.png";
        //actionTxt = "U";
        break;
    case 'Free':
      hexImg.src = "/assets/generator_resources/mechHexes/freeactionhex.png";
      //actionTxt = "F";
      break;
    case 'Protocol':
      hexImg.src = "/assets/generator_resources/mechHexes/protocolhex.png";
      //actionTxt = "P";
      break;
    case 'Reaction':
      hexImg.src = "/assets/generator_resources/mechHexes/reacthex.png";
      //actionTxt = "R";
      break;
    case 'Overcharge':
      hexImg.src = "/assets/generator_resources/mechHexes/overchargehex.png";
      // actionTxt = "O";
      break;
    case 'Boost':
      hexImg.src = "/assets/generator_resources/mechHexes/boostmovehex.png";
      //actionTxt = "B";
      break;
    case 'Superheavy1':
      hexImg.src = "/assets/generator_resources/mechHexes/superheavyhex1.png";
      //actionTxt = "S";
      break;
    case 'Superheavy2':
        hexImg.src = "/assets/generator_resources/mechHexes/superheavyhex2.png";
        //actionTxt = "S";
        break;
    case 'NPC':
      hexImg.src = "/assets/generator_resources/mechHexes/extraactivationhex.png";
      //actionTxt = "E";
      break;
    case 'Wait':
      hexImg.src = "/assets/generator_resources/mechHexes/waithex.png";
      //actionTxt = "W";
      break;
  }

  return hexImg;
}

function parseQuick() {
  var text = document.getElementById('quickEntry');
  var quickText = text.value;
  var quickLine = quickText.split('\n');
  //create a new tracklist
  var quickTracks = [];

  for (i = 0; i < quickLine.length; i++) {
    var quickTrack = []; //the new track

    //split with last number, in case the name has a number
    //David456abcdeg = [David 4 5 6 abcdefg]
    var splits = quickLine[i].split(/(\d)/);
    
    if (splits.length > 1) {
      var trackActions = splits.pop(splits.length); //the last element
      var trackSpeed = splits.pop(splits.length); //the second to last element
      quickTrack.push(splits.join('')); //Add in the name
      quickTrack.push(trackSpeed); //Add in the speed

      //for each letter in the quickTrack
      for (a = 0; a < trackActions.length; a++) {
        action = "error";
        switch (trackActions[a].toUpperCase()) {
          case 'M':
            action = "Move";
            break;
          case 'Q':
            action = "Quick";
            break;
          case 'U':
            quickTrack.push("Full1");
            action = "Full2";
            break;
          case 'F':
            action = "Free";
            break;
          case 'P':
            action = "Protocol";
            break;
          case 'R':
            action = "Reaction";
            break;
          case 'O':
            action = "Overcharge";
            break;
          case 'B':
            action = "Boost";
            break;
          case 'S':
            quickTrack.push("Superheavy1");
            action = "Superheavy2";
            break;
          case 'W':
              action = "Wait";
              break;
          case 'N':
            action = "NPC";
            break;
          default:
            console.log("Quick Entry action not recognized: " + trackActions[a]);
        }
        if (action != "error"){
        quickTrack.push(action);
        }
      }
      quickTracks.push(quickTrack);
    }
  }
  //simple resize text area
  text.style.height = 'auto';
  text.style.height = text.scrollHeight + 'px';
  text.style.width = '100%';

  renderTable(quickTracks);
  masterTracks = quickTracks;
}

function startRound() {
  filledTracks = fillBeats(masterTracks);
  renderTable(filledTracks);

  //light first row and column
  var mechTracks = document.getElementById('mechtracks');
  mechTracks.rows[0].cells[2].classList.add("currentAction");
  //outline first cell of each row
  for (r = 0; r < mechTracks.rows.length; r++) {
    mechTracks.rows[r].cells[2].classList.add("currentBeat");
  }
}

function nextAction() {
  var mechTracks = document.getElementById('mechtracks');
  
  try {

  for (col = 2; col < mechTracks.rows[0].cells.length; col++) {
    //if the current column is lit, check cells
    if (mechTracks.rows[0].cells[col].classList.contains("currentBeat")) {
      //go through each cell in the column
      for (r = 0; r < mechTracks.rows.length; r++) {
        //if the current cell is highlighted
        if (mechTracks.rows[r].cells[col].classList.contains("currentAction")){
          //if it's the last cell, highlight the next column

          if (r == mechTracks.rows.length - 1) {
            //highlight next column
            for (i = 0; i < mechTracks.rows.length; i++) {
              mechTracks.rows[i].cells[col + 1].classList.add("currentBeat");
              mechTracks.rows[i].cells[col].classList.remove("currentBeat");
            }
            //light next cell
            mechTracks.rows[r].cells[col].classList.replace("currentAction", "oldAction");
            mechTracks.rows[0].cells[col + 1].classList.add("currentAction");
            
            //break the loop if the action has content
            if (mechTracks.rows[0].cells[col + 1].hasChildNodes()){
              r = 100; //break the loop
              col = 100; //break the loop
            }
          } else {
            //Just highlight the next cell
            mechTracks.rows[r].cells[col].classList.replace("currentAction", "oldAction");
            mechTracks.rows[r + 1].cells[col].classList.add("currentAction");

            //break the loop if the action has content
            if (mechTracks.rows[r + 1].cells[col].hasChildNodes()){
              r = 100; //break the loop
              col = 100; //break the loop
            }
          }          
        }
      }
    }
  }

} catch (error) {
  console.error(error);
  endRound(); //if an error, throw end of round
}
}

function endRound(){
  ebModal.style.display = "block";
  ebModal.style.paddingTop = (window.innerHeight / 2) + "px";
  renderTable(masterTracks);
}

// Get the modal
var ebModal = document.getElementById('alertModal');
var ebModalContent = document.getElementById('ebcf_modal');

// Get the <span> element that closes the modal
var ebSpan = document.getElementById("ebcf_close");

// When the user clicks on <span> (x), close the modal
ebSpan.onclick = function() {
    ebModal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == ebModal) {
        ebModal.style.display = "none";
    }
}