---
title: Simple d3.js Visualization Tutorial
layout: Post
date: 2014-08-30
draft: false
summary: d3.js is an awesome JavaScript library that's perfect for visualizing data. However, it has a reputation for being a bit tricky to learn; but once you understand the basics, you can actually make some really cool stuff.
---

d3.js is an awesome JavaScript library that's perfect for visualizing data. However, it has a reputation for being a bit tricky to learn; but once you understand the basics, you can actually make some really cool stuff. In this tutorial, we'll be making a visualization of colored wavvy lines using some randomly generated data while also demonstrating how d3 [interpolation](https://github.com/mbostock/d3/wiki/Transitions#d3_interpolate) and [transitions](https://github.com/mbostock/d3/wiki/Transitions) work. Check out [timscanlin.net](http://timscanlin.net) to see the effect.

I'll assume you have an intermediate understanding of JavaScript and jQuery (If you don't, check out [Dash](https://dash.generalassemb.ly/)) and although knowledge of [d3.js](http://d3js.org/) isn't required it is recommended that you familiarize yourself with it before starting. Now, head over to my github to [download the tutorial files](https://github.com/tscanlin/timscanlin-demos) and let's get started!

To start off we will setup our empty HTML document with a single svg element with an id of 'background' and a script tag below that. Up in the head we'll add a title, style, and script tags with the script tag's source set to 'd3.min.js'.

~~~ html
<!DOCTYPE html>
<html>
  <head>
    <title>d3 Visualization</title>
    <style>

    </style>
    <script src="d3.min.js"></script>
  </head>

  <body>
    <svg id="background"></svg>
    <script>

    </script>
  </body>
</html>
~~~

Then add the following CSS to the style tag you just made. This will make the html document and the svg background have 100% height and width in addition to removing the default fill that path elements have by default.

~~~ css
html, body {
  height: 100%;
  margin: 0;
  overflow: hidden;
  padding: 0;
}

#background {
  bottom: 0;
  height: 100%;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  width: 100%;
}

/* SVG styles */
#background path {
  fill: none;
}
~~~

Now, let's get into the javascript. First we are going to declare some variables at the top of the script tag you added in the body.

~~~ js
var svg = d3.select('#background'),
    quantity = 7,
    points = 4;
~~~

Here we are selecting the background svg element we added before, using d3.select(). Then we are declaring two constants, one for the quantity of lines we will have, and another for the number of points going across the screen. You can come back and play with changing these values later.

Since d3.js operates on data, we are going to need to generate some data to use for this.

~~~ js
function generateData() {
  return d3.range(points).map(getCoordinates);
};

function getCoordinates(i) {
  var x = i * (1 / (points - 1)) * window.innerWidth;
  var y = Math.random() * (window.innerHeight / 2);
  return {x: x, y: y};
};

function getHue() {
  return Math.random() * 360;
};

function getStroke() {
  return (Math.random()) * 3;
};
~~~

The first function, generateData(), is just using d3.range() to make an array, and .map() on that to call the getCoordinates() function for each of the points across the screen.

Then, getCoordinates() is spacing the points out evenly across the window's width, and making their high somewhere in the top half of the window and using Math.random(). This is what gives the lines their waviness.

The last two, getHue() and getStroke() are just randomly picking numbers for hue and stroke thickness respectively.


Now lets start getting into interpolation.. it's actually not as difficult to understand as you might think. You know what *extrapolation* is right? [Extrapolation](http://en.wikipedia.org/wiki/Extrapolation) is generally estimating and looking beyond or outside what has happened to try and predict what might happen, whereas [Interpolation](http://en.wikipedia.org/wiki/Interpolation) is looking inside to find all of the possible data points between a set of known data points.

So now that you understand what interpolation means, lets get into an example.

~~~ js
var line = d3.svg.line()
  .interpolate('cardinal')
  .x(function(d) { return d.x; })
  .y(function(d) { return d.y; });
~~~

In the above code, we are basically creating a line constructor that tells d3.js how our line data is stored (using the same x and y properties from our getCoordinates generator before). This is also using the 'cardinal' line interpolation, to read more about d3.js line interpolation you should definitely check out this article from [Dashing d3.js](https://www.dashingd3js.com/svg-paths-and-d3js).

~~~ js
var paths = svg.selectAll('path')
  .data(d3.range(quantity))
  .enter()
  .append('path');
~~~

Now, we use the svg selection from before to select all of the path elements (even though they don't really exist yet, kinda weird, but you'll get used to it). and set the paths data() using d3.range(quantity) to return an array of 1 to 7 for each path element to be added. And finally .enter() and .append('path') to add the 7 path elements to the svg. If you reload the page now it should still look blank, but examine the source code and you should see 7 path elements in your svg element.

Now, let's make one of the lines appear by adding data to one of the path elements.

~~~ js
d3.select(paths[0][0])
  .data([generateData()])
  .attr('d', line)
  .attr('stroke', 'hsla('+getHue()+', 80%, 50%, 0.5)')
  .attr('stroke-width', getStroke());
~~~

Here, we are selecting one of the path elements and generating data for it. In addition to the path's data points, we are also generating a hue and stroke for it. Reload the page and you should see a single colored line. This handles one of the lines, now let's do the rest of them, this is where it all comes together. Replace the code from above with what's below.

~~~ js
var transition = function() {
  var dataInterpolate = d3.interpolate(generateData(), generateData()),
      hueInterpolate = d3.interpolate(getHue(), getHue()),
      strokeInterpolate = d3.interpolate(getStroke(), getStroke());

  paths.each(function(d,i) {
    var data = dataInterpolate(i*(1/quantity)),
        color = hueInterpolate(i*(1/quantity)),
        stroke = strokeInterpolate(i*(1/quantity));

    d3.select(this)
      .data([data])
      .transition()
      .duration(3000)
      .ease('linear')
      .attr('d', line)
      .attr('stroke', 'hsla('+color+', 80%, 50%, 0.5)')
      .attr('stroke-width', stroke);
  });
};
~~~

Boom! Are you confused now? Not only does d3.js support a bunch of different types of line interpolation, but it also supports [many other types of interpolation](https://github.com/mbostock/d3/wiki/Transitions#d3_interpolate) as well, between a huge variety of data types (as long as they're the same type) including, colors, numbers, strings, and even arbitrary objects. Here we are interpolating all of the things that we want to change across the different lines (datapoints, hue, and stroke).

Then we use an each loop with the paths selection that we made earlier to set the data, color, and stroke for each of the lines in a way that they blend between each line instance.

~~~ js
transition();

document.onclick = transition;
document.ontouchstart = transition;
~~~

And finally, we call the transition function to make our initial lines appear and then assign it to execute again with clicks or touches to the document.

Hope you enjoyed the tutorial! [Check out the final product](/demos/visualization.html).

Or go get the [source on Github](https://github.com/tscanlin/timscanlin-demos).
