/*
Tracery LowDown: https: //github.com/galaxykate/tracery/tree/tracery2
grammar.flatten("#creature#") = horse
grammar.flatten("#creature.capitalize#") = Horse
grammar.flatten("#creature.a#") = a horse
grammar.flatten("#creature.a.capitalize#") = A horse
grammar.flatten("#creature.capitalize.a#") = a Horse
grammar.flatten("#creature.a.capitalizeAll#") = A Horse
grammar.flatten("#random-100-200.calc#") = 137 NOT DETERMINISTIC!
*/

var harvesterTables = {};

//get the json file and parse it
fetch('/assets/generator_resources/ripe.json')
  .then(
    function (response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }

      // Examine the text in the response
      response.json().then(function (data) {
        harvesterTables = data;
      });
    }
  )
  .catch(function (err) {
    console.log('Fetch Error :-S', err);
  });

var elderAge = 70; //click the generator multiple times to increase age
var elderName = "";

function ripe_generate() {

  //if nothing entered, do nothing
  if (document.getElementById("enterElderName").value) {

    elderName = document.getElementById("enterElderName").value;

    //set the deterministic harvester
    myrng = new Math.seedrandom(elderName);
    tracery.setRng(myrng);
    grammar = tracery.createGrammar(harvesterTables);
    grammar.addModifiers(baseEngModifiers); //from English mods

    harvesterEnergy = 30;

    adj1 = "test"
    noun1 = "test"

    adj2 = "test"
    noun2 = "test"

  //fragments can't start with the same letter
  while (adj1.charAt(0) == noun1.charAt(0)) {
    adj1 = harvesterTables.Fragmentadjectives[Math.floor(myrng() * harvesterTables.Fragmentadjectives.length)]
    noun1 = harvesterTables.Fragmentnouns[Math.floor(myrng() * harvesterTables.Fragmentnouns.length)]
  }
    while (adj2.charAt(0) == noun2.charAt(0)) {
    adj2 = harvesterTables.Fragmentadjectives[Math.floor(myrng() * harvesterTables.Fragmentadjectives.length)]
    noun2 = harvesterTables.Fragmentnouns[Math.floor(myrng() * harvesterTables.Fragmentnouns.length)]
  }

    Harvestdescription = grammar.flatten(
      "<p>" + elderName + "'s Harvester #Arrival#</p>" +
      "<p>#Impression#. #Locomotion#, #Behavior#. As it gets close to " + elderName + ", #Approach#.</p>" +
      "<p>The Harvester has two fragments it uses: "+adj1.toUpperCase() + " " + noun1.toUpperCase()+" and "+adj2.toUpperCase() + " " + noun2.toUpperCase()+". One of these fragments may be extracted from its corpse, the other is broken.</p>" +
      "<p>Defeating the Harvester will require <strong>" + harvesterEnergy + " Energy</strong>. After it is killed, #Defeat#.</p>" +
      "<p><strong>After 3 Rolls</strong>, #Capture#. " + elderName + " cannot take any more actions until the Harvester is defeated, but their allies may continue fighting.</p>" +
      "<p><strong>After 6 Rolls</strong>, the Harvester disappears in a flash of light, taking " + elderName + " with it. " + elderName + " will be remembered.");

    //fill in the Elder's Name
    Harvestdescription = Harvestdescription.replace(/ELDER/g, elderName);

    //Show the output
    document.getElementById("harvesterDesc").innerHTML = Harvestdescription;
    document.getElementById("harvesterCard").style = "";

  }
}

