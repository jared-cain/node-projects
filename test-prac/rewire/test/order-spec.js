var except = require('chai').expect;

// PULL IN REWIRE. WE USE REWIRE TO REQUIRE OUR SUT.
// BUT REWIRE GIVES US A WAY OF INJECTING DATA
// INTO THAT MODULE
var rewire = require('rewire');

// PULL IN OUR SUT, 'ORDER' MODULE
// INSTEAD OF USING 'require' WE USE 'rewire'
var order = rewire('../lib/order');

// DESCRIBE TEST SUITE
describe("Ordering Items", function () {

    // WILL EXECUTE BEFORE EACH OF OUR TESTS!!
    beforeEach(function () {

        // SET UP SOME TEST DATA
        // REALISTICALLY WE DO NOT NEED FULL INVENTORY ITEMS
        // FOR OUR TEST DATA. OUR "ORDER" FUNCTION ONLY
        // CHECKS FOR THE "SKU" AND "QTY", SO THATS ALL
        this.testData = [
            {sku: "AAA", qty: 10},
            {sku: "BBB", qty: 0},
            {sku: "CCC", qty: 3}
        ];

        // SINCE WE'VE LOADED THE 'ORDER' MODULE WITH 'REWIRE'
        // WE CAN GET AND SET PRIVATE VARIABLES IN THAT MODULE

        // THE PRIVATE VARIABLE WE WOULD LIKE TO
        // SET IN THE ORDER MODULE IS THE
        // "inventoryData" VARIABLE. WE DONT WANT
        // THE REAL INVENTORY DATA TO BE USED,
        // WE WANT TO INJECT OUR MOCK/FAKE DATA

        // "._set_()" TAKES 2 ARGS: THE PRIVATE VAR TO MOCK
        // AND WHAT TO SET IT TOO.

        // SINCE WE USED THE 'this' KEYWORD TO CREATE OUR
        // TEST DATA, 'this' IS THE MOCHA OBJECT, WHICH
        // MEANS WE CAN USE THE TEST DATA IN THE TEST ITSELF
        order.__set__("inventoryData", this.testData);

    })

    it("order an item when there are enough in stock", function (done) {

        // PLACE ORDER, DATA SHOULD BE REPLACED WITH TEST DATA
        order.orderItem("CCC", 3, function () {
            done();
        })

    });



});
