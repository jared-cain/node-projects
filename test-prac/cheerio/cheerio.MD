Cheerio
=======

_Cheerio_ is an npm module that can parse, manipulate, and render
html from the server. It is implemented through core jQuery
design.

Checking a json response is fairly simple. We just parse the JSON
and check it for a response. If we have an HTML response,
we need to use cheerio to be able to parse the DOM before
checking it.

We will be using cheerio to parse and then check the http
responses we get from our tets. Because it is implemented
through core jQuery syntax, we can search the DOM returned
by our tests in the same way we search the DOM w/jQuery.

Setting up Cheerio
------------------

Cheerio is a local dev module:

`$ npm install cheerio --save-dev`

Now we can _require()_ cheerio in our test module:

`var cheerio = require('cheerio');`

At the end of our supertest, instead of calling _done()_, like we've
been doing, we may add a callback instead:

`request(app).get("/").expect(200).end(function(err, res){ } )`

This callback will receive any _errors_ as well as the _response_
object.

From here, we will need to _load()_ the HTML response's text
into _cheerio_, which we load into a _"$"_ alias:

`var $ = cheerio.load(res.text);`

Now we can search the HTML response just like a jQuery DOM.
In this example we want to check the _pageHeading_. Cheerio
will take our HTML text, converts it to a DOM, and allows
us to add these CSS Selectors (just like jQuery) for selecting
an element on the returned DOM. ALSO just like jQuery, we
can pluck the text out of the selected element. Altogether:

`var pageHeading = $("body>h1:first-child").text();`

Now we can perform our test:

`expect(pageHeader).to.equal("Skier Dictionary");`
