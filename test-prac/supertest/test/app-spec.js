// REQUIRE Supertest
// THE REQUEST VARIABLE IS A FUNCTION WE CAN USE TO MAKE
// REQUESTS OF OUR HTTP APPLICATION
var request = require('supertest');
var expect = require('chai').expect;
var rewire = require('rewire');
var app = rewire('../app');

describe("Dictionary App", function () {

    it("Loads the home page", function (done) {
        // USE SUPERTEST TO MAKE A "REQUEST" OF THE "APP"
        // MODULE. IF WE DO A "GET" REQUEST OF THE "HOME"
        // ROUTE, WE "EXPECT" A "200" SUCCESS STATUS. ALSO
        // THIS IS AN ASYNCHRONOUS TEST SO WE NEED TO TELL
        // SUPERTEST WHEN IT IS OVER WITH ".END()". WE CAN ADD
        // A CALLBACK FUNCTION TO RUN WHEN SUPERTEST FINISHES
        // THE TEST, WHICH WE DO HERE BY ADDING MOCHAS "DONE"
        // FUNCTION. WHEN SUPERTESTS ASYNC TEST IS FINISHED,
        // WE END IT, AND ALSO END MOCHAS ASYNC PROCESS
        request(app).get("/").expect(200).end(done);
    });

    describe("Dictionary API", function () {

        beforeEach(function () {

            this.defs = [
                {
                    term: "One",
                    defined: "Term One Defined"
                },
                {
                    term: "Two",
                    defined: "Term Two Defined"
                }
            ];

            app.__set__("skierTerms", this.defs);

        });

        it("GETS dictionary-api", function (done) {
            request(app).get("/dictionary-api").expect(200).end(done);
        });

        it("POSTS dictionary-api", function (done) {
            // MAKE A POST REQUEST TO "dictionary-api"
            // SINCE WE ARE POSTING, WE NEED TO ".SEND()"
            // SOME DATA, WHICH IS A NEW TERM HERE
            // WE EXPECT A 200 STATUS CODE, THEN WE END THE
            // SUPERTEST REQUEST AND MOCHA TEST
            request(app)
                .post("/dictionary-api")
                .send( { "term": "Three", "defined": "Term Three Defined" } )
                .expect(200)
                .end(done);
        });

        it("DELETES dictionary-api", function (done) {
            // MAKE A DELETE REQUEST OF THE "dictionary-api"
            // AND SEND IT THE TERM "One". THIS WILL HIT
            // OUR "this.defs" ARRAY, WHICH CONTAINS ONE,
            // SO WE "EXPECT" THIS TO RETURN 200 STATUS
            request(app)
                .delete("/dictionary-api/One")
                .expect(200)
                .end(done)

        });

    })

})
