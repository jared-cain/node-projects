Automation Scripts NPM
======================

NPM also provides us a way to automate running, testing, debugging
our applications, or running _any_ UNIX or DOS commands.

A few of these scripts are quite important because they are
commonly used by developers and infrastructure tools to
automatically install dependencies, run tests, or even install our
application.

In our "package.json" file, we have a _scripts_ node:

`"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
}`

Out of the box "package.json" comes with a default test script.
We can delete this test node, and create our first script node,
_start_.

`"scripts": {
    "start": "node app"
}`

`$ npm start` is a script that we'll use to start our web
application. What we need to do, is define how it starts, which is
`node app`.

Every script has a **pre** script and a **post** script. In a real
world, when we start our site, we want to make sure that _grunt_
runs to generate all of the client files:

`"scripts": {
    "prestart": "grunt"
    "start": "node app"
}`

Now when we run `$ npm start`, `grunt` will run first, and then
we will `node` our app.

```
> ski-dictionary@1.0.0 prestart C:\workspace\node-projects-redux\auto-deploy\automation
> grunt

Running "jshint:files" (jshint) task
>> 5 files lint free.

Running "less:production" (less) task
>> 1 stylesheet created.

Running "autoprefixer:single_file" (autoprefixer) task
>> 1 autoprefixed stylesheet created.

Running "browserify:client" (browserify) task
>> Bundle public/js/bundle.js created.

Done, without errors.

> ski-dictionary@1.0.0 start C:\workspace\node-projects-redux\auto-deploy\automation
> node app

Express app running on port 3000

```

As you can see, we used the keyword `start` to name our script.
`start` is a **keyword** among other _predefined_ npm keywords
like `start`, `install`, `test`, `publish`.

We can also add our own custom scripts here. Lets add a script
we can run while we are doing our development work and call it

`"dev": "open http://localhost:3000 & node-dev app & grunt watch"`

So running `$ npm dev` is going to :

1. Open the browser
2. Start the app using `node-dev`
3. Run a `grunt watch`

Our custom `dev` script has the ability to do a _pre_ and _post_
script as well. The last thing we want to do is wire up a
`predev` script that simply runs grunt:

`"dev": "open http://localhost:3000 & node-dev app & grunt watch"`

In order to run this custom script in the terminal, we must enter
`run` before the command:

`$ npm run dev`

Scripts like `start` `install` `test` `publish` dont need to use
the `run` keyword. But since `dev` is our own, we need `run`.

Running this will open a browser to localhost port 3000, start
the `node-dev` server, and run our `grunt watch` task, to run
our grunt tasks every time a file is updated.  
