---
date: 2019-10-01
layout: full-page
title: Hot Springs Generator
permalink: hotspringsgenerator
published: true
image: /images/hsi.png
hide_description: true
description: >
  A mobile-friendly tool for Hot Springs Island.
---

Hot Springs Island is one of the most imaginative, easy to use, and enjoyable tabletop supplements I've ever read. [**Buy it here**](http://shop.swordfishislands.com/). If you need creature stats or shop inventory grab my [reference handout here](/files/HotSpringsReference.pdf).

<div class="row" style="justify-content: space-around !important;margin-bottom:30px;">
  <div class="col-md-5 col noPadding">
  <a class="btn btn-black" onclick="hsi_showCard('overland')">
  <h2 class="tightSpacing">Overland</h2></a></div>

  <div class="col-md-5 col noPadding">
  <a class="btn btn-black" onclick="hsi_showCard('location')">
  <h2 class="tightSpacing">Locations</h2></a></div>
</div>

<div class="container generatorCard" id="overlandCard" style="margin-bottom: 30px;display:none;">
<div class="row">
  <div class="col-md-3 col noPadding"><button class="btn btn-black" onclick="hsi_Overland('Light')">Light</button></div>
  <div class="col-md-3 col noPadding"><button class="btn btn-black" onclick="hsi_Overland('Heavy')">Heavy</button></div>
  <div class="col-md-3 col noPadding"><button class="btn btn-black" onclick="hsi_Overland('Mountainous')">Mountainous</button></div>
  <div class="col-md-3 col noPadding"><button class="btn btn-black" onclick="hsi_Overland('Volcano')">Volcano</button></div>
  <div class="col noPadding"><button class="btn btn-black" onclick="hsi_Overland('Volcanic')">Volcanic</button></div>
  <div class="col noPadding"><button class="btn btn-black" onclick="hsi_Overland('Ruins')">Ruins</button></div>
  <div class="col noPadding"><button class="btn btn-black" onclick="hsi_Overland('Village')">Village</button></div>
  </div>
  <div id="overlandData" class="HSItabcontent">
  </div>
</div>

<div class="container generatorCard" id="locationCard" style="margin-bottom: 30px;display:none;">
  <div class="row">
    <div class="col noPadding"><button class="btn btn-black" onclick="hsi_Locations('Ashfire Mine')">Ashfire Mine</button></div>
    <div class="col noPadding"><button class="btn btn-black" onclick="hsi_Locations('Boar’s Head Encampment')">Boar’s Head</button></div>
    <div class="col noPadding"><button class="btn btn-black" onclick="hsi_Locations('Crystal SeaCave')">Crystal SeaCave</button></div>
    <div class="col noPadding"><button class="btn btn-black" onclick="hsi_Locations('Crystalflow')">Crystalflow</button></div>
    <div class="col-md-4 col noPadding"><button class="btn btn-black" onclick="hsi_Locations('Dire Boar Den')">Dire Boar Den</button></div>
    <div class="col-md-4 col noPadding"><button class="btn btn-black" onclick="hsi_Locations('Glavrok Village')">Glavrok Village</button></div>    
    <div class="col-md-4 col noPadding"><button class="btn btn-black" onclick="hsi_HotSpringsCity()">Hot Springs City</button></div>
    <div class="col-md-4 col noPadding"><button class="btn btn-black" onclick="hsi_Locations('Lapis Observatory')">Lapis Observatory</button></div>
    <div class="col-md-4 col noPadding"><button class="btn btn-black" onclick="hsi_Locations('New Moon Party')">New Moon Party</button></div>
    <div class="col-md-4 col noPadding"><button class="btn btn-black" onclick="hsi_Locations('Shattered Aquifer')">Shattered Aquifer</button></div>
    <div class="col-md-4 col noPadding"><button class="btn btn-black" onclick="hsi_Locations('Slave Quarters')">Slave Quarters</button></div>
    <div class="col-md-4 col noPadding"><button class="btn btn-black" onclick="hsi_Locations('Svarku’s Lair')">Svarku’s Lair</button></div>
    <div class="col-md-4 col noPadding"><button class="btn btn-black" onclick="hsi_Locations('Temple of Tranquility')">Temple of Tranquility</button></div>
  </div>
  <div class="HSItabcontent" id="locationData">
  </div>
</div>

<div class="row" style="justify-content: space-around !important;margin-bottom: 30px;">
  <div class="col-md-3 col noPadding"><button class="btn btn-black" onclick="hsi_treasure()"><h2 class="tightSpacing">Treasure</h2></button></div>
  <div class="col-md-3 col noPadding"><button class="btn btn-black" onclick="hsi_rumors()"><h2 class="tightSpacing">Rumors</h2></button></div>
  <div class="col-md-3 col noPadding"><button class="btn btn-black" onclick="hsi_golems()"><h2 class="tightSpacing">Golems</h2></button></div>
</div>

<div class="container generatorCard" id="extraCard" style="margin-bottom: 30px;display:none;">
  <div class="HSItabcontent" id="extraData">
  </div>
</div>

<style>

hy-push-state, hy-drawer {
overflow: clip;
display: contents;
}

</style>

**Thanks to:**

 - [Jacob Hurst](https://twitter.com/vyderac) for writing Hot Springs Island and making it such a beautiful, wonderful world to explore. Also thanks for encouraging me in making this generator, and all fan projects!
 - [Christopher P. Wolf](http://chrispwolf.com/) for the code that inspired these generators.
 - And to the [OSR community](https://discord.gg/kJjMvC) for being such an encouraging, welcoming place.

<script async src="/assets/generator_resources/droll.js"></script>
<script async src="/assets/generator_resources/hsi.js" charset="utf-8"></script>