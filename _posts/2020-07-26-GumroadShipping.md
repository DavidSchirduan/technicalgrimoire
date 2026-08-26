---
title: "Gumroad Fulfillment: Lessons Learned"
layout: post
date: 2020-07-26
categories: Tabletop
tags: kickstarter tutorial
published: true
image: /images/posts/Gumroad_banner.png
---

Well that was an adventure.

In February we launched a Kickstarter campaign to fund TWO wildly different Tabletop RPG Zines. [Tempered Legacy](/tempered-legacy) and [Marsh Goons](/marsh-goons) are both complete and on their way to backers. Victory! The world moves on.

But now that the madness is over I want you to learn from my mistakes.

I wrote a blost post earlier about [my plan to use Gumroad](/david/2020/01/KickstarterShipping) to fulfill my kickstarter orders and handle shipping. In case you didn't read it, the basic gist was:

> Don't use Kickstarter to collect shipping costs because KS includes shipping prices in your campaign budget. So one person who bought a zine and paid $15 shipping counts for twice as much as someone who bought a zine and paid $4 shipping. This can mess with expected profit and budget.

So how can we use Gumroad to collect and manage Kickstarter shipping? 

## Getting Started

[Gumroad is free to setup.](https://gumroad.com/) They take 3.5% + 30¢ of every sale. That ends up being a little cheaper than backerkit, and has the added bonus of setting up an ongoing storefront you can use after the campaign is over.

Once you've signed up, [add your game as a product](https://help.gumroad.com/article/149-adding-a-product). We want this to be a "Classic" product that contains physical goods. You *can* make it a pre-order, but its more complex and doesn't matter for our purposes. A few things to note:

 - Set the price to something outrageous. $999 will keep anyone but your backers from placing orders. After all your backers have placed their orders you can lower the price to what it will normally be.
 - Make sure to set a limit on sales to match your inventory. You don't want people buying things you can't deliver.
 - In the Checkout tab double and triple check your shipping prices to various places. This is the whole reason we're using Gumroad in the first place.
 - Be sure to check the "Add discount field to purchase form".
 - Everything else you can fill as makes sense. 
 - Publish your game!

## Time to program!

![gumroad_hackers.jpg](/images/posts/gumroad_hackers.jpg)
*This is what programming looks like.*

Now that the product exists we're going to jump into the programming side of things. If you aren't comfortable with programming, I'm happy to help you out, OR you can hire me to just handle it for you. Shoot me an email: technicalgrimoire@gmail.com.

<a href="/files/gumroadDiscounts.py" target="_blank">Here's a link to the Python script I used.</a>

The logic is fairly simple, and you could use anything from bash to C++. I am comfortable with Python, so I used that. 

The script grabs the kickstarter backer CSV file and for each backer it generates a Gumroad discount code of 100% off and then emails that backer their code. 

I added a bunch of comments and steps that should help you make the script useful for your particular project. Again, email me if you have questions or problems.

## Gotchas

A few things jumped out at me and caused some problems. 

 - **Double and triple check every part of the script before you run it!** It's impossible to undo 200 emails, and the wrong information can confuse and frustrate your customers. For one round of emails I forgot to change the email subject line and it confused a ton of people. Be careful before you run the final script!
 
 - **Gumroad only allows one discount per CART.** I had two different books and assumed backers would be able to apply both their discounts and order them in one cart to save on shipping. But that didn't work. I had to make a THIRD product that included both books to combine shippping.
 
 - **Gumroad [Terms of Service is kinda...creepy](https://twitter.com/2Shva/status/1278491634825486336)?** I don't know why Gumroad needs permissions to modify and re-sell my products. Not a fan of this. But I still think Gumroad is the best alternative we have, it's just scary to see that in the terms of service.
 
## Conclusion

Despite a few hiccups Gumroad has been a great solution for me, and really helped streamline my Kickstarter fullfilment process.

I hope you found my little script useful, and I hope your projects go smoothly! 

**Stay Safe, Play Games.**

