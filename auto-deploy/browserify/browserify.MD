Browserify
==========

**Browserify** is a node project that will allow us to use
commonJS for our client side Javascript as well.

Browsers don't have the _require_ method defined, but Node.js
does. With Browserify you can write code that uses require
in the same way that you would use it in Node.

With Browserify, all we need to do is point out our _client
side_ Javascript files, and it will automatically package up
all of the used modules(dependencies) into one nicely bundled
file that we can send to the client.

Set up Browserify w/Grunt
-------------------------

Install Browserify to local dev dependencies:

`npm install grunt-browserify --save-dev`

Historically we have put our client side Javascript
directly into the "./public/js" folder: such as any client
side Javascript or libraries like jQuery. However, with
Browserify we can bundle all of this from the server side
using _require()_, eliminating the need for multiple requests
from the Browser for client side scripts.

In our current project, _app-client.js_ is the starting point
from which we will tell Browserify to bundle all required
dependencies.

From "app-client.js" we may require jQuery (we will install later):

`var $ = require("jquery");`

If we take a look at our _"./lib"_ folder, we'll notice there
is a _"printTerms.js"_. If we open up this module, we'll notice
that it too uses jQuery. So, we would _also_ like to require
jQuery into the "$" dollar sign alias:

`var $ = require("jquery");`

We are developing these client side modules with the same commonJS
pattern that we've been using for our server side modules.

Now in our _app-client.js_ we can include the _printTerms_ module.
In the same way we include custome modules on our server code, we
can do so with our client files:

`var printTerms = require('./lib/printTerms');`

We have now required all the modules we need to run our client
side code. We still need to install jQuery as a dependency, and
thats not a problem because jQuery has an _npm module_:

`npm install jquery`

Now if we take a look at the "./public/index.html" file, you'll
notice that we're loading our scripts in the historical way

`   
<script src="/js/jquery.min.js"></script>
<script src="/js/dictionary.js"></script>
`

As you can see, we are trying to load jQuery and our dictionary
script files. We moved and renamed "dictionary.js" to _app-client_
and we are using commonJS pattern to load jquery.

Instead, we are going to load ONE Javascript file, and it will
contain all of our bundled client side Javascript:

`<script src="/js/bundle.js"></script>`

So now that we are all set up with our code, we have our index
file loading the appropriate scripts, and we've also required
jQuery in the printTerms function, we are ready to set up our
_Grunt_ task.

Inside of our _GruntFile_ we can include a "browserify" task
right below our "autoprefixer":

`browserify: {

}`

Inside browserify we can add a _client_ node. This will tell us
what files to package up for the client:

`client: {

}`

Our "main" Javascript file is _app-client.js_ , so that is going
to be our "src" file:

`src: ['app-client.js']`

Our _app-client.js_ is the only module we need to reference. When
that module requires other modules, it will automatically package
them up with browserify for us. It will also be packaged up for us
_effeciently_. This means that, even though we've required
jQuery in 2 files, once browserify packages jQuery once, it will
not package it into our bundle again.

We also need to specify our "destination file". With the _dest_
node, we can specify where we want this bundled Javascript to
live:

`dest: "public/js/bundle.js"`

This is the file that "index.html" is trying to load.

Now we must make sure to load the the "grunt-browserify" plugin:

`grunt.loadNpmTasks("grunt-browserify");`

In addition to that, we are going to set up a new task for
Javascript:

`grunt.registTask("js", ["browserify"]);`

Finally, in our "default" task, after
we hint our code and export CSS from LESS, we want to make sure
that we browserify our client scripts.

We should now be able to run `$ grunt js` from our terminal.
Now if we go to the "./public/js" folder, we will see that we
have created our "bundle.js" file.
