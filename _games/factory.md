---
date: 2019-03-01
screenshot:
  src: /images/posts/broken_factory.png
layout: project
title: Broken Factory Adventure
permalink: factory-adventure
hide_description: true
image: /images/posts/broken_factory.png
redirect_from:
  - "/indefinitetrain"
caption: >
  Fixing a Broken Factory
  <br>
  (An adventure for D&D and OSR games)
published: false
---

A one-page adventure set in a broken factory train car. Originally written for the **Indefinite Train** project (see below).

<div class="row centerButtons">
      <div class="col-md-8 col-8">
    <a class="btn bonemarshes-btn" href="/files/Broken_Factory.pdf" target="_blank"><h3>Download the Broken Factory</h3></a>
  </div>
</div>

## The Full Train

There's a giant train that passes through many worlds. Everyone writes a one-page dungeon carriage using a template. The carriages get stitched together to make a sort of randomly generated segmented megadungeon, suitable for drop-in games, travel between worlds, or extremely random encounters. 

This amazing idea came from [Skerples](https://coinsandscrolls.blogspot.com/2019/03/osr-indefinite-train-community-project.html) and the carriages were created by the OSR Community!

<div class="row centerButtons">
  <div class="col-md-8 col-8 tightSpacing buttonWrapper"><button id="wielderButton" class="btn bonemarshes-btn" onclick="cars()"><h3>Generate a Train</h3></button></div>
</div>

<div id="trainCard" style="display:none;"></div>

Trains have to be added to this generator manually. Ping [@davidschirduan](https://twitter.com/DavidSchirduan) if any are missing!

Photo by [Roland Lösslein](https://unsplash.com/photos/DmDYX_ltI48?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on Unsplash.

<script>
/*
To update the Train IDs, open up skerples train folder: 
https://drive.google.com/drive/folders/1VVITqjOQLiF_B499bA7ouloqAd4qUpfO?usp=sharing

For each carriage, click on it.
  In the top right click "open in new window"
  Copy the url into the list

*/

var car = "";
var trainHTML = "";

function cars(){

trainURLs=[
"https://drive.google.com/file/d/1SmBngRL2EQd8kcpQE6LAAOavLBM-wObY/view",
"https://drive.google.com/file/d/1YWr_Hgi4cGVPcXRkD3ZtGAoo0hK0kmji/view",
"https://drive.google.com/file/d/1t_ciwZbjFsw4yp33lS3J0KZRAiPeTZPx/view",
"https://drive.google.com/file/d/1iC-sCQXvhOWx-1NwJnxPEnArMGCnX5CE/view",
"https://drive.google.com/file/d/1sSHQhnrpUf9Pe9WSoD0IK2HSlytLFZRI/view",
"https://drive.google.com/file/d/1aMGx5pRmLokPnhvpjjP6XiRozKSMjPNK/view",
"https://drive.google.com/file/d/1q3JqythzLNgKGmqy9bfqImuUTTHLFJfX/view",
"https://drive.google.com/file/d/1e4I6BG6htTdASA318ftUg6nvLGjELbP4/view",
"https://drive.google.com/file/d/1UbC9uR3j7eTNaD4yvYZ1yclFK-DWEkhm/view",
"https://drive.google.com/file/d/1KAoBq1VUUtOEUZvLAhRkn_hlgknjWstR/view",
"https://drive.google.com/file/d/1ni8xPU_FWR-Y0AkgwlWexp7y9JSr0B48/view",
"https://drive.google.com/file/d/146OFmicCLq-mgrX8vgN__yd_u8vtcqhk/view",
"https://drive.google.com/file/d/1ekJhwXE98h-GI59bgLOopgMOr1i0_1zG/view",
"https://drive.google.com/file/d/1_gFaC0bp-Ju1btY3R4e9U8c_9MWb_V6j/view"
];

for(i in trainURLs){

  car = trainURLs.splice(Math.floor(Math.random()*trainURLs.length), 1);
  console.log(car);
  console.log(trainURLs);
  car = car[0].replace("https://drive.google.com/file/d/", "");
  car = car.replace("/view", "");
  trainHTML = trainHTML + 
    "<div class='pdf-container'><iframe src=\"https://drive.google.com/file/d/" +
    car + "/preview\"></iframe></div>";

}

document.getElementById("trainCard").innerHTML = trainHTML;

document.getElementById("trainCard").style = "";
}

</script>