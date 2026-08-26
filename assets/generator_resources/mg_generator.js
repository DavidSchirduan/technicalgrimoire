/** TODO: 
 * Add all the images
 * Expand the text descriptions of each creature
 */

//get the json file and parse it
fetch('/assets/generator_resources/mg_generator.json')
  .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }

      // Examine the text in the response
      response.json().then(function(data) {
        mg = data;
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });

mg_CHARname = "Jane";

function mg_rollHP() {
  var die1 = Math.floor(Math.random() * 4) + 1;
  var die2 = Math.floor(Math.random() * 4) + 1;
  var die3 = Math.floor(Math.random() * 4) + 1;
  return die1 + die2 + die3 + 4;
}

function mg_rollStats() {
  var points = 3;
var POW = 0;
var INS = 0;
var KNO = 0;

  while (points > 0) {
    random = Math.random();

    if (random <= .33 && POW < 2) {
      POW++;
      points--;
    } else if (random <= .66 && INS < 2) {
      INS++;
      points--;
    } else if (random <= 1 && KNO < 2) {
      KNO++;
      points--;
    }
  }

      document.getElementById("mgcharPOW").innerText = "Power: " + POW;
      document.getElementById("mgcharINS").innerText = "Instinct: " + INS;
      document.getElementById("mgcharKNO").innerText = "Knowledge: " + KNO;
}

  function mg_selectRandom(jsonList) {
    result = jsonList[Math.floor(Math.random() * jsonList.length)];
    if (Array.isArray(result)) {
      result = mg_selectRandom(result);
    }
    return result;
  }

  function mg_generate() {
    mg_CHARname = mg_selectRandom(mg.Names);
    document.getElementById("mgcharName").innerText = "Name: " + mg_CHARname;

    /* ======= STATS ======= */
    mg_rollStats();

    document.getElementById("mgcharHP").innerText = "HP: " + mg_rollHP();

    /* ======= EQUIPMENT ======= */
    //Show all items: melee, ranged, armor, rations, and 3 random items

    document.getElementById("mgcharItems").innerHTML =
      '<div class="row">' +
      '<div class="col-6"> • <strong>Weapon:</strong> ' +
      mg_selectRandom(mg.MeleeWeapons) +
      " </div>" +
      '<div class="col-6"> • <strong>Weapon:</strong> ' +
      mg_selectRandom(mg.RangedWeapons) +
      " </div>" +
      '<div class="col-6"> • <strong>Armor:</strong> ' +
      mg_selectRandom(mg.Armor) +
      "</div>" +
      '<div class="col-6"> • Rations (10 uses)</div>' +
      '<div class="col-6"> • Torches (10 uses)</div>' +
      '<div class="col-6"> • Ten-foot pole</div>' +
      '<div class="col-6"> • Coin (100)</div>' +
      '<div class="col-6"> • Flint and Steel</div>' +
      '<div class="col-6"> • Pen and Paper</div>' +
      '<div class="col-6"> • Skin of fresh water</div>' +
      '<div class="col-6"> • Bottle of fine wine (3 uses)</div>' +
      '<div class="col-6"> • Instrument of your choice</div>' +
      '<div class="col-6"> • Faithful Pet and supplies to care for it.<br><i>If discarded, is lost forever</i></div>' +
      '<div class="col-6"> • Fancy clothes<br><i>If discarded, is lost forever</i></div>' +
      '<div class="col-6"> • Spell Rune <i>(of a random spell)</i></div></div>';

  document.getElementById("mgcharCard").style = "display:block";
  document.getElementById("bmcharCard").style = "display:none";
    
  }

  function mg_saveCharacterIMG() {
    document.getElementById("mgdownloadBTN").style="display:none;";
    imageName = mg_CHARname;
    window.scrollTo(window.pageXOffset, 0);
    var container = document.getElementById("mgcharCard");
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
      link.download = "marsh-goons-" + imageName.replace(/ /g, "-") + ".png";
      link.href = canvas.toDataURL("image/png");
      link.target = '_blank';
      link.click();
    });
    document.getElementById("mgdownloadBTN").style="display:initial;";
  }