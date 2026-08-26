---
date: 2019-10-01
layout: full-page
title: Mechs in Motion Action Tracker
permalink: mechsinmotion
published: true
hide_description: true
image: /assets/generator_resources/mechHexes/mechLogo.png
description: >
  An online tracker for Mechs in Motion
---

<div class="mechCard">
  <h3>Edit the text box to configure your Action Tracks</h3>
  <div class="row">
    <div class="col-4">
      <textarea id="quickEntry">Petrichor4qmmmmq&#10;
Absalom-33mmqfqoq&#10;
Titania6pmmppmqbppqmpp&#10;
Margreave3mqqoq&#10;
Berserker5mmmmqq&#10;
Assault4mwwmqs&#10;
Elite4qmmmqqmmmuf&#10;
Goliath3qsm&#10;
Priest5qqmmmmr</textarea>
    </div>
    <div class="col-8">
      <table id="motionKey">
        <tr>
        <td><img class="actionImg" src="/assets/generator_resources/mechHexes/boostmovehex.png"></td>
        <td><img class="actionImg" src="/assets/generator_resources/mechHexes/extraactivationhex.png"></td>
        <td><img class="actionImg" src="/assets/generator_resources/mechHexes/freeactionhex.png"></td>
        <td><img class="actionImg" src="/assets/generator_resources/mechHexes/movehex.png"></td>
        <td></td>
        </tr>
        <tr>
          <td>
            B = Boost
          </td>
          <td>
            N = NPC
          </td>
          <td>
            F = Free
          </td>
          <td>
            M = Move
          </td>
          <td>
          </td>
          </tr>
          <tr>
          <td><img class="actionImg" src="/assets/generator_resources/mechHexes/fullaction1hex.png"></td>
          <td><img class="actionImg" src="/assets/generator_resources/mechHexes/fullaction2hex.png"></td>
          <td><img class="actionImg" src="/assets/generator_resources/mechHexes/protocolhex.png"></td>
          <td><img class="actionImg" src="/assets/generator_resources/mechHexes/quickactionhex.png"></td>
          <td><img class="actionImg" src="/assets/generator_resources/mechHexes/reacthex.png"></td>
          </tr>
          <tr>
          <td colspan="2">
            U = Full
          </td>
          <td>
            P = Protocol
          </td>
          <td>
            Q = Quick
          </td>
          <td>
            R = Reaction
          </td>
        </tr>
        <tr>
          <td><img class="actionImg" src="/assets/generator_resources/mechHexes/superheavyhex1.png"></td>
          <td><img class="actionImg" src="/assets/generator_resources/mechHexes/superheavyhex2.png"></td>
          <td><img class="actionImg" src="/assets/generator_resources/mechHexes/waithex.png"></td>
          <td><img class="actionImg" src="/assets/generator_resources/mechHexes/overchargehex.png"></td>
                    <td></td>
        </tr>
        <tr>
          <td colspan="2">
            S = Superheavy
          </td>
          <td>
            W = Wait
          </td>
          <td>
            O = Overcharge
          </td>
          <td></td>
        </tr>
      </table>
    </div>
  </div>
  <hr>
  <button class="shadow-button" type="button" onclick="startRound()">Start Round</button>
  <button class="shadow-button" type="button" onclick="nextAction()">Next
    Action</button>
  <button class="shadow-button" type="button" onclick="endRound()">End Round</button>
  <hr>
<div id="alertModal">
  <div id="ebcf_modal-content">
    <span id="ebcf_close">&times;</span>
    <h2>Check for End of Round Effects!</h2>
  </div>
</div>

  <table id="mechtracks"></table>
</div>

|![assets/generator_resources/mechHexes/lancerLogo.png](assets/generator_resources/mechHexes/lancerLogo.png)|Mechs in Motion is not an official Lancer product; it is a third party work, and is not affiliated with Massif Press. Mechs in Motion is published via the Lancer Third Party License. Lancer is copyright Massif Press.<br>The third party license language is also accessible at [https://massif.netlify.app/legal](https://massif.netlify.app/legal), where a white-on-black version of the 3rd party logo is also available.|

<!--Necessary for allowing the sticky buttons and background changes-->
<style>

hy-push-state, hy-drawer {
overflow: clip;
display: contents;
}

</style>

<script async src="/assets/generator_resources/mechsinmotion.js" language="javascript" type="text/javascript"></script>
