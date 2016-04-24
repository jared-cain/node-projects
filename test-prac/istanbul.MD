Istanbul - Code Coverage phenom
===============================

**Istanbul** is a node module we can use to generate
code Coverage reports.

_Code coverage_ reports tell us how many lines our
test actually cover.

### NOTE: THIS MD COVERS THE 'sinon-stubs/' DIRECTORY!!!

How to Work With Instanbul
--------------------------

We can install Istanbul globally:

`$ npm install -g istanbul`

Istanbul with work with **mocha** as well.

We can **generate** code coverage reports from our _mocha_
tests.

The command to actually run Istanbul with mocha is:

`$ istanbul cover _mocha`

The reason we call "\_mocha" , is because _mocha_ actually
forks this "underscore mocha" process. Both are there, but
Istanbul wont work with regular Mocha.

NOTE: THIS WILL WORK ON NON-WINDOWS ENVIRONMENTS **ONLY**

This is because "\_mocha" is expected to be a js file, which
it is on almost every other mac/linux. On windows however,
it is an executable file. The workaround for this is
declaring the full path to "\_mocha" file and setting
some flags:

`istanbul cover path/to/global/modules/_mocha -- -R spec`

Executing this will run our mocha tests we have written and
generate a code coverage report:

```

  Ordering Items
    √ order an item when there are enough in stock
    Warehouse interaction
      √ receives a tracking number
      √ calls packageAndShip with the correct sku and quantity

  Tools
    printName()
      √ should print the last name first
    loadWiki()
      √ Load Abraham Lincoln's wikipedia page


  5 passing (66ms)

=============================================================================
Writing coverage object [C:\workspace\node-projects-redux\test-prac\sinon-stubs\coverage\coverage.json]
Writing coverage reports at [C:\workspace\node-projects-redux\test-prac\sinon-stubs\coverage]
=============================================================================

=============================== Coverage summary ===============================
Statements   : 83.78% ( 31/37 )
Branches     : 62.5% ( 5/8 )
Functions    : 81.82% ( 9/11 )
Lines        : 83.33% ( 30/36 )
================================================================================

```

As you can see we have Coverage Summary of:

1. Statements =  83.78% of statements
2. Branches = 62.5% of Branches
3. Functions = 81.82% of Functions
4. Lines = 83.33% of Lines

A **coverage** folder now exists in the project root.

This coverage folder contains the **coverage object** as
well as a folder named **lcov-report**.

This _lcov-report_ contains an index.html which is a web page
containing your code coverage report!

One of the first things you'll notice on the page, is that
we are testing files under the "lib/" directory.

In the "lib/" directory, you'll notice a breakdown of coverage
for each file we have tests for in the folder.

If you click on a file in this folder, you'll see a
"line-by-line" breakdown of every line covered by a test, and
how many tests it is covered by. If there is NO tests for a
given line, the line will be red. This breakdown will also
show you where an "if/else" branch is not taken. 
