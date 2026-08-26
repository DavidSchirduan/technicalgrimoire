---
date: 2019-01-01
layout: project
title: Weird Pet Generator
permalink: weirdpetgenerator
published: false
hide_description: true
screenshot:
  src: /images/pet_generator.jpg
image: /images/pet_generator.jpg
description: >
  Generate weird pets for your players.
---

## IT'S NOT DONE, OH GOD! DON'T LOOK!

These are brave and true creatures who have dedicated themselves to their owners. They are always doing their best; they cannot lie, deceive or betray. Treat them well, and you'll have a loyal companion even in the darkest of places.

<details>
  <summary>OSR Pet Rules (Click to Expand)</summary>
  <p>None of these pets are sentient. Pets will attempt to satisfy their needs as best as they can. Over time Owners can spend an action to give a trained command using words the pet knows. New Pets start at level 1 and know 1 Word: their name.</p>
  <p>Owners can spend their XP on their pet instead of on themselves. It requires 1/4 of the cost to level up a pet as it does to level an Owner.</p>
  <p><strong>When a pet levels up:</strong>
<br>• Roll a number of Hit Dice equal to their level to determine their new HP. If the total is lower than its previous HP, increase HP by 1.
<br>• Teach your Pet a new Word.</p>
  <p><strong>Pets have 5 Needs</strong>, listed in order of importance. They cannot meet a lower need until all higher needs are met.
<br>1. Safety. They will flee any and all threats. If unable to flee they will fight.
<br>2. Food. Until they are fed for the day they will seek food from nearby allies. If none can be found, they will disappear for 2d6 hours to find food.
<br>3. Information. They will curiously investigate their immediate area; strange sights, sounds, smells, etc.
<br>4. Comfort. Spending time near their owner, warmth, soft ground, etc. 
<br>5. Sleep. If all other needs have been met, they will sleep. After 4 hours of sleep they recover all HP, and will keep sleeping until awakened.</p>
<p>Talk to your group about how/if Pets can perish. <i>Personally I rule that an Owner may absorb any damage their Pet takes whenever they choose.</i></p>
</details>

*These pets are designed to be loved and treasured; animal abuse shouldn't be tolerated at your table. If your players don't want pets, don't give them any.*

<div class="row" style="justify-content: space-around !important;margin-bottom:30px;">
  <div class="col-md-5 col noPadding">
  <a class="btn btn-black" onclick="pet_adopt()">
  <h2 class="tightSpacing">Adopt a Pet</h2></a></div>
</div>

<div class="container generatorCard" id="petCard" style="margin-bottom: 30px;display:none;">
<div class="row">
  <div class="col-12 h2" id="Description" style="text-align: center;"></div>
  </div>
  <hr>
  <div class="row">
  <div class="col-6">
  <h3 style="text-align: center;" class="tightSpacing">Stats and Details</h3>
  <p id="Stats"></p>
  <p id="Food"></p>
  <p id="DMG"></p>
  <p id="Carry"></p>
  </div>
  <div class="col-6">
  <h3 style="text-align: center;" class="tightSpacing">Weird Pet Add-ons</h3>
  <p id="Background"></p>
  <p id="Loco"></p>
  <p id="Abil"></p>
  <p id="Quir"></p>
  </div>
</div>
</div>

**Thanks to:**

 - Lauren Schirduan, the love of David's life and his partner in crime.
 - Ori, our beloved fur baby.

<script async src="/assets/generator_resources/petgenerator.js" charset="utf-8"></script>