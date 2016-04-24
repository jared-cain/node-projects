var request = require('supertest');
var expect = require('chai').expect;

// REQUIRE CHEERIO
var cheerio = require('cheerio');

var rewire = require('rewire');
var app = rewire('../app');

describe("Dictionary App", function () {

    it("Loads the home page", function (done) {
        // INVOKE CALLBACK FUNCTION INSTEAD OF "DONE"
        // IMMEDIATELY WHEN SUPERTEST ENDS. THIS CB
        // WILL RECEIVE ANY ERRORS, AND THE RESPONSE
        request(app).get("/").expect(200).end(function(err, res){

            // THE "RES.TEXT" IN THIS CASE IS GOING TO BE HTML.
            // WE CAN USE "CHEERIO" TO CHECK THIS HTML DOM.
            // IT WILL ALLOW US TO SEARCH THE DOM THE SAME
            // WAY WE CAN SEARCH A DOM WITH JQUERY

            // CREATE VARIABLE FOR THE "$" DOLLAR SIGN ALIAS
            // THEN WE'RE GOING TO "LOAD" THE "RES.TEXT" INTO
            // CHEERIO, THEN INTO THE "$"
            var $ = cheerio.load(res.text);

            // NOW WE CAN SEARCH THIS RESPONSE LIKE WE WOULD
            // A JQUERY DOM
            // WE WANT TO CHECK THE PAGE HEADING. CHEERIO
            // WILL TAKE OUR DOM TEXT, AND ALLOW US TO
            // ADD THESE CSS SELECTORS, JUST LIKE JQUERY,
            // FOR SELECTING AN ELEMENT ON THE RETURNED DOM.
            // ALSO JUST LIKE JQUERY, WE CAN PLUCK THE "TEXT"
            // OUT OF THIS H1 ELEMENT
            var pageHeader = $('body>h1:first-child').text();

            expect(pageHeader).to.equal("Skier Dictionary");
            done();
        });
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

            // SOME OF THE EASIEST DATA TO CHECK IS JSON DATA,
            // BECAUSE ALL WE NEED TO DO IS CONVERT A TEXT RESPONSE
            // TO JSON, AND THEN CHECK THE RESPONSE.

            // OUR REQUEST TO "dictionary-api" WE EXPECT WILL RETURN
            // OUR TEST DATA "this.defs" . INSTEAD OF JUST INVOKING
            // THE "DONE" FUNCTION AT THE "END" OF THIS TEST
            // WE ARE GOING TO INVOKE A CALLBACK FUNCTION
            // WHEN SUPERTEST ENDS A RESPONSE, IT WILL INVOKE A
            // CALLBACK FUNCTION, WHERE IT WILL PASS ANY ERRORS
            // AND THE RESPONSE OBJECT
            var defs = this.defs;
            request(app).get("/dictionary-api").expect(200).end(function(err, res){
                // THE "RES.TEXT" SHOULD BE JSON TEXT, WHICH
                // WE PARSE AND PLACE INTO AN ARRAY
                var terms = JSON.parse(res.text);

                // WE EXPECT OUR ARRAY OF TERMS TO EXACTLY
                // EQUAL OUR DEFS. WHENEVER WE USE "TO.DEEP.EQUAL"
                // WE CAN COMPARE TWO OBJECTS
                expect(terms).to.deep.equal(defs);
                done();
            });
        });

        it("POSTS dictionary-api", function (done) {
            request(app)
                .post("/dictionary-api")
                .send( { "term": "Three", "defined": "Term Three Defined" } )
                .expect(200)
                .end(done);
        });

        it("DELETES dictionary-api", function (done) {
            request(app)
                .delete("/dictionary-api/One")
                .expect(200)
                .end(done)

        });

    })

})
