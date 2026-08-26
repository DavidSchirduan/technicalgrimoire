---
date: 2022-10-23
layout: full-page
title: Cess & Citadel Intersection Generator
permalink: cess-intersection
published: true
hide_description: true
image: /images/CessMaps/cover.png
description: >
  A mobile-friendly city intersection generator for the Cess & Citadel.
---

<div class="shadow-card">
  <div class="shadow-text">
    <div class="row">
      <div class="col-12 col-lg-8">
        <h2 style="text-align: center;">Intersection of ...</h2>
        <div id="logContent" class="row" style="justify-content:center;align-items: center;margin-bottom:30px;">
          <div id="street1" class="cessBlock col-12 col-lg-4"></div>
          <div class="cessBlock col-2"><h2>&</h2></div>
          <div id="street2" class="cessBlock col-12 col-lg-4"></div>
        </div>
        <h2 style="text-align: center;">City Block Locations</h2>
        <p id="blockDetails"></p>
        <div id="logContent" class="row" style="justify-content:space-evenly;margin-bottom:30px;">
          <div id="blueBlock" class="cessBlock col-12 col-lg-5"></div>
          <div id="greenBlock" class="cessBlock col-12 col-lg-5"></div>
        </div>
        <div id="logContent" class="row" style="justify-content:space-evenly;margin-bottom:30px;">
          <div id="redBlock" class="cessBlock col-12 col-lg-5"></div>
          <div id="yellowBlock" class="cessBlock col-12 col-lg-5"></div>
        </div>
        <h2 style="text-align: center;"><i>This city eats people. Never forget that.</i></h2>
      </div>
      <div class="col-12 col-lg-4">
        <div id="logContent" class="row" style="justify-content:space-evenly;margin-bottom:30px;">
          <div class="logItem col-12 col-lg-6"><a onclick="generateNPC()"><h3>NPC</h3></a></div>
          <div class="logItem col-12 col-lg-6"><a onclick="randEncounter()"><h3>Encounter</h3></a></div>
        </div>
        <div id="randBtn"></div>
        <div id="mapIMG"></div>
        <div class="logItem"><a onclick="generateIntersection()"><h3>Generate Another Intersection</h3></a></div>
        <div id="bookDeets"><p>All of the content in this generator comes directly from <a href="https://www.thiscityeatspeople.com/">Into the Cess and Citadel</a>.</p>
        <p>It is a supplemental TTRPG book for those seeking to incorporate a strange, colorful, and terrifying city into their role-playing game. Presented within the book is a comprehensive guide to running adventures or campaigns within a fantastical city, along with an overhaul of the adventuring system to better accommodate the unique challenges and benefits of a sprawling urban environment.<a href="https://www.thiscityeatspeople.com/">Buy it here!</a></p></div>
      </div>
    </div>
  </div>
</div>

<!--Necessary for allowing the sticky buttons and background changes-->
<style>
  body {
    background-color: #313131;
    color: #F5F5F5;
  }
  hy-push-state, hy-drawer {
  overflow: clip;
  display: contents;
  }
  .shadow-text h3,h2 {
  margin-top: 0px;
  }

</style>

<script async src="/assets/js/seedrandom.min.js" language="javascript" type="text/javascript"></script>
<script async src="/assets/generator_resources/cess.js" language="javascript" type="text/javascript"></script>