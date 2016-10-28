---
title: Login bash script
layout: Post
date: 2015-09-30
paths:
  - path: /blog/2015/login-bash-script
    buildHtml: true
  - path: /2015/09/30/login-bash-script
    buildHtml: true
draft: false
summary: JavaScript is my happy place. It's the language I'm most comfortable in and I really enjoy using it both in the browser and with node.js even though it has a number of <a href="https://www.pubnub.com/blog/kyle-simpson-asks-javascript-wtf/">weird quirks</a>.
---

JavaScript is my happy place. It's the language I'm most comfortable in and I really enjoy using it both in the browser and with node.js even though it has a number of [weird quirks](https://www.pubnub.com/blog/kyle-simpson-asks-javascript-wtf/).

That being said, I do enjoy writing code in other languages as well. My second favorite is probably Python due to its clean and simple syntax. However, I find myself using bash scripts more and more these days due to its versatility and ubiquity. Its great for things like syncing files between directories (rsync ftw!) and performing database maintenance tasks. I'll write articles on those scripts soon, but first let's start simple.

Today I'm going to walk through a script I recently made to simplify the process of logging into remote servers using ssh. This is super simple and doesn't really do anything fancy. But I think it's a worthwhile starting point if you haven't worked with bash scripting too much. Let me step through it and explain it step by step.

First you will notice the grayed out lines all start with the '#' sign. This is how comments are written in bash scripts as opposed to JavaScript where '//' are used at the beginning of a line to indicate that the line is commented out. Next, you will see that there is a function called "webhost", this function is declared in much the same way that it would be declared in JavaScript. Inside the function it executes the command "ssh tim@server.com -p 2022", this basically says "ssh into the server 'server.com' as the user 'tim' on port '2022'".

~~~ sh
#!/bin/sh
# Login
# version: 1.0
# date: 2015-09-29
# author: Tim Scanlin

# CONNECTIONS
function webhost() {
	ssh tim@server.com -p 2022
}
~~~

Hope you are with me so far. Next is an example of a multi-line string. This makes use of the [Heredoc](https://en.wikipedia.org/wiki/Here_document) syntax in bash. This syntax is available in many other programming languages as well and isn't specific to bash. Its most useful for storing longer form text and banners like this.

~~~ sh
# BANNER
BANNER=$( cat << EOF

==================================================
=                LOGIN UTILITY v1                =
==================================================

Host: $HOSTNAME

EOF
)
~~~

Finally, there is the main logic of the script. First we echo the $BANNER variable to display it in the console and identify the script, then we check for any passed in parameters. If there aren't any parameters or if the parameter is "-h" then we show how to use the script and some possible input values. Then we prompt the user for some input and read it into the $COMMAND variable. Finally we run the function matching that $COMMAND.

~~~ sh
# EXECUTION STARTS HERE
echo "$BANNER"
echo ""

if [ $# -eq 0 ] || [ $1 == "-h" ] #check for no params or -h
then
	echo "Usage:"
	echo "<server alias>"
	echo ""
	echo "Options: webhost"
	echo ""

	echo "> What server would you like to login to?"
	read COMMAND
else
	COMMAND="$1"
fi

$COMMAND

exit;
~~~

The benefit of having this conditional is that you can run the script from the terminal by typing "login.sh" and it will tell you how to use the script and some possible input values allowing you to continue on from there, or if you already know the available options then you can just run "login.sh webhost" and it will go straight to executing the "webhost" function.

This is very basic but could be expanded upon to add multiple functions, one for each server you login in to, as well as a starting point for many other scripts with a variety of functionality. Hope you enjoyed this short tutorial!

Full script below:

~~~ sh
#!/bin/sh
# Login
# version: 1.0
# date: 2015-09-29
# author: Tim Scanlin

# CONNECTIONS
function webhost() {
	ssh tim@server.com -p 2022
}

# BANNER
BANNER=$( cat << EOF

==================================================
=                LOGIN UTILITY v1                =
==================================================

Host: $HOSTNAME

EOF
)

# EXECUTION STARTS HERE
echo "$BANNER"
echo ""

if [ $# -eq 0 ] || [ $1 == "-h" ] #check for no params or -h
then
	echo "Usage:"
	echo "<server alias>"
	echo ""
	echo "Options: webhost"
	echo ""

	echo "> What server would you like to login to?"
	read COMMAND
else
	COMMAND="$1"
fi

$COMMAND

exit;
~~~
