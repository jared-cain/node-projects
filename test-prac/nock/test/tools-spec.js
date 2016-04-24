var expect = require('chai').expect;
var tools = require('../lib/tools');

// REQUIRE NOCK
var nock = require('nock');

describe("Tools", function () {

    describe("printName()", function () {

        it("should print the last name first", function () {
            var results = tools.printName({ first: "Jared", last: "Cain" });
            expect(results).to.equal("Cain, Jared");
        });
    });

    describe("loadWiki()", function () {

        // ADD A 'before()' FUNCTION
        // THE CODE IN THE CALLBACK FUNCTION IS THE CODE
        // WE WANT TO RUN BEFORE RUNNING EVERY
        // TEST IN THE 'loadWiki()' TEST SUITE
        before(function(){

            // BEFORE RUNNING EVERY TEST IN THIS SUITE
            // WE WANT TO CREATE A NOCK WEB SERVER

            // "nock()" SPECIFIES THE MOCK DOMAIN NAME.
            // WE THEN NEED TO SPECIFY WHAT 'TYPE' OF
            // REQUEST WE ARE MOCKING '.get()'

            // THE LAST THING NOCK WANTS IS WHAT WE SHOULD
            // REPLY WITH. WE PROVIDE A STATUS CODE OF 200,
            // AND WE DONT NEED TO RETURN A WHOLE PAGE, SO WE
            // SAY "MOCK ABRAHAM LINCOLN"

            nock("https://en.wikipedia.org")
                .get("/wiki/Abraham_Lincoln")
                .reply(200, "Mock Abraham Lincoln Page");

        });

        // WE HAVE SUCCESSFULLY GOTTEN IN BETWEEN THE
        // FOLLOWING 'it()' TEST AND ITS REQUEST FOR wikipedia
        // BY MOCKING A FAKE wikipedia SERVER FOR "GET"
        // REQUESTS TO "/wiki/Abraham_Lincoln".

        // ANY CODE THAT MAKES A "GET" REQUEST FOR THAT SERVER
        // WILL ACTUALLY BE HITTING OUR MOCK SERVER INSTEAD.
        // THE TEST THAT MAKES THAT REQUEST? THE
        // 'tools.loadWiki()' FUNCTION SHOULD CAUSE A REQUEST
        // TO OCCUR FOR OUR NOCK SERVER...AND THE 'html'
        // THATS GOING TO BE RETURNED, IS NOW LIMITED TO THE
        // STRING WE DEFINED IN '.reply()'

        it("Load Abraham Lincoln's wikipedia page", function (done) {

            tools.loadWiki({ first: "Abraham", last: "Lincoln"}, function(html){

                // INSTEAD OF SAYING 'to.be.ok' , WE SHOULD
                // '.to' '.equal()' "Mock Abraham Lincoln"
                expect(html).to.equal("Mock Abraham Lincoln Page");
                done();
            } );

        });

    });

})
