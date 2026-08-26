---
date: 2019-11-01
layout: full-page
title: Wyrd Hunt Generator
permalink: wyrdhuntgenerator
published: true
redirect_from:
  - "/fakeurl"
hide_description: true
image: /images/posts/wyrd_generator.png
description: >
  A mobile-friendly Hunt generator for the Wyrd and Wild.
---

<div class="shadow-card">
  <div class="shadow-text">
    <div class="row">
      <div class="col-12 col-md-5" style="text-align:center;">
        <div class="logItem"><a onclick="newHunt()"><h3>Begin New Hunt</h3></a></div>
        <p id="huntText" style="text-align:left;">Simply click the button above to generate a Wyrd Hunt. It includes a map, 6 locations, random encounters, and more; all at the click of a button. If you like what you see, you'll love the full book even more!</p>
        <p id="saveHunt" style="text-align:center;"></p>
        <div id="mapIMG"></div>
      </div>
      <div class="col-12 col-md-7">
        <div id="logContent" class="row" style="justify-content:center;margin-bottom:50px;">
        <h3><i>The woods do not care for you. Never forget that.</i></h3>
        <p>Into the Wyrd and Wild is a supplemental book for those seeking to incorporate a weird and terrifying wilderness into their role-playing game. Players and GMs who enjoy a level of horror and prefer the sweeping, darkened landscapes of forest and mires to the well-trodden cobblestone of dungeons need look no further when it comes to books. Presented within the book is a light overhaul of the adventuring system, modified to fit better with a campaign centered around forays into the frightening wilderness.</p>
        </div>
        <div id="locationText"></div>
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
<script async src="/assets/generator_resources/wyrdhunt.js" language="javascript" type="text/javascript"></script>