---
date: 2019-03-01
layout: project
title: Monster Parts Generator
permalink: monsterparts
published: false
hide_description: true
image: /images/monsterparts.jpg
description: >
  Generate unique creatures.
comments: true
---

This generator aims to help Game Masters come up with unique creatures. Use these results as a starting skeleton and flesh them out with your own descriptions and lore. Put your completed monsters in the comments so we can all enjoy them!

<button id="monsterButton" class="btn btn-primary btn-lg" onclick="mp_monster()">Generate Monster</button>

<div id="monsterCard" class="container" style="display:none;">
  <div class="row" style="justify-content: space-around !important;">
		<div class="col-12 tightSpacing generatorCard">
      <h2 id="creatureTitle" class="tightSpacing">Role: Blank</h2>
      <p id="trait1Desc">This part described how the Role works and what it does</p>
      <p id="trait2Desc">This part described how the Role works and what it does</p>
      <p id="flawDesc">This part described how the Role works and what it does</p>
		  <p class="tightSpacing" id="roleDesc"></p>
		  <p class="tightSpacing" id="typeDesc"></p>
    </div>
	</div>
</div>
<p><small>You can contribute to the generator by <a href="https://docs.google.com/spreadsheets/d/1W7Yw_iVHe792CmeQgMg356SoxW8LCC3_oXBr3FlRdjE/edit?usp=sharing">adding to this document</a> (or simply look at all the cool options).</small></p>
<p><small>Thanks to Curio Solus for inspiring this idea and doing the bulk of the work. 
<a href="http://chrispwolf.com/">Christopher P. Wolf</a> for the code that inspired these generators. And to the <a href="https://discord.gg/kJjMvC">OSR community</a> and <a href="https://discord.gg/hUDPZu">Knave community</a> for being such an encouraging, welcoming place. 
<a href="https://www.flickr.com/photos/britishlibrary/11300855894/">Monster Image</a> from “Historisches Festbuch zur Basler Vereinigungsfeier, 1892”</small></p>

<script>
var mp_xmlhttp = new XMLHttpRequest();
mp_xmlhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    monsterparts = JSON.parse(this.responseText);
  }
};
mp_xmlhttp.open("GET", "/assets/generator_resources/monsterparts.json", true);
mp_xmlhttp.send();

function mp_monster() {

  document.getElementById("monsterCard").style = "";

  /*0 = name
    1 = descr
    2 = contr*/

  var role = monsterparts.Roles[Math.floor(Math.random() * monsterparts.Roles.length)];
  var type = monsterparts.Types[Math.floor(Math.random() * monsterparts.Types.length)];
  var flaw = monsterparts.Flaws[Math.floor(Math.random() * monsterparts.Flaws.length)];
  var traits = monsterparts.Traits;
  var trait1 = traits.splice(Math.floor(Math.random() * traits.length), 1)[0];
  var trait2 = traits.splice(Math.floor(Math.random() * traits.length), 1)[0];

  document.getElementById("creatureTitle").innerHTML = role[0] + " " + type[0];

  document.getElementById("roleDesc").innerHTML = role[1];
  document.getElementById("typeDesc").innerHTML = type[1];

  /*If contributor blank, don't show*/
  traitCont1 = trait1[1];
  traitCont2 = trait2[1];

  if (traitCont1 != ""){
    traitCont1 = "<small><br> - Contributed by " + trait1[1] + "</small>";
  }
  if (traitCont2 != ""){
    traitCont2 = "<small><br> - Contributed by " + trait2[1] + "</small>";
  }

  flawCont = flaw[1];

  if (flawCont != ""){
    flawCont = "<small><br> - Contributed by " + flaw[1] + "</small>";
  }
  
  document.getElementById("trait1Desc").innerHTML = "<strong>Trait:</strong> " + trait1[0] + traitCont1;

  document.getElementById("trait2Desc").innerHTML = "<strong>Trait:</strong> " + trait2[0] + traitCont2;
  
  document.getElementById("flawDesc").innerHTML =  "<strong>Flaw:</strong> " + flaw[0] + flawCont;

}

</script>