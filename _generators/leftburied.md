---
date: 2019-09-01
layout: project
title: Best Left Buried Character Generator
permalink: leftburiedgenerator
published: true
hide_description: true
image: /images/blb_logo.png
description: >
  A mobile-friendly Character Generator for the Best Left Buried RPG.
---

Best Left Buried is an fantasy horror game that threatens your characters' sanities as much as their lives. [Buy it Here](https://www.drivethrurpg.com/product/254584/Best-Left-Buried-Full-Rules)! 

How to use this Generator:

- **Archetype Generation** attempts to create a character with useful equipment and advancements. 
- **Random Generation** is chaotic and unpredictable. 
- **Check the Human** Only box to avoid other ancestries. 

<div class="leftburied-log">
  <button class="leftburied-button" type="button" onclick="blb_generate('archetype')">Archetype Generation</button>
  <button class="leftburied-button" type="button" onclick="blb_generate('random')">Random Generation</button>
  <div class="leftburied-check">
    <input type="checkbox" id="humanBox" name="humanBox" class="leftburied-checkbox">
    <label for="humanBox" style="cursor:pointer;">Humans Only</label>
  </div>
</div>
<hr class="leftburied-hr">
<div class="leftburied-character" id="leftburiedCharacter" style="display:none;">
  <p style="text-align:center;"><strong>Save your character</strong>: bookmark this page, <span id="saveCharacter">copy this link</span>, or <a href="" onclick="window.print();return false;">print it out</a>.</p>
  <div class="row" style="justify-content:space-around;">
    <div class="col-12 col-sm">
      <h2 id="charName">Character Name</h2>
      <div id="description">Description</div>
      <div class="row" style="justify-content:space-around;">
          <div class="leftburied-stat sketchy">
            <h3 id="charBR">1</h3>
            <h2>Brawn</h2>
          </div>
          <div class="leftburied-stat sketchy">
            <h3 id="charVIG">1</h3>
            <h2>Vigour</h2>
          </div>
          <div class="leftburied-stat sketchy">
            <h3 id="charWIT">1</h3>
            <h2>Wit</h2>
          </div>
          <div class="leftburied-stat sketchy">
            <h3 id="charGRIP">1</h3>
            <h2>Grip</h2>
          </div>
          <div class="leftburied-stat sketchy">
            <h3 id="charWILL">1</h3>
            <h2>Will</h2>
          </div>
          <div class="leftburied-stat sketchy">
            <h3 id="charARM">1</h3>
            <h2>Armour</h2>
          </div>
      </div>
    </div>
    <div class="col-12 col-sm">
      <h2>Equipment</h2>
      <p id="charSlotLimit"></p>
      <p id="charItems"></p>
    </div>
  </div>
  <hr>
  <h2>Abilities</h2>
  <div id="charAbilities" class="row" style="justify-content:center;">
  </div>
</div>

Commissioned by SoulMuppet Publishing.

<style>

  @media print {
    #leftburiedCharacter {
        background-color: white;
        /*height: 100%;*/
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        margin: 0;
        padding: 15px;
        z-index:99;
    }

    a {
      text-decoration: none;
    }
}
</style>

<script async src="/assets/js/seedrandom.min.js" language="javascript" type="text/javascript"></script>
<script async src="/assets/generator_resources/leftburied.js" charset="utf-8"></script>
