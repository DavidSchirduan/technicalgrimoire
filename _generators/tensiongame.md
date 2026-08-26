---
date: 2019-01-12
layout: full-page
title: Tension Minigame
permalink: tensiongame
hide_description: true
published: true
image: /images/posts/jenga-colorful.jpg
description: >
  A hand-eye coordination game similar to Jenga
---

A minigame that requires similar hand-eye coordination as pulling Jenga blocks. The more blobs you shoot, the more difficult things get. If you miss, Game Over! 

<div id="jenga-buttons" class="row" style="justify-content: space-around !important;margin-bottom:30px;">
  <!-- throwBalls(gameName, numBalls, ballSize, ballSpeed) -->
  <div class="col-md-4 col">
  <a class="btn jenga-dread-btn" onclick="window.newGame('dread', 7, 60)"><h3 class="tightSpacing">Dread</h3>Default Settings</a></div>

  <div class="col-md-4 col">
  <a class="btn jenga-star-btn" onclick="window.newGame('star', 5, 80)"><h3 class="tightSpacing">StarCrossed</h3>Large, fast blobs</a></div>

  <div class="col-md-4 col">
  <a class="btn jenga-wretched-btn" onclick="window.newGame('wretched', 10, 40)"><h3 class="tightSpacing">Wretched</h3>Small, slow blobs</a></div>
</div>

<h2 style="text-align:center;" id="jengaScore">Select a Game Type above to begin.</h2>

<div id="jenga-div">
    <canvas id="jenga-canvas" resize="true"></canvas>
</div>

### Explanation

I want to play games like Dread, Star Crossed, and The Wretched. But I don't have a Jenga tower, and I couldn't play it remotely with friends...so I made my own version.

This minigame is less concerned with replicating the statical patterns of Jenga, and more focused on replicating the feel, the **tension** of playing Jenga.

Pulling blocks is mostly an exercise in patience. For the first few pulls there are plenty of loose bricks to choose from. After a dozen pulls, things start to get tricky.

Unlike Jenga individual players don't impact one another. I recommend each player share their game screen to simulate this group tension.

If you have suggestions for improving the game, please let me know!

<p><i>Cover Image by <a href="https://pixabay.com/users/thekurupi-3657708/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=4027763">Fernando FLeitas</a> from <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=4027763">Pixabay</a></i></p>

<style>
  body {
    background-color: #313131;
    color: #F5F5F5;
  }
  body a {
    color: #F5F5F5;
  }
    hy-push-state, hy-drawer {
  overflow: clip;
  display: contents;
  }

/* Scale canvas with resize attribute to full size */
canvas[resize] {
    width: 100%;
    height: 100%;
    background-color:#313131;
}
</style>

<script async src="/assets/js/paper-full.js" type="text/javascript"></script>

<script async src="/assets/generator_resources/tensionMinigame.js" type="text/paperscript" canvas="jenga-canvas" hidpi="off"></script>