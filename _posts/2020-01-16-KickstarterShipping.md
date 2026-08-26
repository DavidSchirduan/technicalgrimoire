---
title: "Don't Use Kickstarter Shipping"
layout: post
date: 2020-01-16
categories: Tabletop
tags: kickstarter tutorial
published: true
image: /images/posts/Gumroad_banner.png
---

Kickstarter allows you to [collect shipping costs](https://www.kickstarter.com/blog/weve-made-shipping-rewards-a-lot-more-flexible?ref=tipsblog) along with your backer pledges. _Enjoy the comment from 2014 saying this is a terrible idea._

This is a terrible idea. For one big reason:

> "Additionally, any funds pledged towards shipping costs will count towards your project's goal."

This is disastrous because shipping costs vary wildly and can't really be estimated or accounted for.

![Gumroad_sad.jpg](/images/posts/Gumroad_sad.jpg)
The first of many tears during a KS campaign. *Photo by Aliyah Jamous on Unsplash*

## An example

You need $200 to make your book. The only pledge is $10 + Shipping and Handling. 

|**Ignore shipping**|**Assume the best**|**Assume the worst**|
|You don't bother to account for S&H. You get six backers who live nearby ($10+$3), five backers who live far away ($10+$15). You just raised $203. BUT WAIT! $93 of those dollars are set aside for shipping, so you really only have $110 left to make your book. Crap.|You assume an equal mixture of local and distant backers; six of each. Your new goal is $200 + $108. BUT WAIT! A distant community gets excited about your project, and you have more distant backers than local. Same problem as before: less money left for your actual book.|You assume the worst. That EVERYONE will be distant. You set your goal to $200 + $300. That's more than twice your original goal, and you might not meet it!|

In all of the above scenarios, you just needed 20 backers paying $10 each to fund your book. But a distant backer ends up paying almost DOUBLE the money of a local backer. They count twice!

There's really no way to win. You need to keep the shipping costs and the production costs SEPARATE!

Even if you predict things perfectly, people move, prices change, etc. Kickstarters are already risky and difficult. Don't trip yourself up by using the built-in shipping.

![Gumroad_fence.jpg](/images/posts/Gumroad_fence.jpg)
I love stock photos. *Photo by Rangga Cahya Nugraha on Unsplash*

In bigger projects this might not matter. If you need $30,000 and you make $50,000 you can account for minor shipping fluctuations. 

But for little indie projects like zinequest, we need to be careful!

## Backerkit

[Backerkit](https://www.backerkit.com/for-creators) seems to be what most people use. It's user friendly, both on your end and the backer side. 

But Backerkit is pricey. 

*2% of campaign funds + 5% of funds raised after the campaign through BackerKit + $199 setup fee.*

So a $2000 project would cost $240 just to use backer kit. Combine that with KS fees and suddenly you need to raise an extra $500 just to cover the misc costs.

## Alternatives

[Gamefound](https://gamefound.com/info/about#/) is free, and seems solid. I haven't used it myself.

[Pledgecamp](https://pledgecamp.com) is another option. But I haven't used it either.

## Gumroad is my plan

I already have a gumroad store, so I'm gonna use it for my KS shipping costs.

![Gumroad_banner.png](/images/posts/Gumroad_banner.png)

Gumroad is free to setup. They take 3.5% + 30¢ of every sale.

So if you have 200 backers paying $15 each in shipping that's a total cost of $165. It's a little cheaper than backerkit, and provides the additional benefit of having a store front ready to go for post KS sales.

**Two Easy Steps**

1. Create a [pre-order](https://help.gumroad.com/article/63-pre-order-products) for your book when you have a solid date for shipping. You can't create a pre-order until you have a release date. 
 I'd open pre-orders 2 weeks or so before your planned release. It gives backers enough time to place their orders, but not SO much time that people move and details change.

2. Make a [Discount Code](https://help.gumroad.com/article/128-creating-offer-codes) for your book (100% off) and send it to your backers. Then when they order, they JUST pay for the shipping. The address and payments are collected and sent to you in a nice little interface.

**NOTE #1:** If you're worred about backers sharing the discount code with strangers (thus giving away free copies) you can create a custom offer code for each backer, and set it to one-time use. 

If you have a LOT of backers, you can use the [Gumroad API](https://gumroad.com/api#offer-codes) to generate a bunch of offer codes quickly. If you're not tech-savvy I'm happy to help you generate these codes. Just email me: technicalgrimoire@gmail.com

**NOTE #2:** If you want to make SURE your backers get their books first, then simply set the purchase price to $1000 or something (and set the backer code to $1000 off). Then after the backers have all gotten their copies, lower the price so everyone else can place their orders.

## In Conclusion, Avoid KS Shipping Costs In Pledges

It's just not worth the risk. And complain to KS about how stupid this is. If they just seperated the shipping costs from the goal, we wouldn't have this issue.

If you are looking for someone to just HANDLE all the shipping and distrobution nonsense, I can recommend two options:

 - DOFP Distrobution is run by Jared Sinclair of Melsonia fame. He handled the shipping of Lowcountry Crawl Ashcan copies, and was very easy to work with. Email him: dofpdistribution@gmail.com
 - Exalted Funeral has grown a lot in the past few years and they LOVE shipping. They handled the shipping for a ton of huge projects, and their prices are fair. Email them: exaltedfuneral@gmail.com

Good luck! If you have other advice or ideas, comment below.

P.S. I'm running a Kickstarter in February for a bunch of cool zines! Join [the Mailing List](https://gumroad.com/technicalgrimoire/follow) for updates.

P.P.S. Here's a short script I wrote to help you use the Gumroad API. If you're not code-savvy feel free to email me and I'll gladly help you out.

<a href="/files/gumroadDiscounts.py" target="_blank">Here's a link to the Python script I used.</a>