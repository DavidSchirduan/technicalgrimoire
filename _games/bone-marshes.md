---
date: 2019-06-01
layout: project
title: The Bone Marshes
redirect_from:
  - "/bmchargen"
  - "/marsh-goons"
caption: $20 Adventure
screenshot:
  src: /images/BoneMarshes_Header.png
image: /images/BoneMarshes_Header.png
hide_description: true
permalink: bone-marshes
featured: false
---

Bone Marshes is a tabletop adventure about getting lost in a burning marsh. It’s tailor-made for groups that enjoy exploring complex spaces and drawing maps. It contains the adventure and a complete set of rules. *64 pages, color interior, US Letter sized softcover.*

Now includes "Marsh Goons" by [Joe Banner](https://joebanner.co.uk/), adding over a dozen pages of new content, an alternate rules system, new maps, new art, and more!


<div class="shopping-buttons">
<a class="btn btn-primary spearBTN">Print+PDF: SOLD OUT</a>
<a target="_blank" href="https://davidschirduan.itch.io/bone-marshes" class="btn btn-primary itchBTN">Digital: $10<br>at Itch.io</a>
</div>

<div class="shopping-buttons">
<a target="_blank" href="/files/BoneMarshes_CharacterSheets.pdf" class="btn btn-primary">Bones Marshes<br>Character Sheets</a>
<a target="_blank" href="/files/MG_CharSheet.pdf" class="btn btn-primary">Marsh Goons<br>Character Sheets</a>
<button class="btn btn-primary" onClick="document.getElementById('generatorHeader').scrollIntoView();">Random Generators</button>
</div>

<div id="images" class="shopping-images">
<p style="margin: 0px;padding:0px;text-align:center;font-style:italic;">Click to view</p>
<img src="/images/BM_pg5.png" alt="BM_pg5.png">
<img src="/images/BM_pg3.jpg" alt="BM_pg3.jpg">
<img src="/images/BM_pg1.png" alt="BM_pg1.png">
<img src="/images/BM_pg4.png" alt="BM_pg4.png">
<img src="/images/BM_pg2.png" alt="BM_pg2.png">
</div>

<h2 style="margin-top:1rem;">The Marshes are burning, and we don't know why...</h2>

The Bone Marshes is an adventure filled with mapping and exploration challenges for the players. It uses special time-keeping and travel rules with player handouts to keep everyone engaged and on the same page in this topsy-turvey land.

The Bone Marshes is a three part adventure module, each of which can be run separately or consecutively. Each part provides 2-4 sessions of gameplay.

**Part I**: The marshes burn from constant daylight. The sun never sets! The mage Azimech recently discovered this terrible situation and has put out a call for adventurers to map safe routes through the flaming swamp.

**Part II**: After the caravan has arrived (thanks to your mapping skills), Azimech needs you to head back out and discover the source of the constant daylight.

**Part III**: Now that she knows the root cause of the problem, she thinks there is a solution. It involves plumbing the depths of the tunnels beneath the marshes, plundering an ancient vault, and returning with valuable artifacts.

## Reviews

 - [**A video review**](https://youtu.be/7D2SLD5gtTw) from Questing Beast.
 - [**Ten Foot Pole**](https://tenfootpole.org/ironspike/?p=6116) called it "One of the Best"!
 - [**Speak With Dead Trees**](https://speakwithdeadtrees.blogspot.com/2020/07/bone-marshes-review.html) praised it as "unique, original, and emblematic of a lot of good things in adventure-writing".

> "Easily one of the best. A 'real' adventure, and there’s not many of those out there." - [tenfootpole.org](https://tenfootpole.org/ironspike/?p=6116)

> "Its content will provide a gaming group with many sessions of entertainment and tales to regal. Bone Marshes is a good investment and a worthwhile quest to take on." - [Rolling Boxcars](https://rollingboxcars.com/2019/09/18/mapping-out-david-schirduans-bone-marshes/)

<hr id="generatorHeader" class="endShoppingImages">

## Character Generator

<div class="row" style="justify-content: space-around !important;margin-bottom:30px;">
  <div class="col-md-5 col-10 noPadding">
    <a class="btn bonemarshes-btn" onclick="bm_generate()">
    <h3>Bone Marshes<br>Generator</h3>
    </a>
  </div>
  <div class="col-md-5 col-10 noPadding">
    <a class="btn bonemarshes-btn" onclick="mg_generate()">
    <h3>Marsh Goons<br>Generator</h3>
    </a>
  </div>
</div>

<div class="container bonemarshesCard" id="bmcharCard">
  <div style="display:flex;justify-content:space-between;">
    <h2 id="bmcharName" style="margin-top:0px;">Johnny</h2>
    <button id="bmdownloadBTN" class="btn bonemarshes-btn-sm data-html2canvas-ignore" onclick="bm_saveCharacterIMG()" style="width:160px;margin-bottom:auto;">
      <p style="margin-bottom: 0;">DOWNLOAD</p>
    </button>
  </div>
  <div class="row">
		<div class="col-6"><h3 id="bmcharHP"></h3></div>
		<div class="col-6"><h3>Lvl: 1</h3></div>
  </div>
  <p id="bmcharHistory"></p>
  <div class="row">
  	<div class="col-md-3 col-6" id="bmcharVirtue"></div>
		<div class="col-md-3 col-6" id="bmcharVice"></div>
		<div class="col-md-3 col-6" id="bmcharPhysique"></div>
		<div class="col-md-3 col-6" id="bmcharSkin"></div>
		<div class="col-md-3 col-6" id="bmcharFace"></div>
		<div class="col-md-3 col-6" id="bmcharHair"></div>
		<div class="col-md-3 col-6" id="bmcharSpeech"></div>
		<div class="col-md-3 col-6" id="bmcharClothing"></div>
		<div class="col-md-6 col-6" id="bmcharSmell"></div>
		<div class="col-md-6 col-6" id="bmcharAllergy"></div>
	</div>
  <hr>
  <div class="row">
		<div class="col-md col-6"><h3 id="bmcharSTR"></h3></div>
		<div class="col-md col-6"><h3 id="bmcharDEX"></h3></div>
		<div class="col-md col-6"><h3 id="bmcharCON"></h3></div>
		<div class="col-md col-6"><h3 id="bmcharINT"></h3></div>
		<div class="col-md col-6"><h3 id="bmcharWIS"></h3></div>
		<div class="col-md col-6"><h3 id="bmcharCHA"></h3></div>
	</div>
  <p style="text-align: right;margin-bottom:0px;"><small><i>You may swap any two ability bonuses</i></small></p>
  <hr>
  <h2 id="bmcharEquip">Equipment</h2>
  <p>You can choose from <strong>any or all</strong> of the items below to fill your inventory slots. Unless otherwise noted, each item takes up one slot.</p>
  <p id="bmcharItems"></p>
</div>

<div class="container bonemarshesCard" id="mgcharCard">
  <div style="display:flex;justify-content:space-between;">
    <h2 id="mgcharName" style="margin-top:0px;">Johnny</h2>
    <button id="mgdownloadBTN" class="btn bonemarshes-btn-sm data-html2canvas-ignore" onclick="mg_saveCharacterIMG()" style="width:160px;margin-bottom:auto;">
      <p style="margin-bottom: 0;">DOWNLOAD</p>
    </button>
  </div>
  <div class="row">
		<div class="col-md col-10"><h3 id="mgcharHP" style="text-align:center;">23</h3></div>
		<div class="col-md col-10"><h3 style="text-align:center;" id="mgcharPOW"></h3></div>
		<div class="col-md col-10"><h3 style="text-align:center;" id="mgcharINS"></h3></div>
		<div class="col-md col-10"><h3 style="text-align:center;" id="mgcharKNO"></h3></div>
	</div>
  <hr>
  <p class="h2" style="margin-top: 10px;" id="mgcharEquip">Starting Equipment</p>
  <p>Choose <strong>three</strong> of the items below to start. Unless otherwise noted, each item takes up one slot.</p>
  <p id="mgcharItems"></p>
</div>

<script async src="/assets/generator_resources/bm_generator.js" charset="utf-8"></script>
<script async src="/assets/generator_resources/mg_generator.js" charset="utf-8"></script>
<script async src="/assets/js/html2canvas.min.js" language="javascript" type="text/javascript"></script>
<link href="/assets/viewer.css" rel="stylesheet">
<script>
window.addEventListener('DOMContentLoaded', function () {
  var galley = document.getElementById('images');
  var viewer = new Viewer(galley,{navbar: 0, title:0, toolbar:0});
});
</script>
