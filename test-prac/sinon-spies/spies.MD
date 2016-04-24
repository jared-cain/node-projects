Sinon Spies
============

Spies are special kinds of functions that record details
about how they are called, what arguments they are called with,
and the state of the 'this' object that is associated with
every function. We can use spies in place of real functions.
They allow us to check and make sure a specific function is
invoked, without having to invoke a 'real' function.

We can install sinon locally to --save-dev:

`npm install sinon --save-dev`

Now if we run mocha from our root folder we should get:

```
  Ordering Items
ordering 3 of item # CCC
order shipped, tracking - 123456789
    √ order an item when there are enough in stock (1510ms)

  Tools
    printName()
      √ should print the last name first
    loadWiki()
      √ Load Abraham Lincoln's wikipedia page (45ms)


  3 passing (2s)
```

Looking at the "Ordering Items" suite, this is all correct
according to the function which is being tested which is
_order.orderItem()_ , our custom module in "./lib/order.js"

Ordering items actually "console.log's" things to the console:

```
ordering 3 of item # CCC
order shipped, tracking - 123456789
```

However, they are making our test look trashy, so we dont
want to 'actually' invoke a "console.log". However, ordering
an item should add this data to the 'log'.

What we're going to do is use sinon spy for console logs,
just to make sure the "console.log" was called appropriately,
without having to actually log anything to the console.

First we include sinon into the test module:

`var sinon = require('sinon');`

Then we can create our mock _console_ object:

`this.console = {}`

_this.console_ is a replacement for the console object in
our current mocha test _only_.

Now we can add a _log()_ function to our console object,
but for that log function, we are going to use a _spy_:

```
this.console = {
    log: sinon.spy()
}
```

A _spy_ is technically a function, so it can be invoked in the
same manner as a normal 'console.log()'. Of course, it's
not the 'real' "console.log()" function. This spy will
give us details on _how_ "console.log()" was called, and
with _what data_ it was given.

In our "order" module, console log is called twice. Once
during the start of the order, and once after a call to
the warehouse to packageAndShip is finished... We want
to make sure both of these are actually getting called,
but with our "sinon.spy"

In our test, we can replace the "console" object with
our "this.console" object using rewire:

`order.__set__("console", this.console);`

Now if you were to run mocha in terminal, you'll notice that
the "orderItem" test is passing, but the previous
console logs are gone:

```
Ordering Items
  √ order an item when there are enough in stock (1520ms)

Tools
  printName()
    √ should print the last name first
  loadWiki()
    √ Load Abraham Lincoln's wikipedia page (41ms)


3 passing (2s)
```

We have replaced our "console" with a mock console.

The next thing we want to do is check to make sure the
"console.log's" happened appropriately.

First we want to protect the scope of "this" to the mocha
object:

`var _this = this;`

Now we have a reference to the mocha object when we fall
out of scope in our "orderItems" test function, as
demonstrated below.

We need this to check "our" console. We're going to use
chai to expect that our "fake" "console.log" callCount
to equal 2:

```
order.orderItem("CCC", 3, function () {

    expect(_this.console.log.callCount).to.equal(2);

    done();
})
```
Now if you were to run this test in the terminal via mocha
it will pass. Something to note quickly, if you change
the expect() function above to equal only 1 callCount
you will get an error like so:

```

  Ordering Items
    1) order an item when there are enough in stock

  Tools
    printName()
      √ should print the last name first
    loadWiki()
      √ Load Abraham Lincoln's wikipedia page (41ms)


  2 passing (2s)
  1 failing

  1) Ordering Items order an item when there are enough in stock:

      Uncaught AssertionError: expected 2 to equal 1
      + expected - actual

      -2
      +1

```
