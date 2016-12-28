---
title: Open Source Projects in 2016
layout: Post
date: 2016-12-27
---

2016 has been full of many ups and downs, but at least I was able to launch a couple of small open source projects this year. The projects are called [Tocbot](http://tscanlin.github.io/tocbot/) and [serverless-s3-crud](https://github.com/tscanlin/serverless-s3-crud), try to guess what they do and read below to hear more about them. Hopefully people find them useful and build cool stuff with them.

## Tocbot

[Tocbot](http://tscanlin.github.io/tocbot/) was first created on 3/22/2016. The idea for it came to me when I wanted a table of contents with jump links for navigating long pages with a lot of text. I found a library called [Tocify](http://gregfranko.com/jquery.tocify.js/) that worked and basically did what I wanted, but I didn't like that it had dependencies on jQuery AND jQuery UI which are huge, and it was also no longer actively maintained; so I decided to write my own library with no jQuery dependencies that used native DOM methods instead. The result is Tocbot, which is currently used on [Optimizely's developer documentation](https://developers.optimizely.com/x/solutions/javascript/reference/) and also used on [Tocbot's webpage](http://tscanlin.github.io/tocbot/).

Tocbot was featured in JS Weekly issue #283 and HTML Weekly (now Frontend Focus) issue #239 which was awesome. You can still read them [here](http://javascriptweekly.com/issues/283) and [here](http://frontendfocus.co/issues/239) (respectively).

![tocbot js weekly](/assets/images/tocbot-js-weekly-283-highlighted.png)
*JS Weekly*

![tocbot html5 weekly](/assets/images/tocbot-html5-weekly-239-highlighted.png)
*HTML5 Weekly*

Note: These are both run by the same guy, Peter Cooper. Check out [his website](http://peterc.org/) and subscribe to the above newsletters if you are interested in web development.

It has 140 starts as of the article publish date. I am glad that it provides simple but useful functionality without needing a lot of dependencies.

## Serverless S3 crud

[Serverless-s3-crud](https://github.com/tscanlin/serverless-s3-crud) is my most recent project, it was first started on 11/15/2016. It is a service meant to be used with [Serverless](https://serverless.com/) and now it is currently listed as the third service in the [services section of their README](https://github.com/serverless/serverless#services-v10). It does exactly what you would expect, it provides a serverless crud REST API for interacting with S3. There was already a [serverless-crud](https://github.com/pmuens/serverless-crud) project which is similar but backed by Dynamo DB instead. I definitely plan to make use of this in future projects and I hope other people find it useful as well.

Go check out [Tocbot](http://tscanlin.github.io/tocbot/) and [serverless-s3-crud](https://github.com/tscanlin/serverless-s3-crud) if you haven't already and [tweet @ me](https://twitter.com/tim_scanlin) or open an issue on github if you have any feedback.
