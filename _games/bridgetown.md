---
date: 2023-01-13
layout: project
title: Bridgetown
caption: $30 Adventure
screenshot:
  src: /images/Bridgetown_Header.png
image: /images/Bridgetown_Header.png
hide_description: true
permalink: bridgetown
featured: false
---

Bridgetown is a pastoral, liminal RPG setting of a never-ending, ever-crumbling bridge. Built for [Troika](https://www.troikarpg.com/), usable anywhere.

Use the free One-Shot Generator to get a custom section of the Bridge with NPCs, Events, Weather, and a custom map! It's a great taste of what the book contains.

*96 pages, color interior, A5 digest hardcover book.*

<div class="shopping-buttons">
<a target="_blank" href="https://technicalgrimoire.itch.io/bridgetown" class="btn btn-primary itchBTN">Digital: $15<br>at Itch.io</a>
<a target="_blank" href="https://spearwitch.com/products/bridgetown" class="btn btn-primary spearBTN">Hardcover: $30<br>Spear Witch (US)</a>
<a style="background-color:#63316b;color:white" class="btn btn-primary">Hardcover COMING SOON<br>Soul Muppet (UK)</a>  
<a target="_blank" href="https://spacecowgirldice.com/products/bridgetown-dice-set-preorder" style="background-color:#d5a5bb;color:white" class="btn btn-primary">Cobblestone Dice<br>from Space Cowgirl</a>  
<a target="_blank" href="https://plusoneexp.com/collections/frontpage/products/bridgetown-beard-skin-balm" style="background-color:#800000;color:white" class="btn btn-primary">Beard/Skin Balm<br>from Plus One Exp</a>  

</div>

<div class="shopping-buttons">
<a target="_blank" href="/files/Bridgetown_sheets.pdf" class="btn btn-primary">Character Sheets,<br>Handouts, and Maps</a>
<button class="btn btn-primary" onClick="document.getElementById('spanImage').scrollIntoView();">One-Shot Generator</button>
<a target="_blank" href="/troikagenerator?mode=bridgetown" class="btn btn-primary">Generate a Character</a>
</div>

<div id="images" class="shopping-images">
<p style="margin: 0px;padding:0px;text-align:center;font-style:italic;">Click to view.</p>
<img src="/images/bridgetown/hardcoverMockup.png" alt="hardcoverMockup.png">
<img src="/images/bridgetown/bt_spread1.png" alt="bt_spread1.png">
<img src="/images/bridgetown/bt_map1.png" alt="bt_map1.png">
<img src="/images/bridgetown/bt_spread2.png" alt="bt_spread2.png">
<img src="/images/bridgetown/bt_spread3.png" alt="bt_spread3.png">
<img src="/images/bridgetown/bt_team.png" alt="bt_team.png">
</div>

Featuring flavorful backgrounds, a new spellcasting system, dozens of stew recipes, and a way to connect your Troika worlds together, we’re confident Bridgetown can find a home at almost any gaming table.

Within it's 96 pages you will find:

- **12 Backgrounds**. Play as a Goat-folk pilgrim, bug-sized Coblin swarms, or a pile of haunted rocks.
- **12 locations**. Cramped cities, mossy spans, crumbling gaps.
- **8 Gatehouses**. These fortresses demand tolls, harass travelers, and hinder your journey.
- **Stone Soup Campaign**. Gain an overpowered magic item and experiment with dangerous recipes as you explore the Bridge in search of rare ingredients.
- **Random Tables**: 6 Weird Birds, 36 Weather Events, 12 Magical Stones, and more.
- **Keystone Spells**, Troll-Croak magic, and a healthy helping of chaotic Troika charm.
- **Provisions-based economy**. Food is money! Water is gold! And you are poor and starving!

## What People are Saying

> “Even though the Bridge is technically bounded, all the little bits sparked ever-branching growth in my mind.” - Ben, playtester

> “I felt like my character was really driven and highly motivated to explore every nook and cranny.” - Neal, playtester

> “I need to know more! Each location felt so engaging and lively.” - Jeremy, playtester

> “I’m still not happy with it.” - Furtive Goblin, a lead writer

## What Makes Bridgetown Different?

**Pastoral**: Upstart humans ply their trades on cobbled streets amid hoary old Trolls and restless, goateed Gruffolk, while huddles of little Coblins scurry underfoot. Metal is rare, stone is crumbling, and fertile soil is one of the most valuable commodities.

**Liminal**: The Bridge is a narrow band of solid ground straddling the gap between the Infinite Sky above and the murky depths of the Under. It is a dizzying and impossible world, but it is home to you and countless others.

**A Bridge To Elsewhere?** Every now and then, something especially peculiar happens. The Under spits up something real or things drop out of the Infinite Sky. Rarer still, sometimes those things are people. These strange out-of-towners claim they’re from other places, spreading nonsense tales of other worlds beyond the Bridge.

<hr class="endShoppingImages">

## One-Shot Generator

Playtesting has shown that 3 Bridgetown locations are enough to fill an entire gaming session with adventure. Simply click the location buttons below, and you're ready to run a one-shot gaming session! This is just a taste of what's contained within the full Bridgetown book.

<button style="background-color:#D4CCCC;color:black;" class="btn btn-primary" onClick="generateSpan()">Generate a New One-Shot</button>

<div id=spanImage></div>

<div class="shopping-buttons">
<button id="loc1Button" class="leftburied-button" type="button" onclick="showLocation(0)">Location 1</button>
<button id="loc2Button" class="leftburied-button" type="button" onclick="showLocation(1)">Location 2</button>
<button id="loc3Button" class="leftburied-button" type="button" onclick="showLocation(2)">Location 3</button>
</div>

<div id="bridgetownDiv" style="display:none;">

  <h2 id="locName">Location 1</h2>

  <p id="locQuote">What a crazy thing!</p>
  <p id="locQuoter">Someone weird</p>
  <p id="locDescription">This place is wild! Filled with stuff for sure.</p>

  <h3 id="locHeader2">Mr. Person</h3>
  <div id="locSection2">They have a face for sure.</div>

  <h3 id="locHeader3">Taco Tuesday</h3>
  <div id="locSection3">Yummy!</div>

  <h3 id="weather">It's Hot</h3>
  <p id="weatherDescription">Far too hot.</p>
  
  <div class="shopping-buttons">
<button class="leftburied-button" type="button" onclick="changeWeather()">Change Weather</button>
</div>

</div>

<link href="/assets/viewer.css" rel="stylesheet">
<script>
window.addEventListener('DOMContentLoaded', function () {
  var galley = document.getElementById('images');
  var viewer = new Viewer(galley,{navbar: 0, title:0, toolbar:0});
});
</script>
<script async src="/assets/generator_resources/bridgetown.js" language="javascript" type="text/javascript"></script>
