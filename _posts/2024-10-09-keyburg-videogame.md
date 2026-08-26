---
title: "I Made a Terrible Video Game"
layout: post
date: 2024-10-09
categories: Personal
tags: videogames mechanics design
published: true
image: /images/posts/KeyburgTitle.png
---

I never thought I would make a video game. 

I love playing video games and talking about video games and thinking about video games(and even dreaming about video games). But I was sure I didn't want to actually MAKE one. During the day I'm a mild-mannered software engineer. The last thing I want to do after programming all day is write even MORE code.

And yet, here we are. Let's talk about the game I made.

## The Dream

This is a true story.

Around 1am my dog woke me up by snorting in my face (as she does a few times a week). I emerged from the dream world with a video game FULLY FORMED in my brain. From the mechanics to the visuals to how I would market it...EVERYTHING! It was all there in my brain. 

I feverishly grabbed my phone and started writing down notes. They looked a little something like this:

- City builder on your keyboard. No mouse controls.
- Press a key to place a building. Buildings give resources.
- Some buildings require certain resources, others require specific terrain.
- Pretty pixel art, smooth animations.
- It will look like ripping up your actual keyboard and building a small town in its place.
- Inspired by the rebuilding of Laketown in the Hobbit.

I took the dog out and went back to sleep. In the morning I reviewed my notes, and thought "Well...this actually seems doable. Why not?"

## Refining the Gameplay

Before I even started programming I wanted to flesh out the game concepts more. I refined the pitch and tried to imagine how I would market this game:

### Keyburg Pitch
A simple, cozy, town-building game right on your keyboard. The great beast, Lord Mittens, recently assaulted the town and razed it to the ground. Help the mayor rebuild Keyburg and make it flourish once again!

### Goals
Exploration / experimentation is the point (lots of buildings, resources, discovery of the tech tree). Each game is a little different with Plot arrangement. Only the buildings you can currently build are shown when cycling; so there’s a lot of checking on new things and shuffling buildings around to fit right. Hints are shown in the building wiki.

### Controls
Press a key to cycle through the buildings you can build on that key. Some buildings can only be built on certain colors, and some buildings require certain resources. For example, a Lumber Mill can only be built on a green (woods) key. And it requires the resource "STONE". Once built it gives you the "WOOD" resource. 

### UI
All the resources you currently have are shown up top, and your current buildings are shown laid out like keys on a keyboard. When you press a key you can see which resources the current building is providing. Pressing the key again lets you build a different building.

### Sample Buildings

| Building | Terrain | Requires | Provides |
| -------- | ------- | -------- | ------- |
| Lumber Mill  | Forest    | NONE | WOOD |
| Quarry | Mountain    | WOOD | STONE |
| Tavern    | Any    | WOOD, STONE | TRAVELERS |

So now that you kind of have a sense of how the game might work, let's make it happen!

## Let's Freaking Godot!!!

After a few hours of Godot tutorials I felt like I was ready to tackle this thing. I was wrong of course.

Over the course of development the game didn't change much. Some features were tossed (random events, an in-game building wiki, etc) but for the most part I stuck to my original dream-induced outline.

This consumed me; I was having a ton of fun making the game. I never really iterated on ideas or experimented; it was mostly all about learning Godot and seeing the game slowly come together. I was shocked at how much I enjoyed the process.

I ended up using the GORGEOUS [Isle of Lore](https://stevencolling.itch.io/isle-of-lore-2-hex-tiles-regular) tile pack. Not only does it include a bunch of useful elements, but it even has a script to customize and re-color each element and tile! Absolutely fantastic resource for anyone looking for nice tiles.

![/images/posts/lorescript.png](/images/posts/lorescript.png)

Overall I spent about a month tweaking and fiddling with it before I got something that was actually playable from start to finish. I spent about 3 hours trying to figure out how to export it as a playable demo, and eventually gave up.

So instead, here's a video of me playing the game directly within Godot:

<iframe width="700" height="480" src="https://www.youtube.com/embed/JIuGWADnKnM?si=TYcClpqVFf3p1rHw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## Meh.

I realize now that I had WAY more fun making it than anyone will ever have playing it. I feel good about how I executed on the idea, and I did enjoy some elements or ideas. But I don't ever see myself coming back to this or "finishing" Keyburg. Heck, I didn't even bother to export it for other people to try! 

I feel really good about closing the book on this project. I accomplished my goal, and made my dream a reality. 

In fact, my FAVORITE thing about the current demo is how the buildings fall from the sky and bounce around the tile. I had a blast making that work, and it's adorably silly. Just look at how high the fire bounces on the water! 

![/images/posts/bouncing_fire.png](/images/posts/bouncing_fire.png)

## ...but if I WAS Going to Finish it

Purely as a design exercise, I think there are a few key takeaways now that the game is semi-complete.

### Inform the Decisions

The "fun" needs to be refined. Right now the game feels very random. There's a little bit of fun in the discovery phase (oh, what else can I build here?). But that quickly turns into "I don't even know what I need to build, what I am able to build, or what I can safely replace".

I imagine it might require something like a tech tree that players can fill in as they go. "There are 5 buildings that require WOOD, but I've only discovered 3 of them. I need to keep the Lumber Mill around until I find the other two WOOD buildings." 

![/images/posts/civTechTree.webp](/images/posts/civTechTree.webp)

The player's lack of knowledge into what is/isn't possible prevents them from making informed decisions.

### Add a Lose Condition

Right now the only goal is to build the Crow. You can "win" the current version of the game by just mashing keys over and over until you finally have all the resources you need. There should be a lose condition of some kind.

Maybe the game takes place over the course of a year, and certain buildings can only be built in certain seasons? So you gotta get the Lumber Mill built before the winter comes.

Another idea is an opposing force. Maybe Lord Mittens returns to smash buildings or munch on resources. You need TWO Lumber Mills since Mittens is eating one of them.

### More Complexity

To add more strategy and depth you could increase the requirements and benefits of buildings.

For example, maybe the Quarry MUST be built adjacent to the Lumber Mill, but it can't be placed near the Tavern. This could be a sudoku-like kind of shuffling game.

Another idea is that buildings have secret benefits. If you build the Nest on the Sea instead of the Forest you get different resources. Or putting a Fishing Hut in the mountains reveals an underground lake of rare fish.

Assuming the game had better information, then simply adding MORE information to explore and gather could improve the experience.

### Presentation

Originally I imagined a really high-quality pixel art view of the game; something like Stardew Valley or Children of Morta.

But a friend of mine pitched the idea of a photo-realistic game. I could take actual photos of a real keyboard and make different keycaps represent different buildings. It would feel like you're actually building a tiny town on your keyboard.

![/images/posts/buildingKeycaps.avif](/images/posts/buildingKeycaps.avif)

## On Second Thought...NAH!

But I meant what I said: I'm happy with this unfinished demo. It was a blast to work on, and kinda felt like checking off a bucket list item. I don't really have any desire to return to the concept or explore it further.

Thanks for reading about my video game dream and vaguely disappointing reality. Soon I'll get back to making Overpowered into a full release!