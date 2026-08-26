---
date: 2020-09-03
layout: post
title: What Weapon Are You?
categories: Tabletop
tags: lies
image: /images/posts/temperedlegacyQUIZ.png
published: true
---

Your mind is a weapon, and your body a sheathe. But what of your soul? What form would your soul take?

Take the Tempered Weapon Quiz below to discover the form of your soul-blade-mind-weapon-person.

### Answer Truthfully

If you can't be honest with your inner weapon, then you'll never know the truth.

<form action="" method="" class="formCard">
  <div class="form-example">
    <label for="toes">What is your favorite toe? </label>
    <input type="text" name="toe">
  </div>
  <div class="form-example">
    <label for="pizza">Choose one: </label>
    <select name="pizza">
      <option value="">Choose Wisely</option>
      <option value="dog">Bad Day by Daniel Powter</option>
      <option value="cat">Pizza Pizza Pizza</option>
      <option value="hamster">Both</option>
      <option value="parrot">Extra Pineapple</option>
      <option value="goldfish">Goldfish</option>
    </select>
  </div>
  <div class="form-example">
    <label for="tea">It's time to drink tea. DRIIINK? </label>
    <input type="text" name="tea">
  </div>
  <div class="form-example">
    <label for="lying">Is this question a lie?</label>
    <select name="lying">
      <option value="">Choose Wisely</option>
      <option value="dog">No</option>
      <option value="cat">Yes</option>
      <option value="cat">Pizza Pizza Pizza</option>
    </select>
  </div>
  <div class="form-example">
    <label for="smash">Smash your keyboard REAL hard:</label>
    <input type="text" name="smash">
  </div>
    <div class="form-example">
    <label for="smash">Did you really smash your keyboard?</label>
        <select name="lying">
      <option value="">Be Honest</option>
      <option value="dog">No</option>
      <option value="cat">No</option>
      <option value="cat">No</option>
      <option value="cat">No</option>
      <option value="cat">No</option>
      <option value="cat">No</option>
      <option value="cat">No</option>
      <option value="cat">No</option>
      <option value="cat">No</option>
      <option value="cat">No</option>
      <option value="cat">No</option>
      <option value="cat">No</option>
      <option value="cat">No</option>
      <option value="cat">No</option>
      <option value="cat">Seiously, don't do that!</option>
    </select>
  </div>
</form>

<div class="row centerButtons">
  <div class="col-md-6 col-12">
    <button class="btn tempered-btn notransition" onclick="quiz_generate()">
      <h3 id="wpnBtn">Discover your Inner Weapon</h3>
    </button>
  </div>
</div>

<div class="container generatorCard" id="weaponCard" style="display:none;">
  <div style="display:flex;justify-content:space-between;">
    <h2 id="weaponName" style="margin-top:0px;">Silver Rapier</h2>
    <button id="downloadBTN" class="btn tempered-btn-sm data-html2canvas-ignore" onclick="quiz_saveWeaponIMG()" style="min-width:160px;margin-bottom:auto;">
      <p>DOWNLOAD</p>
    </button>
  </div>
  <p id="weaponDesc">A simple but well-crafted blade</p>
  <p><img id="weaponImg" src="/images/TemperedWeapons/Sword.png" style="background: black; width: 100%;"></p>
</div>

*this test is utter crap and also a lying liar. But if you like the weapon you can find more like it in [Tempered Legacy](/tempered-legacy).*

<script async src="/assets/js/mods-eng-basic.js" language="javascript" type="text/javascript"></script>
<script async src="/assets/js/tracery.js" language="javascript" type="text/javascript"></script>
<script async src="/assets/js/html2canvas.min.js" language="javascript" type="text/javascript"></script>
<script async src="/assets/generator_resources/temperedquizgenerators.js" language="javascript" type="text/javascript"></script>
