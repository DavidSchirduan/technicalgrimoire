---
title: "Jalopy Design: Markdown Blog"
comments: true
author: davidschirduan
image: /images/posts/jalopyMarkdown.gif
layout: post
date: '2018-10-17'
published: true
categories: jalopy
tags: jekyll website tutorial programming
---

> I'm like that co-worker who drives an old junker. When you ask them, "How do you keep that thing running?", the advice you get will be useful...but probably no replacement for hiring a real mechanic. [View all Jalopy Articles here](https://www.technicalgrimoire.com/jalopy/).

The death of Google Plus has left the RPG community a little bewildered. Some search for a new social platform, while others retreat to facebook/twitter/whatever. But what interests me is the huge community push to embrace blogging again.

Instead of writing content on some platform, many designers and gamers have been encouraged to start their own blogs, read the blogs of others, and engage more directly with others. I think this is AWESOME! I hope it encourages more depth in our communication, and more polished content from some of my favorite writers; not to mention it creates a sense of ownership that social media can't really provide.

## But I don't have a blog/website!

Don't panic! There are lots of great options for blogging. Tumblr and Blogger are really easy to start using. Wordpress is a bit more complicated, but more customizeable. WIX costs money, but looks pretty slick.

![octojekyll.png]({{site.baseurl}}/images/posts/octojekyll.png)

However I must recommend [Github Pages](https://pages.github.com/). Github has always been a big supporter of community projects, offering free website hosting to anyone. In brief:

**PROs**

- Free. Your site cannot exceed 1 Gigabyte in size, but that's not very difficult. This website is not even 1/2 of a Gigabyte.
- Minimalist. The site is just a bunch of markdown files.
- Lots of themes and customization. I made this site and the [200wordRPG website](https://200wordrpg.github.io/) using Github Pages.
- Portable. If Github disappears tomorrow, it's easy to move your website anywhere.

**CONs**

- Some technical know-how required.
- Markdown has limitations, and can be fiddly to work with.
- Sites with lots of pictures or PDF files can reach that Gigabyte limit quickly.

Don't panic, it's really not that tricky. Just think of it like an adventure...

## Quickstart

If you just want to get started, and don't care about learning programming or fancy tools, just follow these steps:

1. Create a Github account. The username you pick will be your default website name (e.g. https://username.github.io), so choose carefully!

2. Follow the [Github Pages tutorial](https://pages.github.com/). 

When you finish you will have an extremely simple website setup. Nice job! You can edit the text on it, add new pages, change themes, and more all through the Github website. 

Here are some ~~better~~ other tutorials that will supplement this one:

- [**CloudCannon**](https://learn.cloudcannon.com/)
- [**Jim McGlone's Guide**](http://jmcglone.com/guides/github-pages/)
- [**Jekyll via Github**](https://jekyllrb.com/docs/github-pages/)

But you shouldn't stop there! The true power of Github Pages and Jekyll takes a little more work, but will help you create a simple and manageable website. Keep reading for a more in-depth tutorial/explanation.

## Diving Deeper

Before we dive deeper, you might want to brush up on:

- **Git version control.** The way you upload and modify files through git. There is a [good tutorial here](https://www.codecademy.com/courses/learn-git/lessons/git-workflow/exercises/hello-git).
- **Markdown.** If you've used Reddit, then you've used markdown. [Tutorial here](https://www.markdowntutorial.com/).
- **HTML/CSS knowledge**, the more the better. But it's not necessary.

If you know a little about those tools, then there is just one more we need to get started: Jekyll.

![jekyll.png]({{site.baseurl}}/images/posts/jekyll.png)

Jekyll is what makes this whole website/markdown thing work. Github Pages will host your website, but Jekyll is what actually turns the text files into shiny web pages. As with most things in software, there is a LOT here if you want to dive deep; but this tutorial is only going to cover the basics.

You have three choices for working on your website:
 - **Do everything in through the Github website.** This is the easiest and most user-friendly option. Great if you just want to get things started. The downside is that you won't be able to see ANY of your changes unless you upload them and wait for Github to rebuild your site. It's annoying when you want to make a bunch of small changes at once.
 - **Install Jekyll locally.** This lets you preview your changes before they go live and can be very useful. Instructions to install Jekyll can be found here: [**Windows**](https://jekyllrb.com/docs/installation/windows/) - [**Mac**](https://jekyllrb.com/docs/installation/macos/) - [**Linux**](https://jekyllrb.com/docs/installation/ubuntu/)
 - **Docker.** If you know Docker, just run this command from the same folder as your website files: `docker run --rm --volume=$(pwd):/srv/jekyll -it -p 4000:4000 jekyll/jekyll jekyll serve`. And access your website at [http://127.0.0.1:4000](http://127.0.0.1:4000). 

## Code vs Content

You've got the basics setup, Jekyll installed, and a simple website on Github Pages. But a single web page doesn't do us any good. From here on it's best to think of your website as two parts: **Code** and **Content**

Code includes html files, configuration yaml, css styles, and all that website stuff.

Content includes markdown files and images.

Ideally you want to pick a theme that you like, and then **never worry about code again!** *...Unless you enjoy that stuff.*

Github has a couple default themes to choose from, but you can also get theme from [jekyllthemes.org](http://jekyllthemes.org/) or [jekyllthemes.io](https://jekyllthemes.io/). Themes can be hit or miss. Some of them look really nice, but are hard to install. Others simply don't work. Be prepared to kiss a couple frogs before you find something that works for you.

The other big Code thing is your `_config.yml` file. This file contains most of the important details and it's worth getting familiar with it. You can set the name of the site, where your posts are stored, what plugins/themes you are using, and more. Learn more about your `_config.yml` file [HERE](https://jekyllrb.com/docs/configuration/).

Code the stuff will give you the biggest headache. Check the end of this post for more helpful resources if you get stuck.

## Starting with Pages

Got your Code part figured out? Nicely done! Now we can start making Content.

First let's lay a solid groundwork with [Pages](https://jekyllrb.com/docs/pages/). Pages are the most basic kind of Content, and include things like "About Me", "Downloads", "Contact", and so on. 

You can store pages right in the root of your website files. Let's create a simple "About Me" page. 
1. Create a new text file called `aboutme.md` in the root of your website folder.
2. Type up a short paragraph explaining who you are. Flex your markdown skills and add some links and bolding.
3. Upload the file to github, and let it rebuild your site.
4. You should be able to see it at `http://username.github.io/aboutme`

Easy, right? But the real magic happens with Jekyll posts.

## Posts

Posts are a more complicated. Jekyll will automatically organize your posts (categories, tags, newest, etc). But we have to put in a little work so Jekyll knows **how** to organize them.

Let's make an example post.

1. Create a new text file called `2015-01-31-example.md` in the `_posts` folder. Each post needs to have the date in the name of the file, in that exact format. If you don't name the file properly, Jekyll won't know what to do with it. Make sure it's in the `_posts` folder.
2. Type up a short paragraph about something cool you're working on.
3. Add Front Matter to the top of the file. Front Matter contains a bunch of variables that tell Jekyll how to organize your post. Here's an example:
    ```
    ---
    layout: post
    title: Example Project
    date: 2015-01-31
    categories: post rpg project
    tags: osr inprogress bxessentials
    ---
	Today I've started working on the Bone Marshes and how to map the...blah blah more port content
    ```
4. Upload the file to github, and let it rebuild your site.
5. Where is it? How do I see my post? 

Don't panic. Posts are organized by Jekyll, they aren't simple links like Pages. We need to make a Page to list your posts, like [this one on my site](https://technicalgrimoire.com/blog).

1. Create a new text file called `posts.md` in the root of your website folder.
2. Fill it with "Liquid" filters. Jekyll uses Liquid filters to organize and display content in different ways. For now just copy and past this:
    {% raw %}
    ```
    ## All Posts
    <ul>
      {% for post in site.posts %}
        <li>
          <a href="{{ post.url }}">{{ post.title }}</a>
        </li>
      {% endfor %}
    </ul>
    
    ## Categories 
    {% for category in site.categories %}
      <h3>{{ category[0] }}</h3>
      <ul>
        {% for post in category[1] %}
          <li><a href="{{ post.url }}">{{ post.title }}</a></li>
        {% endfor %}
      </ul>
    {% endfor %}
    
    ## Tags 
    {% for tag in site.tags %}
      <h3>{{ tag[0] }}</h3>
      <ul>
        {% for post in tag[1] %}
          <li><a href="{{ post.url }}">{{ post.title }}</a></li>
        {% endfor %}
      </ul>
    {% endfor %}
    ```
    {% endraw %}
4. Upload the file to github, and let it rebuild your site.
5. You should be able to see all your posts, tags, and categories at `username.github.io/posts`

Now when you create new posts Jekyll will automatically add them to this list, and add any new tags or categories that you include in your posts.

## Wrapping up

You're almost done! You've got a system for adding new pages and new posts. Just a few things I want to cover before I turn you loose:

**Fancy Editor**. If you installed Jekyll locally or use Docker then you can take advantage of [jekyll-admin](https://github.com/jekyll/jekyll-admin). Install it by adding `gem 'jekyll-admin', group: :jekyll_plugins` to your site's gemfile, and boom! instant fancy editor. Just `jekyll serve` like normal, and go to http://localhost:4000/admin to view it. It's pretty nice! I'll start using it more often. *Note: this fancy editor is only available when working on your website locally; you can't use it online.*

**Images**. Images can be a bit of a pain with Jekyll. I recommend creating an "images" folder and putting them in there. Then when you want to use one in a post do this: 
```
![kitten.png]({{site.baseurl}}/images/kitten.png)
```
I know it looks ugly, but that's the markdown way of including an image. 

**Comments**. Jekyll doesn't allow comments by readers. I use [Diqus](https://disqus.com/profile/login/) and some Jekyll plugins to allow comments. But you can also look into something like [Staticman](https://staticman.net/) or [Talkyard](https://www.talkyard.io/blog-comments)

**Custom URL**. If you don't like the `http://username.github.io` web URL you can buy a domain and point it to your website. [Info here](https://help.github.com/articles/using-a-custom-domain-with-github-pages/).

**Useful Resources** The [Jekyll Documentation](https://jekyllrb.com/docs/) is really solid, and can answer a lot of questions. Here's a [list of miscellaneous resources](https://jekyllrb.com/resources/). Github also has some [useful guides](https://help.github.com/categories/github-pages-basics/).

Finally, Google is your best friend. LOTS of people use Jekyll; if you have a problem then someone else has probably found a solution. Read some forums, experiement, and reach out for help.

That covers most of the basics. I know it's a lot to digest, but just take it one step at a time, invest in learning the tools, and soon you'll have a website all your own! More importantly, it will be completely under your control, reliant on nothing and no one. If you do make a site, let me know in the comments below!

I can't wait to see what the community comes up with.
