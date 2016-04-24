Nock - Server Mocking
=====================

We can use Nock to create mock web servers. When we test any
functions that require hitting a webserver, we can instead hit
a fake, or _"mock"_ web server.

This will improve the performance, and focus of our tests 

Setting up Nock
---------------

We can install Nock locally as a --save-dev:

`npm install nock --save-dev`

Now we can run our tests with a Nock web server, in place
of hitting a normal web server.

Mocha has a concept called **_hooks_**. We can add hooks
_"before()"_, _"beforeEach()"_, _"after()"_, or _"afterEach()"_
test. What this allows us to do is define
some code we should run BEFORE we run the WHOLE test suite,
AFTER WHOLE test suite, OR BEFORE EACH test in the test, or
AFTER EACH test in the test suite. E.g:

```
before(function(){

    })
```

Now within the 'before()' function we can create a Nock
server before each test in the suite.
"nock()" specifies what _domain_ name to mock.
".get()" specifies the _type_ of request to mock to given path.
".reply()" specifies the status code reply with, along with
a string:

```
nock("https://en.wikipedia.org")
    .get("/wiki/Abraham_Lincoln")
    .reply(200, "Mock Abraham Lincoln Page");
```

Now any code in our test suite that makes a "GET" request
to the wikipedia server at "/wiki/Abraham_Lincoln", will be
intercepted by our Nock server instead.
