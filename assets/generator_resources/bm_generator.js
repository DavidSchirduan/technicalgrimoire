/** TODO: 
 * Add all the images
 * Expand the text descriptions of each creature
 */

//get the json file and parse it
fetch('/assets/generator_resources/bm_generator.json')
  .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }

      // Examine the text in the response
      response.json().then(function(data) {
        bm = data;
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });

function bm_rollStats(){
      var die1 = Math.floor(Math.random() * 6) + 1;
      var die2 = Math.floor(Math.random() * 6) + 1;
      var die3 = Math.floor(Math.random() * 6) + 1;
      return Math.min(die1, die2, die3);
}

function bm_selectRandom(jsonList) {
  result = jsonList[Math.floor(Math.random() * jsonList.length)];
  if (Array.isArray(result)) {
    result = bm_selectRandom(result);
  }
  return result;
}

var bm_CHARname = "TEST";

  function bm_generate() {

    bm_CHARname = bm_selectRandom(bm.Names);
    document.getElementById("bmcharName").innerText = "Name: " + bm_CHARname;

    /* ======= STATS ======= */
    document.getElementById("bmcharSTR").innerText = "STR: " + bm_rollStats();
    document.getElementById("bmcharDEX").innerText = "DEX: " + bm_rollStats();
    var charCON = bm_rollStats(); //so we can save it for inventory space
    document.getElementById("bmcharCON").innerText = "CON: " + charCON;
    document.getElementById("bmcharINT").innerText = "INT: " + bm_rollStats();
    document.getElementById("bmcharWIS").innerText = "WIS: " + bm_rollStats();
    document.getElementById("bmcharCHA").innerText = "CHA: " + bm_rollStats();

    document.getElementById("bmcharHP").innerText = "Hit Points: " + bm_selectRandom(bm.HP);

    document.getElementById("bmcharPhysique").innerHTML = "<strong>Physique</strong><br>" + bm_selectRandom(bm.Physique);
    document.getElementById("bmcharFace").innerHTML = "<strong>Face</strong><br>" + bm_selectRandom(bm.Face);
    document.getElementById("bmcharSkin").innerHTML = "<strong>Skin</strong><br>" + bm_selectRandom(bm.Skin);
    document.getElementById("bmcharHair").innerHTML = "<strong>Hair</strong><br>" + bm_selectRandom(bm.Hair);
    document.getElementById("bmcharClothing").innerHTML = "<strong>Clothing</strong><br>" + bm_selectRandom(bm.Clothing);
    document.getElementById("bmcharVirtue").innerHTML = "<strong>Virtue</strong><br>" + bm_selectRandom(bm.Virtues);
    document.getElementById("bmcharVice").innerHTML = "<strong>Vice</strong><br>" + bm_selectRandom(bm.Vices);
    document.getElementById("bmcharSpeech").innerHTML = "<strong>Speech</strong><br>" + bm_selectRandom(bm.Speech);
    document.getElementById("bmcharSmell").innerHTML = "<strong>Smell</strong><br>" + bm_selectRandom(bm.Smell);
    
    var allergy = bm_selectRandom(bm.Allergy);
    while (allergy.includes("Roll twice more")) {
      allergy = bm_selectRandom(bm.Allergy) + " <br>and " + bm_selectRandom(bm.Allergy);
    }
    document.getElementById("bmcharAllergy").innerHTML = "<strong>Allergy</strong><br>" + allergy;

    /* ======= HISTORY ======= */
    document.getElementById("bmcharHistory").innerHTML = "You used to be " +
      bm_selectRandom(bm.Background) +
      " but then you were " + bm_selectRandom(bm.Misfortune) +
      ". Now you are a knave: a tomb-raiding, adventure-seeking ne’er-do-well who wields a spell book just as easily as a blade.";

    /* ======= EQUIPMENT ======= */
    var die1 = Math.floor(Math.random() * 6) + 1;
    var die2 = Math.floor(Math.random() * 6) + 1;
    var startGold = die1 + die2;
    startGold = startGold * 10;

    var memento = bm_selectRandom(bm.Memento);
    if (memento == "A random Lost Thing"){
      memento = bm_selectRandom(bm.lostThings);
    }

    document.getElementById("bmcharEquip").innerText = "Equipment (" + (charCON+10) + " Slots)";
    document.getElementById("bmcharItems").innerHTML = "<ul>" +
      "<li><strong>Weapon:</strong> " + bm_selectRandom(bm.Weapons) + " </li>" +
      "<li><strong>Armor:</strong> " + bm_selectRandom(bm.Armor) + "</li>" +
      bm_selectRandom(bm.ExtraArmor) + 
      "<li>" + startGold + " coins (100 coins per slot)</li>"+
      "<li>2 Rations (2 per slot)</li>" +
      "<li>" + bm_selectRandom(bm.Dungeoneering) + "</li>" +
      "<li>" + bm_selectRandom(bm.Dungeoneering) + "</li>" +
      "<li>" + bm_selectRandom(bm.General1) + "</li>" +
      "<li>" + bm_selectRandom(bm.General2) + "</li>" +
      "<li>" + memento + "</li></ul>";

  document.getElementById("bmcharCard").style = "display:block";
  document.getElementById("mgcharCard").style = "display:none";
  }

  function lost(){
  document.getElementById("bmabove").innerHTML = bm.lostThings[Math.floor(Math.random() * 29)];
  document.getElementById("bmunder").innerHTML = bm.lostThings[Math.floor(Math.random() * 29) + 30];
  document.getElementById("bmsilfer").innerHTML = bm.lostThings[Math.floor(Math.random() * 29) + 60];

  document.getElementById("bmcharCard").style = "display:none";

  }

function bm_saveCharacterIMG() {
  document.getElementById("bmdownloadBTN").style="display:none;";
  imageName = bm_CHARname;
  window.scrollTo(window.pageXOffset, 0);
  var container = document.getElementById("bmcharCard");
  useWidth = container.offsetWidth;
  useHeight = container.offsetHeight;
  html2canvas(container, {
    allowTaint: true,
    width: useWidth,
    height: useHeight,
    scale: 2,
  }).then(function (canvas) {
    var link = document.createElement("a");
    document.body.appendChild(link);
    link.download = "bone-marshes-" + imageName.replace(/ /g, "-") + ".png";
    link.href = canvas.toDataURL("image/png");
    link.target = '_blank';
    link.click();
  });
  document.getElementById("bmdownloadBTN").style="display:initial;";
}