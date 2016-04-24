Rewire - dependency injection
=============================

**Rewire** is a Node module that will allow us to "inject"
our mocks. Specifically, we want to inject test data,
and use that over real data.

Servers are not the only dependencies that can be mocked.

Any dependency can be mocked. Whenever we are testing a
module or function, we refer to the module/function under
test as **"SUT"** (system under testing).

Any module or function our SUT may be dependent on are
referred to as **"collaborators"**. We can mock out any
dependency and its usually a good idea to do so in tests.

Some dependencies and collaborators may be under development,
which would also REQUIRE us to mock out our code to test.

Whenever our SUT uses data, we want to use "mock" data, instead
of real data, so our tests don't mutate production data.

Setting up Rewire
-----------------

Install rewire locally to --save-dev:

`npm install rewire --save-dev`
