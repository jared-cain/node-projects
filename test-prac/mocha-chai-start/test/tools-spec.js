// PLUCK 'except' FUNCTION OUT OF CHAI.
// CHAI ALSO COMES WITH 'should' ASSERTION ENGINE,
// AND ALSO THE ABILITY 'assert'
var expect = require('chai').expect;


// TOOLS IS WHERE THE 'printName()' FUNCTION LIVES
var tools = require('../lib/tools');





// THE 'describe()' FUNCTION IS WHAT WE WILL USE TO SET UP A
// "suite" OF TESTS.

// HERE WE SET UP A "describe()" FOR A 'printName()' FUNCTION
// SECOND ARGUMENT FOR DESCRIBE IS A CALLBACK FUNCTION
// WHERE WE WILL WRITE ALL OF OUR TESTS FOR 'printName()'
describe("printName()", function () {

    // EACH TEST WE WILL USE AN 'it()' FUNCTION
    // HERE WE ARE DEFINING A TEST THAT SHOULD PRINT
    // THE LAST NAME FIRST, AND THE FIRST NAME LAST...

    // THE SECOND ARGUMENT IS A CALLBACK FUNCTION WHERE
    // WE PERFORM THE TEST..
    it("should print the last name first", function () {

        // WHEN WE WRITE A TEST, WE SIMPLY WANT TO INVOKE
        // THE ITEM WE ARE TESTING.

        // CREATE VARIABLE FOR RESULTS AND INVOKE THE
        // 'printName()' FUNCTION
        var results = tools.printName({ first: "Jared", last: "Cain" });

        // WE EXPECT THE RESULT OF 'printName()' TO RETURN
        // "CAIN" FIRST AND "JARED" SECOND

        // THIS IS WHERE WE USE THE 'expect()' FUNCTION
        // WE EXPECT OUR 'results' '.to' '.equal()'
        // "Cain, Jared"
        expect(results).to.equal("Cain, Jared");

    });

})
