//Pull submissions from the netlify api
apiKey = 'Cmx2eHF-SNrY6e8XTKVdngnG270E47A8dxwuEKTRxCo';
const myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer Cmx2eHF-SNrY6e8XTKVdngnG270E47A8dxwuEKTRxCo");
const myInit = {
  method: "GET",
  headers: myHeaders,
  mode: "cors",
  cache: "default",
};
const myRequest = new Request("https://api.netlify.com/api/v1/forms/64ea1aeb14b8ae0008cbab33/submissions");

fetch(myRequest, myInit).then((response) => {
    if (response.status !== 200) {
      console.log('Looks like there was a problem. Status Code: ' +
        response.status);
      return;
    }

    response.text().then(function (data) {
      //console.log(data);
      responseJSON = JSON.parse(data);

      //Split the json into two arrays: Monthly Challenge and Everything Else
      monthlyJSON = [];
      otherJSON = [];
      for (let i = 0; i < responseJSON.length; i++) { //for each row
        //console.log(responseJSON[i].data);
        if (responseJSON[i].data.botName.toLowerCase().startsWith("challengesdiabled")) {
          monthlyJSON.push(responseJSON[i].data);
        } else {
          otherJSON.push(responseJSON[i].data);
        }
      }

      //sort JSONs
      //sortedMonthly = monthlyJSON.sort(sortByScore);
      sortedOther = otherJSON.sort(sortByAdventure);

      //Build out the table from JSON data
      const tbl = document.getElementById('overpowered-table');
      const tblBody = document.createElement("tbody");

      //Monthly Blank Row
      // blankRow = document.createElement("tr");
      // blankCell = document.createElement("td");
      // blankCell.colSpan = "4";
      // blankCell.innerHTML = "<h3>DEC2023 High Scores</h3>"
      // blankRow.appendChild(blankCell);
      // tblBody.appendChild(blankRow);

      //Monthly Header Row
      // tableHead = document.createElement("tr");
      // headCell1 = document.createElement("th");
      // headCell1.innerHTML = "ADVENTURE";
      // tableHead.appendChild(headCell1);
      // headCell2 = document.createElement("th");
      // headCell2.innerHTML = "HIGH SCORE";
      // tableHead.appendChild(headCell2);
      // headCell3 = document.createElement("th");
      // headCell3.innerHTML = "BOT NAME";
      // tableHead.appendChild(headCell3);
      // headCell4 = document.createElement("th");
      // headCell4.innerHTML = "LINK";
      // tableHead.appendChild(headCell4);
      // tblBody.appendChild(tableHead);

      //Monthly scores
      // for (let i = 0; i < sortedMonthly.length; i++) {
      //   newRow = jsonToTable(sortedMonthly[i]);
      //   tblBody.appendChild(newRow);
      // }

      //Other Blank Row
      // blankRow = document.createElement("tr");
      // blankCell = document.createElement("td");
      // blankCell.colSpan = "4";
      // blankCell.innerHTML = "<h3>High Scores</h3>"
      // blankRow.appendChild(blankCell);
      // tblBody.appendChild(blankRow);

      //Header Row
      tableHead = document.createElement("tr");
      headCell1 = document.createElement("th");
      headCell1.innerHTML = "ADVENTURE";
      tableHead.appendChild(headCell1);
      headCell2 = document.createElement("th");
      headCell2.innerHTML = "FINAL SCORE";
      tableHead.appendChild(headCell2);
      headCell3 = document.createElement("th");
      headCell3.innerHTML = "BOT NAME";
      tableHead.appendChild(headCell3);
      headCell4 = document.createElement("th");
      headCell4.innerHTML = "LINK";
      tableHead.appendChild(headCell4);
      tblBody.appendChild(tableHead);

      for (let i = 0; i < sortedOther.length; i++) {
        newRow = jsonToTable(sortedOther[i]);
        tblBody.appendChild(newRow);
      }

      //append the body to the table itself
      tbl.appendChild(tblBody);

    });
  })
  .catch(function (err) {
    console.log('Fetch Error :-S', err);
  });

function sortByScore(a, b) {
  if (a.finalScore > b.finalScore) {
    return -1;
  }
  if (a.finalScore < b.finalScore) {
    return 1;
  }
  return 0;
}

//sort by adventure FIRST and then score
function sortByAdventure(a, b) {
  //ignore some title starters
  trueA = a.overpoweredAdventure.toLowerCase().replace("the ", "").replace("an ", "").replace("a ", "");
  trueB = b.overpoweredAdventure.toLowerCase().replace("the ", "").replace("an ", "").replace("a ", "");
  if (trueA < trueB) {
    return -1;
  } else if (trueA > trueB) {
    return 1;
  } else { //if adventures are equal
    if (a.finalScore > b.finalScore) {
      return -1;
    } else {
      return 1;
    }
  }
}

function jsonToTable(jsonRow) {

  const tableRow = document.createElement("tr");

  //console.log(jsonRow);

  //ADVENTURE
  advCell = document.createElement("td");
  advHTML = "";
  advHTML = jsonRow.overpoweredAdventure;
  if (jsonRow.overpoweredAdventureLink != null && jsonRow.overpoweredAdventureLink != "") {
    advHTML = "<a target=\"_blank\" href=\"" + jsonRow.overpoweredAdventureLink + "\">" + advHTML + "</a>";
  }
  advCell.innerHTML = advHTML;
  tableRow.appendChild(advCell);

  //HIGH SCORE
  scoreCell = document.createElement("td");
  scoreHTML = "<strong>" + jsonRow.finalScore + "</strong> by ";
  if (jsonRow.overpoweredLink != null && jsonRow.overpoweredLink != "") {
    //if it's a proper link, use it
    if (jsonRow.overpoweredLink.startsWith('http')){
        scoreHTML = scoreHTML + "<a target=\"_blank\" href=\"" + jsonRow.overpoweredLink + "\">" + jsonRow.overpoweredName + "</a>";
      //if it's a half-link, add https
    } else {
        scoreHTML = scoreHTML + "<a target=\"_blank\" href=\"https://" + jsonRow.overpoweredLink + "\">" + jsonRow.overpoweredName + "</a>";
    }
  } else {
    scoreHTML = scoreHTML + jsonRow.overpoweredName;
  }
  scoreCell.innerHTML = scoreHTML;
  tableRow.appendChild(scoreCell);

  //BOT NAME
  botCell = document.createElement("td");
  botHTML = "<a target=\"_blank\" href=\"/overpowered-app?name=" + jsonRow.botName + "\">" + jsonRow.botName + "</a>";
  botCell.innerHTML = botHTML;
  tableRow.appendChild(botCell);

  //OPTIONAL LINKS
  linkCell = document.createElement("td");
  linkHTML = "";
  //Playthrough
  if (jsonRow.playthroughLink != null && jsonRow.playthroughLink != "") {
    linkHTML = linkHTML + "<p><a target=\"_blank\" href=\"" + jsonRow.playthroughLink + "\">Playthrough Link</a></p>";
  }
  //Adventure Key saved in a hidden div right after button
  if (jsonRow.overpoweredAdventureKey != null && jsonRow.overpoweredAdventureKey != "") {
    linkHTML = linkHTML + "<button data-filename=\""+jsonRow.overpoweredAdventure+"_AdventureKey.txt\" class=\"btn btn-primary\" style=\"padding: 0px 3px;\">Download Key</button><div style=\"display:none;\">" + jsonRow.overpoweredAdventureKey + "</div><br>";
  }
  //Adventure Log saved in a hidden div right after button
  if (jsonRow.overpoweredAdventureLog != null && jsonRow.overpoweredAdventureLog != "") {
    linkHTML = linkHTML + "<button data-filename=\""+jsonRow.overpoweredName+"_AdventureLog.txt\" class=\"btn btn-primary\" style=\"padding: 0px 3px;\">Download Log</button><div style=\"display:none;\">" + jsonRow.overpoweredAdventureLog + "</div>";
  }
  linkCell.innerHTML = linkHTML;

  tableRow.appendChild(linkCell);

  return tableRow;

}

//Functions for revealing and closing the submission form modal
const allModals = document.querySelectorAll(".overpoweredModal"); //all modals for easy closing
const submitModal = document.querySelector("#submitModal"); 
const overlay = document.querySelector(".modal-overlay");
const closeModalBtns = document.querySelectorAll(".modal-close");

const openSubmitModal = function () {
  submitModal.classList.remove("modal-hidden");
  overlay.classList.remove("modal-hidden");
  submitModal.scrollIntoView();
};

const closeModal = function () {
  for (i=0; i<allModals.length; i++){
    allModals[i].classList.add("modal-hidden");
  }
  overlay.classList.add("modal-hidden");
};

for (i=0; i<closeModalBtns.length; i++){
  closeModalBtns[i].addEventListener("click", closeModal);
}

overlay.addEventListener("click", closeModal);
//also close modal on ESCAPE key
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("modal-hidden")) {
    closeModal();
  }
});

//if they click a button in the scoreboard, 
//download as a text file
const onlineScoreboard = document.getElementById('overpowered-table');
onlineScoreboard.addEventListener('click', (event) => {
  const isButton = event.target.nodeName === 'BUTTON';
  if (!isButton) {
    return;
  }
  divText = event.target.nextSibling.innerText
  fileName = event.target.dataset.filename;

  var tempLink = document.createElement('a');
  tempLink.setAttribute('download', fileName);
  tempLink.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(divText));
  tempLink.click(); 
})
