---
date: 2020-06-01
layout: project
title: Tempered Legacy
caption: $15 Supplement
image: /images/Tempered_Header.png
screenshot:
  src: /images/Tempered_Header.png
hide_description: true
permalink: tempered-legacy
featured: false
published: true
redirect_from:
  - "/temperedgenerators"
---

Tempered Legacy is a magic item supplement for fantasy RPGs. The powers of these items are locked behind the regrets of previous owners. Compatible with most Fantasy Roleplaying Games. *64 Pages, Black and White interior, 5.5"x8.5" Softcover book.*

<div class="shopping-buttons">
<a target="_blank" href="https://spearwitch.com/products/tempered-legacy" class="btn btn-primary spearBTN">Print+PDF: $15<br>at Spear Witch</a>
<a target="_blank" href="https://davidschirduan.itch.io/tempered-legacy" class="btn btn-primary itchBTN">Digital: $10<br>at Itch.io</a>
<button class="btn btn-primary" onClick="document.getElementById('generatorHeader').scrollIntoView();">Forge a Tempered Weapon</button>
</div>

<div id="images" class="shopping-images">
<p style="margin: 0px;padding:0px;text-align:center;font-style:italic;">Click to view</p>
<img src="/images/Tempered-Print1.jpg" alt="Tempered-Print1.jpg">
<img src="/images/Tempered-Print2.jpg" alt="Tempered-Print2.jpg">
<img src="/images/Tempered-Print3.jpg" alt="Tempered-Print3.jpg">
</div>

<h2 style="margin-top:1rem;">The Book Includes:</h2>
- Advice on using Regrets to make GMing even easier!
- Tempered trinkets, coins, and cookin pans.
- How to create your own Tempered Items, Regrets, and Quests.
- Over a dozen pre-made Tempered Weapons. Here is just a taste of what's inside:
  - [Fiona Geist](https://twitter.com/coilingoracle) created a crystal dao that wipes memories.
  - [John Gregory](http://unlawfulgames.blogspot.com/) wrote about a lantern shield that protects from fire.
  - [Ash McAllan](https://acegiak.net) unearthed a gravedigger's spade that severs the soul.
  - [Shoe Skogen](https://about.me/shoepixie) unveiled a tiny clockwork rat that can deliver messages.
  - [Mahar Mangahas](https://twitter.com/Maharhar) created a tourmaline sword that grants unicorn blessings.
- 3 complete suits of Tempered Armor  and special armor rules written by Dave Cox.


> "I think it's an incredible book to pick up if you ever want to introduce more compelling magic items into your game, that could be fantasy, sci-fi, or anywhere in-between." - [Omnimyth Press](https://omnimyth.press/review-tempered-legacy/)

> "Tempered Legacy is a fun and new way to give life to magic items. The system-neutral approach provides a universal platform from which to work, and adapting this framework to any fantasy roleplaying game should be as easy as one, two, three…" - [Rolling Boxcars](https://rollingboxcars.com/2020/08/31/unlocking-potential-a-review-of-tempered-legacy/)

> "I'm really impressed. This essentially a game and setting generator, in ten pages of rules." - [All the Things Under Heaven and Earth](http://allthethings123.blogspot.com/2020/09/tempered-legacy-first-impressions.html)

<hr id="generatorHeader" class="endShoppingImages">

## Tempered Weapon Generator

<div class="row" style="justify-content: space-around !important;margin-bottom:30px;align-items: center;">
  <div class="col-md-5 col-10 noPadding">
    <input class="TLtextbox" type="text" id="searchName" placeholder="Enter a Weapon Name">
    <a class="btn wyrd-btn" onclick="tl_search()"><h3 style="margin:-5px 0px;">Forge</h3></a>
  </div>
  <div class="col-md-5 col-10 noPadding">
    <a class="btn wyrd-btn" onclick="tl_generate()"><h3>Random Weapon</h3></a>
  </div>
  
</div>

<div class="container generatorCard" id="weaponCard" style="display:none;">
  <p id="saveCharacter" style="text-align:center;"></p>
  <h2 id="weaponName" style="margin-top:0px;">Silver Rapier</h2>
  <p id="weaponDesc">A simple but well-crafted blade</p>
  <p><img id="weaponImg" src="/images/TemperedWeapons/Sword.png" style="background: black; width: 100%;"></p>
  <div id="temperedSlots">
  </div>
  <!--<div id="interacting"></div>-->
</div>

### Thanks to:

- Lauren Schirduan, the love of David's life and his partner in crime.
- Kate Compton for [Tracery](https://github.com/galaxykate/tracery/tree/tracery2), the natural language library this generator runs on.
- [Skerples](https://coinsandscrolls.blogspot.com/) for his [d1000
mutations](https://coinsandscrolls.blogspot.com/2019/11/osr-1d1000-mutations.html).
- [Ben Milton](http://questingblog.com/) for his [level-less Knave spells](https://questingbeast.itch.io/knave).
- [The Nonsense Word Generator](http://soybomb.com/tricks/words/) for some of the weirder words.
- [David Cox](https://www.davecox.design/), the co-writer of Tempered Legacy.
- [Freehold games](http://www.cavesofqud.com/) for making the rogue-like David keeps coming back to again and again.
- And to the [OSR community](https://discord.gg/kJjMvC) for being such an encouraging, welcoming place.

**Image Sources:**

- Weapon images are all from the [British Library](https://www.flickr.com/photos/britishlibrary).
- Title image: [Eene halve Eeuw, 1848-1898](https://www.flickr.com/photos/britishlibrary/11292680064)
- Archer: [The Blue Poetry Book](https://www.flickr.com/photos/britishlibrary/11298236855)
- Icons: [Game-Icons.net](https://game-icons.net/)

Everything on this page is protected under [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/).

<script async src="/assets/js/seedrandom.min.js" language="javascript" type="text/javascript"></script>
<script async src="/assets/js/mods-eng-basic.js" language="javascript" type="text/javascript"></script>
<script async src="/assets/js/tracery.js" language="javascript" type="text/javascript"></script>
<script async src="/assets/generator_resources/temperedgenerators.js" language="javascript" type="text/javascript"></script>

<link href="/assets/viewer.css" rel="stylesheet">
<script>
window.addEventListener('DOMContentLoaded', function () {
  var galley = document.getElementById('images');
  var viewer = new Viewer(galley,{navbar: 0, title:0, toolbar:0});
});
</script>
