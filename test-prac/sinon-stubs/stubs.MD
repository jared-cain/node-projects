Sinon Stubs
===========

Another powerful tool in the Sinon library are _stubs_.
Stubs are essentially more powerful spies, they can do
anything that a spy can do, and in particular, to control
the behavior of a particular function.

We want to use stubs when our program requires us to invoke
functions that behave a certain way. Either they return data,
invoke a callback with data, or even throw an error.
