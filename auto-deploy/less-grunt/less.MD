LESS - CSS PreProcessor
=======================

One of the things we need to do as web developers is preprocess
style-sheet languages into CSS.

CSS by itself doesn't support any programming functionality,
so there are languages like LESS, SASS, and SCSS, that we can
use to get some higher functionality out of our style files.

In our _public/_ folder, we dont currently have a CSS file.
We are going to produce that file with our _less_ style-sheet.

Setting up LESS with Grunt
--------------------------

There is a plugin we can install to help convert our LESS to
CSS:

`$ npm install grunt-contrib-less --save-dev`

We can now add another task to _GruntFile.js_:

`less: {}`

Now we need to specify where the LESS files are, and where
the CSS should go. We do this in a _production_ node:

`production: { }`

The next thing we want to add is a _files_ node under the
production node, so that we know how to convert the LESS
files into CSS in our production environment:

`files: {

    }`

We want to publish our CSS to "public/css/style.css".
The value of this key is an array containing all of the LESS
files we intend to use to make this style.css file. In this
case, ALL of the .less files under the less/ folder:

`files: {
        "public/css/style.css": ["less/*.less"]
    }`

We also need to add our task. This will add the less plugin
to Grunt, so that we can use it:

`grunt.loadNpmTasks("grunt-contrib-less");`

The other thing we need to do is register our task.
Instead of registering this as a "default" task, register
this task as "css":

`grunt.registerTask("css", ["less"]);`

Now we can head over to the terminal and do this conversion via:

`$ grunt css`

Now if we navigate to our "public/" files, we should notice
there is a CSS folder. The Grunt _less_ task made this CSS
folder. Under it is an exported _style.css_.


### Auto Prefixing vendor prefixes


If we look at the style.css, we notice we're using Flexbox
quite often. This will run into issues with certain web
browsers without the correct vendor prefixes, so we need to
add them. This can be a daunting task to do by hand.
**Grunt** has a way of _auto prefixing_ CSS files so that it
will work in as many browsers as possible.

Lets add the _autoprefixer_ plugin locally to dev now:

`$ npm install grunt-autoprefixer --save-dev`

With _grunt_autoprefixer_ installed, we can now configure
a Grunt task for autoprefixing. In the GruntFile, underneath
the "less" task, we can go ahead an add an "autoprefixer"
node:

` autoprefixer: {} `

We can go ahead and say we want auto-prefixing to happen on a
single file, with a "single_file" node:

`single_file: {}`

Underneath the "single_file" node, we are going to declare
the source of the file in an "src" node:

`src: "public/css/style.css"`

We are going to autoprefix our "exported" CSS file.

Then we want to run our autoprefixer, and re-export, or
overwrite the "style.css" file, with our vendor prefixes.
We can do this by using a "dest" node:

`dest: "public/css/style.css"`

Now we've configured the auto prefixer and we've told it
which file to run on, and what file to export, we need to
remember to ".loadNpmTasks":

`grunt.loadNpmTasks("grunt-autoprefixer");`

Now here's the prestige, were going to add this to our
"CSS" task:

`grunt.registerTask("css", ["less", "autoprefixer"])`

Whenever we run `$ grunt css` the first thing we want to do
is export our CSS file from LESS, and the second thing we
want to do is autoprefix that exported file.

So we will set up a call to the "autoprefixer" task from
`grunt css`.

The OTHER thing we are going to do, is add our "css" task
to our default grunt task:

`grunt.registerTask("default", ["jshint", "css"])`

So now by default when we run Grunt, we're going to run
"jshint", then we are going to execute the "css" task:

`$ grunt`

Now if you head to the "public/css/style.css" stylesheet,
you'll see vendor prefixes have been added everywhere they
need to be, in specific, the flexbox properties.
