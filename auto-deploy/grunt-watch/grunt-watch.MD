grunt-watch
===========

We can set up _grunt_ to run a task whenever we change or save a file
automatically. These types of tasks are called _watches_.

We would like to add grunt watches to our application, so that if we
make changes to any of our LESS files, our CSS stylesheet is
automatically exported to the "./public/css" folder.
Also, if we change any client Javascript files, that our Javascript
packages are rebundled and shipped to the client under "./public/js"

Set up grunt watches
--------------------

We want to install `grunt-contrib-watch` locally to our dev deps:

`$ npm install grunt-contrib-watch --save-dev`

We can now add our grunt watches in our _GruntFile_.

We're going to add another node to our configuration. We're going
to add a node for our grunt-watch task:

`watch: {

}`

The two things we want to do is watch our `css` files and also
our `scripts` files, so we will add 2 nodes:

`watch: {
    css: {

    },
    scripts: {

    }
}`

Now we have to tell grunt which `files` to actually watch, and
what `tasks` to run.

In our `css` node, we want to watch ALL of the LESS files, and
run only one task "css":

`css: {
    files: ["less/*.less"],
    tasks: ["css"]
}`

So if we make any changes to our LESS files, grunt will run the
"css" task; which will automatically generate our CSS from LESS
files, which will then automatically prefix those files.

The next set of files we want to watch is our client-side Javascript
files. We want to watch the "app-client.js" as well as any JS
in the "lib" folder, and run 2 tasks "jshint", and "browserify":

`scripts: {
    files: ["app-client.js", "lib/*.js"],
    tasks: ["jshint", "browserify"]
}`

After we change any of our client-side Javascript files we will
run "jshint" and then we will recreate that client bundle by
running "browserify".

The last thing we must do is _load_ the grunt-contrib-watch
plugin:

`grunt.loadNpmTasks("grunt-contrib-watch");`

We're not going to _register_ any task for watch, because we
are going to run grunt watch directly.

We can start our app with a simple `$ node app` from the terminal.

We will be working with our dictionary here, and we will want to
run the `$ grunt watch` task whenever we need to update. We can
open another terminal and do just that.

`grunt watch` is an ongoing process, so its going to _run_, and
while it is running, it is actually watching our files for any
changes.

This means that if we wanted to change the color of
everything from blue to red, we can simply navigate to our LESS
file, change the variable @main_color from blue to red, and
`grunt watch` will automatically run the "css" task, thus
generating a new "public/css/style.css" file and autoprefixing it:

```
Running "watch" task
Waiting...
>> File "less\style.less" changed.
Running "less:production" (less) task
>> 1 stylesheet created.

Running "autoprefixer:single_file" (autoprefixer) task
>> 1 autoprefixed stylesheet created.

Done, without errors.
Completed in 4.454s at Fri Apr 15 2016 12:10:34 GMT-0700 (Pacific Daylight Time) - Waiting...
```

Now if we reload our page in the browser, we will notice the color
has changed, NO need for a server restart.

We can also do the same thing with our Javascript files.

Using grunt-watches can greatly speedup workflow with web dev
projects.
