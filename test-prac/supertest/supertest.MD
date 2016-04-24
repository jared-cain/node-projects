Supertest - HTTP endpoint TESTS
===============================

We would also like the ability to test our _http_ applications.

Supertest is a popular node module test app that works well
with express Apps.

We must export our **app** module so that supertest may work
with it directly by importing it.

In addition to that, we have some additional _skier terms_,
which is the production data in this App. This data can change,
so in order to take control of our test, we will need to inject
some skier terms.

`app.__set__("skierTerms", this.defs);`

Inside of our _app-spec_, inject our mock array
of terms _this.defs_ into our app in lieu of _skierTerms_.

This will give us some control. This means that if we do a
"GET" request for data with our app, we should see two terms
and these are the terms we should actually see.

The module we need to use to test the requests is _supertest_.

Setting up Supertest
--------------------

Install supertest globally:

`$ npm install -g supertest`
