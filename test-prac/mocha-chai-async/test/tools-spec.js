
var expect = require('chai').expect;
var tools = require('../lib/tools');

// 'describe()' STATMENTS CAN BE NESTED
describe("Tools", function () {

    describe("printName()", function () {

        it("should print the last name first", function () {
            var results = tools.printName({ first: "Jared", last: "Cain" });
            expect(results).to.equal("Cain, Jared");
        });
    });

    // OPEN ANOTHER DESCRIBE STATEMENT FOR ASYNC TESTS
    describe("loadWiki()", function () {

        // WE CAN UP THE TIME MOCHA WAITS TO TIMEOUT A TEST
        // BY SETTING THE "timeout()" METHOD ON OUR MOCHA
        // OBJECT 'this'
        this.timeout(5000);

        // BY ADDING THE 'done' VARIABLE TO THE 'it()'
        // FUNCTION'S CALLBACK, WE ARE TELLING MOCHA
        // THIS IS AN ASYNC TEST. 'done' THEN BECOMES
        // A FUNCTION THAT MOCHA WILL WAIT TO RUN THE TEST
        // UNTIL IT IS INVOKED.
        // THIS MEANS WE ARE NOT FINISHED WITH THIS TEST
        // UNTIL THIS 'done' FUNCTION IS FIRED
        it("Load Abraham Lincoln's wikipedia page", function (done) {

            // 'loadWiki()' FUNCTION WILL TAKE 2 ARGUMENTS:
            // ONE IS AN OBJECT REFERRING A PERSON, AND the
            // SECOND IS A CALLBACK FUNCTION THAT WILL
            // RECEIVE THE HTML OF THE WIKI PAGE AS ITS ARG
            tools.loadWiki({ first: "Abraham", last: "Lincoln"}, function(html){

                // NOW WE WANT TO MAKE SURE HTML EXISTS

                // THIS MEANS WE ACTUALLY HAVE THIS FUNCTION
                // INVOKED, AND THE HTML VARIABLE RETURNED,
                // AND WE ACTUALLY HAVE HTML VARIABLE;
                expect(html).to.be.ok;

                // INVOKE 'done()' WHEN THE TEST IS
                // TECHNICALLY FINISHED
                done();

            } );

        });

    });

})
