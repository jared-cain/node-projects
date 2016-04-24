Testing and Unit Testing
========================

"Unit Testing" is the best way to uncover hidden bugs in an
application. In todays world, writing good unit tests is not
only a requirement for a programming language, it is an
essential skill for a software developer as well.

The javascript community has created several testing frameworks
that will help us with the task of writing unit tests e.g.
Jasmine, mocha, jest, Qunit.

Mocha and Chai
--------------

### Setting up Mocha

In the following projects, we will be using Mocha with Chai
to do our unit testing. It may be installed globally:

`$ npm install -g mocha`

We must make a "test" directory so that way mocha knows where
to run tests from:

`$ mkdir test`

Now to run our tests, we type `mocha` into the cmd line:

`$ mocha`

### Stubbing our first test

We can create a file in our 'test' folder. For example,
create a file named 'test/tools-spec.js'.

We are going to participate in **TDD** (Test Driven Development).

This means we are going to:

1. watch the tests first
2. watch the tests fail
3. then write code to make our tests pass

We can now create a _'-spec'_ file in the '/test' directory.

Now in our Terminal we can run `mocha` like before, and
this time we get:

```
printName()
  - should print the last name first


0 passing (45ms)
1 pending
```

Mocha has found our _'-spec'_ file in our _'test'_ directory
and executed the _'printName()'_ test suite.
The pending status is currently 1. This is because
we "Stubbed our test" with the _'it()'_ function.


### Setting up Asssertion Engine: Chai

To write our first test, we are going to need an
_Assertion Engine_.

Mocha gives us a suite for describing, running, and building
tests, but it does not give us a way to _check values_. That
is where you may consider **Chai**.

Install Chai locally with --save-dev:

`npm install chai --save-dev`

Now we have available locally to us multiple assertion engines
such as: **"expect"**, **"should"**, and **"assert"**.
We can use these by requiring them like so:

`var expect = require('chai').except;`

Now within one of Mocha's "it()" functions, we can set up
our assertion by simply:

+ invoking the item we want to test

   `var results = tools.printName( { first: "Jared", last: "Cain" } );`
+ invoking our assertion engine function on the results

   `expect(results).to.equal("Cain, Jared");`

If we **stub** our _"printName()"_ function in a file named
"lib/tools.js", and try to run our test above, we recieve
an Assertion Error:

```
  printName()
    1) should print the last name first


  0 passing (57ms)
  1 failing

  1) printName() should print the last name first:
     AssertionError: expected undefined to equal 'Cain, Jared'
```

Now if we finish our _"printName()"_ function to satisfy
our unit test, we will see completion:

```

  printName()
    √ should print the last name first


  1 passing (44ms)


```


Asynchronous Unit Testing
-------------------------

Sometimes the functions we test need a little more time
to operate. A good example of this is a _web request_.
When we request a web page, it takes a little bit of time
to download that page before the task is complete

In order to test an Asynchronous process in Mocha, we must
tell mocha to wait until the task is complete before running
the test.

To make a test Asynchronous, we have the option of passing
a "done" variable to the "it()" function callback:

`it("Load Abe Lincolns wikipedia page", function(done){...})`


Now inside of the "it()" blocks' callback function, we can run
our test like so:

```
tools.loadWiki({ first: "Abraham", last: "Lincoln"}, function(html){
    expect(html).to.be.ok;
    done();
} );
```

Here we show that you have to explicitly call "done()" after the
test is finished.

The standard time for a Mocha object to timeout is 2 seconds.
We can update this by changing the ".timeout" property
on our mocha object:

`this.timeout(5000);`
