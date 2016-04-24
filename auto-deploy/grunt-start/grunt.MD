Grunt -- Javascript Task Runner
===============================

In todays day and age, web development tends to require a
number of static operations that you'll need to perform
to your codebase before deployment. You may have to preprocess
your LESS files into CSS. You may want to improve your network
performance by bundling and compressing client js into a
single file. You may even want to run your tests, so that
way changes in code do not cause regression issues.

_Grunt_ is an npm module that we'll use with our
npm scipts to automate static processes to our dictionary
apps codebase.

Setting up Grunt
----------------

_Grunt_ is a command line interface that we can use to run
automated processes. The **grunt-cli** is something that
we want to install globally, so we can run grunt anywhere.

`$ npm install -g grunt-cli`

We can now use grunt on any of our projects.

However, for any project we want to use grunt, we need
to install grunt locally:

`$ npm install grunt --save-dev`

The first task we will set up is one for _jshinting_ our code.
So we will also need to install the grunt jshint plugin:

`$ npm install grunt-contrib-jshint --save-dev`

We save it to 'dev' since we need it to build our app.

Now that we have grunt-cli installed globally, and grunt AND
grunt-contrib-jshint installed locally, we are finally ready
to set up our _GruntFile.js_.

Grunt is looking for a file named "GruntFile.js" in your
projects root. Grunt is also expecting that this file
will _export a function_. This function will hold the
Grunt configuration details:

```
module.exports = function(grunt){

};
```

The process for setting up a task goes as follows:

1. Instantiate grunt.initConfig()
2. Name first task as js literal
3. Tell task what files to work on and set options
4. Load the NPM plugin that makes task work
5. Register the defualt/other task

The grunt instance is passed to this function as an argument.

With this grunt instance, the first thing we want to do is
setup and configure our grunt task with _grunt.initConfig()_:

`grunt.initConfig()`

This _initConfig()_ method takes in an javascript literal,
and each key in this literal will be one grunt task.

The first task we want to set up is _jshint_. This will be
a javascript literal too:

`jshint: {}`

and inside this literal will include the details jshint
needs to run.

For example _jshint_ needs to know what files it should
hinting in a key named _files_ that takes an array of files
to _jshint_:

`files: ["*.js", "lib/*.js", "test/*.js"]`

Here we are telling _jshint_ to read ALL of the ".js"
files in the root directory, ALL of the ".js" files in the
lib directory, and ALL of the ".js" files in the test directory.

The other thing we are going to add the the jshint details,
are the _options_, a js literal again:

`options: {}`

For these options, what we want to add are things like:

```
options: {
    esnext: true,
    globals: {
        jQuery: true
    }
}
```

_esnext_ lets Grunt know that cutting edge Ecmascript is
acceptable. We also tell Grunt jQuery is a global so that
way Grunt wont complain.

So now, we have created a new configuration task called
_jshint_. We want to make sure that Grunt has our plugin
for jshint loaded.

Outside of initConfig(), _grunt.loadNpmTasks()_ is where we
can set up our plugins:

`grunt.loadNpmTasks("grunt-contrib-jshint")`

The first argument to loadNpmTasks() is "grunt-contrib-jshint"
which tells Grunt we want to use the grunt-contrib-jshint
plugin.

The last thing we want to do is register a default task:

`grunt.registerTask("default", ["jshint"]);`

So when we run Grunt, we will make sure to run _jshint_.

Since we installed Grunt-cli globally, we just need to
simply run grunt in the terminal:

`$ grunt`

Grunt will then:

- Look a the GruntFile
- Grab the configuration details
- Load the plugin(s)
- Run the Task(s)
