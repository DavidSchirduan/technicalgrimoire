//get the json file and parse it
fetch('/assets/generator_resources/petgenerator.json')
  .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }

      // Examine the text in the response
      response.json().then(function(data) {
        pets = data;
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });

function pet_adopt() {
  loco = pets.Locomotion[Math.floor(Math.random() * pets.Locomotion.length)];
  abil = pets.Abilities[Math.floor(Math.random() * pets.Abilities.length)];
  quir = pets.Quirks[Math.floor(Math.random() * pets.Quirks.length)];
  back = pets.Backgrounds[Math.floor(Math.random() * pets.Backgrounds.length)];

  var random = Math.random();
  switch (true) {
    case (random < 0.5):
      adje = pets.Adjectives[Math.floor(Math.random() * pets.Adjectives.length)];
      break;
    case (random < 0.75):
      adje = pets.Adjectives[Math.floor(Math.random() * pets.Adjectives.length)] + ", " + pets.Adjectives[Math.floor(Math.random() * pets.Adjectives.length)];
      break;
    default:
      adje = pets.Adjectives[Math.floor(Math.random() * pets.Adjectives.length)] + ", " + pets.Adjectives[Math.floor(Math.random() * pets.Adjectives.length)] + ", " + pets.Adjectives[Math.floor(Math.random() * pets.Adjectives.length)];
  }
  random = Math.random();
  switch (true) {
    case (random < 0.8):
      anim = pets.Animals[Math.floor(Math.random() * pets.Animals.length)];
      break;
    default:
      anim = "hybrid of " + pets.Animals[Math.floor(Math.random() * pets.Animals.length)] + " + " + pets.Animals[Math.floor(Math.random() * pets.Animals.length)];
  }

  random = Math.random();
  switch (true) {
    case (random < 0.6):
      size = "small,";
      hd = "d4"
      carry = "This pet can be carried in a single inventory slot."
      food = "Costs 1gp a year for food, doesn't take up space."
      ac = "10"
      dmg = "equal to half their level, rounded down."
      hp = Math.floor(Math.random() * 4) + 1;
      break;
    case (random < 0.8):
      size = "";
      hp = Math.floor(Math.random() * 6) + 1;
      hd = "d6"
      carry = "This pet can be carried, but it takes both hands and 5 inventory slots."
      food = "Eats a half ration every day."
      ac = "13"
      dmg = "equal to their level."
    break;
    default: 
      hp = Math.floor(Math.random() * 8) + 1;
      size = "large,";
      hd = "d8"
      carry = "This pet can carry up to 3 slots of items OR wear fitted armor (AC 14)."
      food = "Eats 1 ration every day."
      ac = "11"
      dmg = "equal to 1.5x their level, rounded down."
  }

  document.getElementById("Description").innerHTML = "A " + size + " " + adje + " " + anim + ".";
  document.getElementById("Stats").innerHTML = "<strong>HP:</strong> " + hp + "<br><strong>Hit Die:</strong> " + hd + "<br><strong>AC:</strong> " + ac;
  document.getElementById("DMG").innerHTML = "<strong>DMG:</strong> Attacks/Abilities deal damage " + dmg + " <br><i>If a pet doesn't have an obvious way to attack threats, then it probably can't deal damage at all.</i>";
  document.getElementById("Food").innerHTML = "<strong>Feeding:</strong> " + food;
  document.getElementById("Carry").innerHTML = carry;


  document.getElementById("Loco").innerHTML = "<strong>Locomotion:</strong> " + loco;
  document.getElementById("Background").innerHTML = "<strong>Background:</strong> " + back;
  document.getElementById("Quir").innerHTML = "<strong>Quirk:</strong> " + quir;
  document.getElementById("Abil").innerHTML = "<strong>Ability:</strong> " + abil;
  

  document.getElementById("petCard").style = "margin-bottom: 30px;";

}