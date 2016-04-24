Node Inspector - web inspector nodeJS debugger
==============================================

You may want to debug your nodeJS code, and node Inspector
is a great tool that allows for this.

We can set up an npm `debug` automation script that we can use to
facilitate node-inspector.

Setup node-inspector
--------------------

We can start by installing node-inspector globally, so it can be
used for ALL of our projects:

`$ npm install -g node-inspector`

Now we can add a `debug` script to our "scripts" node:

`"debug": "open http://localhost:3000 & open http://localhost:8080/debug?port=5858"`

Here we open a browser window, and also at the same time we open
the debugger in the browser window. When you run node-inspector,
you will be able to debug on localhost port 8080, under bebug, and
we specify this to happen on port 5858. This will open up the
node-inspector debugging window in another browser.

Before we `debug`, we want to make sure we run grunt:

`"predebug": "grunt"`

After we've opened the windows, we want to go ahead and start
the app in `node-inspector`:

`"postdebug": "node-inspector & node --debug app"`

Running these commands will cause our app to start, and the
debugger to start.

Navigate back to the terminal and execute:

`$ npm run debug`

You should now have access to your server side code at `http://localhost:8080/debug?port=5858`. Here you can set up
breakpoints, step into/over/out-of lines of code, and watch
expressions for changes.
