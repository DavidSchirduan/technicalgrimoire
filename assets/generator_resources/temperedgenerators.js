/*
Tracery LowDown: https: //github.com/galaxykate/tracery/tree/tracery2
grammar.flatten("#creature#") = horse
grammar.flatten("#creature.capitalize#") = Horse
grammar.flatten("#creature.a#") = a horse
grammar.flatten("#creature.a.capitalize#") = A horse
grammar.flatten("#creature.capitalize.a#") = a Horse
grammar.flatten("#creature.a.capitalizeAll#") = A Horse
grammar.flatten("#random-100-200.calc#") = 137
*/

//get the json file and parse it
fetch('/assets/generator_resources/tempered.json')
  .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }

      // Examine the text in the response
      response.json().then(function(data) {
        tempered = data;
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
    if (urlParams.get('name')){
      //populate the generator with the saved info
      tl_generate(decodeURI(urlParams.get('name')));
    } else {
      console.log("invalid code, using new code");
    }
  } else {
    console.log("no params, using new code");
  }
}

var tl_Wielder = "Lemuria";
var tl_WeaponName = "Excaliber";
var tl_WeaponType = "Dagger";
var tempered = {};

function tl_search() {
  if (document.getElementById("searchName").value){
    oldSeed = document.getElementById("searchName").value;
    document.getElementById("searchName").value = "";
    tl_generate(oldSeed);
  }
}

function tl_generate(oldSeed) {
  grammar = tracery.createGrammar(tempered);
  grammar.addModifiers(baseEngModifiers);

  console.log(document.getElementById("searchName").value);

  //create a new code if we don't have one
  if (!oldSeed){
    tl_WeaponName = grammar.flatten("#nameTemplate#");
  } else {
    tl_WeaponName = oldSeed;
  }
  myrng = new Math.seedrandom(tl_WeaponName);
  tracery.setRng(myrng);

  tl_generateWeapon();

  //Old singular slot creation feature
  // switch (text) {
  //   case ("slot"):
  //     tl_generateSlot();
  //     break;
  //   default:
  //     tl_generateWeapon();
  // }
}

function tl_generateSlot() {
  //document.getElementById("wpnBtn").innerHTML = "Generate a Weapon";
  //document.getElementById("slotBtn").innerHTML = "Generate another Slot";

  document.getElementById("weaponName").innerHTML = "New Slot:";
  //document.getElementById("interacting").innerHTML = "";
  document.getElementById("weaponDesc").innerHTML = "Use this Slot for Trinkets or to replace an existing Slot in your weapon after you helped an ally, or to add on to your weapon.";
  document.getElementById("weaponImg").style = "display:none;";
  document.getElementById("temperedSlots").innerHTML = tl_createSlot(1);

  document.getElementById("weaponCard").style = ""; //reveal the card
}

function tl_generateWeapon() {
  //document.getElementById("wpnBtn").innerHTML = "Generate another Weapon";
  //document.getElementById("slotBtn").innerHTML = "Generate a Slot";

  document.getElementById("weaponName").innerHTML = tl_WeaponName;

  document.getElementById("temperedSlots").innerHTML = tl_createSlot(3);

  tl_WeaponType = grammar.flatten("#weapon#"); //generate weapon type
  //A dagger #description#
  descrip = AvsAnSimple.query(tl_WeaponType) + " " + tl_WeaponType + " " + grammar.flatten("#description#");
  document.getElementById("weaponDesc").innerHTML = descrip.charAt(0).toUpperCase() + descrip.substring(1);

  document.getElementById("weaponImg").src = "/images/TemperedWeapons/" +
    tl_WeaponType.replace(/ /g, "_") + ".png";
  tl_setWeaponColors();

  //set the url to match the current code
  document.title = tl_WeaponName; 
  window.history.replaceState(null, null, "?name="+ encodeURI(tl_WeaponName));
  document.getElementById("saveCharacter").innerHTML = "<i>Bookmark this page to save this weapon, or <a href=\"" + window.location.href + "\"> copy this link</a>.</i>";

  //document.getElementById("interacting").innerHTML =
  //  '<p class="h3 tightSpacing">Interacting With Slots</p><p><img class="temperedicon" style="margin-left: 10px;margin-right: 10px;" src="/images/TemperedWeapons/icon-unlocked.png"><strong>Unlock A Slot</strong>.</p><p>When you fulfill the regret of a previous owner, you unlock that Slot and gain access to the Spell/Knowledge/Enchantment.</p><p><img class="temperedicon" style="margin-left: 10px;margin-right: 10px;" src="/images/TemperedWeapons/icon-shaking-hands.png"><strong>Help An Ally</strong>.</p><p>After you help an ally unlock one of their Slots, you may use the "Slot Generator" to replace any Slot in your own weapon with one from the generator.</p><p><img class="temperedicon" style="margin-left: 10px;margin-right: 10px;" src="/images/TemperedWeapons/icon-skull-crossed-bones.png"><strong>Character Death</strong>.</p><p>When a character dies they can choose to have some aspect of themselves stored in the item. Create a new slot based on the character that just died, lock it behind a Regret, and add it to the weapon.</p>';

  document.getElementById("weaponCard").style = ""; //reveal the card
}

/*returns a div row of Slots
THE LOGIC
0. Equal chance of every Slot being a Spell, Knowledge, Weapon Property, or Mutation.
1. If there is only one Slot, then it's an ancient Nonsense item.
2. Otherwise the first Slot is always unlocked.
3. Spells and Knowledge can be Real Names(2/3) or Nonsense(1/3)
4. Mutations and Weapon Properties are un-named. But their goals are Nonsense.
*/

function tl_createSlot(numSlots) {
  slotHTML = "";
  powername = "";
  powerdescr = "";
  phrase = "";
  random = 1;
  icon = "";

  //for the number of Slots
  for (i = 0; i < numSlots; i++) {
    random = Math.round(myrng() * 100);
    tl_Wielder = grammar.flatten("#name.capitalize#");
    mutation = false;

    switch (true) {
      //Give a mutation ONLY if it's not the first slot of a weapon.
      case ((numSlots > 1 && random < 15 && i != 0) || (numSlots == 1 && random < 15)):
        icon = "icon-mutation.png";
        powername = "<strong>Mutation</strong>";
        powerdescr = grammar.flatten("#mutation#");
        phrase = "The dense mixture of magic and history in this weapon can result in bizarre infections that alter the WIELDER permanently. They can only be cured by fulfilling their associated regret.";
        mutation = true;
        break;
      case (random < 40):
        icon = "icon-spell.png";
        powername = "<strong>" + tl_Wielder + "'s Spell</strong>";
        powerdescr = grammar.flatten("#spell#");
        phrase = "Spells can only be cast while holding this weapon. L = caster level. Spells last Lx10 minutes, range of 40ft (unless noted otherwise). \"Items\" can be held in one hand, \"objects\" are anything up to human size.";
        break;
      case (random < 65):
        icon = "icon-knowledge.png";
        powername = "<strong>" + tl_Wielder + "'s Knowledge</strong>";
        powerdescr = grammar.flatten("#knowledge#");
        phrase = "The memories, skills, and training of a previous owner. Knowledge is only accessible while holding this weapon. After this weapon is put away, the knowledge fades away over the next hour.";
        break;
      default:
        icon = "icon-enchantment.png";
        powername = "<strong>" + tl_Wielder + "'s Enchantment</strong>";
        powerdescr = grammar.flatten("#enchantment#");
        phrase = "Enchantments alter the properties of this weapon. They are passive bonuses and are always in effect.";
    }

    slotHTML = slotHTML + "<div class=\"row temperedRows\"><div class=\"col-lg-6 col-12 cellGoals\">";

    //SET REGRETS.
    //Mutations, the mutation comes first, cure later
    if (mutation) {
      slotHTML = slotHTML + "<p style=\"display: flow-root;\"><img style=\"margin-right: 10px;float:left;\"class=\"temperedicon\" src=\"/images/TemperedWeapons/icon-mutation.png\">" + powername + "</p><p>This Mutation infects you <strong>immediately</strong>: " + powerdescr + "</p></div>";
      //If you're just generating 1 slot, it's locked behind a goal.
    } else if (numSlots == 1) {
      slotHTML = slotHTML + "<p style=\"display: flow-root;\"><img style=\"margin-right: 10px;float:left;\" class=\"temperedicon\" src=\"/images/TemperedWeapons/icon-locked.png\"><strong>" + tl_Wielder + "'s Regret</strong></p><p>" + grammar.flatten("#goalTemplate#").replace(/WIELDER/g, tl_Wielder) + " Then you will unlock " + powername + ".</p></div>";
      //otherwise the first slot is an introduction
    } else if (i == 0) {
      slotHTML = slotHTML + "<p>As soon as you take hold of \"" + tl_WeaponName + "\" you gain awareness of all three slots. <strong>" + powername + "</strong> is already unlocked.</p></div>";
    } else {
      slotHTML = slotHTML + "<p style=\"display: flow-root;\"><img style=\"margin-right: 10px;float:left;\" class=\"temperedicon\" src=\"/images/TemperedWeapons/icon-locked.png\"><strong>" + tl_Wielder + "'s Regret</strong></p>" + grammar.flatten("#goalTemplate#").replace(/WIELDER/g, tl_Wielder) + " Then you will unlock " + powername + ".</p></div>";
    }

    //SET DETAILS
    //Mutations, the mutation comes first, cure later
    if (mutation){
      slotHTML = slotHTML + "<div class=\"col-lg-6 col-12 cellLegacies\"><p style=\"display: flow-root;\"><img style=\"margin-right: 10px;float:left;\" class=\"temperedicon\" src=\"/images/TemperedWeapons/icon-cure.png\"><strong>" + tl_Wielder + "'s Cure</strong></p>" + grammar.flatten("#goalTemplate#").replace(/WIELDER/g, tl_Wielder) + " Then you will cure this Mutation.</p></div></div><p class=\"temperedP\">" + phrase + "</p>";
    } else {
    slotHTML = slotHTML + "<div class=\"col-lg-6 col-12 cellLegacies\"><p style=\"display: flow-root;\"><img style=\"margin-right: 10px;float:left;\"class=\"temperedicon\" src=\"/images/TemperedWeapons/" + icon + "\">" + powername + "</p><p>" + powerdescr + "</p></div></div><p class=\"temperedP\">" + phrase + "</p>";
    }
  }

  return slotHTML;
}

//change the colors, and sometimes flip the weapon sideways
function tl_setWeaponColors() {
  random = myrng();
  if (random >= .5) {
    flipped = 1;
  } else {
    flipped = -1;
  }

  var bgstyle = "background: linear-gradient(to right";
  for (i = 0; i < 8; i++) {
    bgstyle = bgstyle + ", #" + (0x1000000 + myrng() * 0xffffff).toString(16).substr(1, 6);
  }

  document.getElementById("weaponImg").style = bgstyle + ");transform: scaleX(" + flipped + ");";
}
