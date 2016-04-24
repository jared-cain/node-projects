var expect = require('chai').expect;
var rewire = require('rewire');

var order = rewire('../lib/order');

// INCLUDE SINON
var sinon = require('sinon');

describe("Ordering Items", function () {

    beforeEach(function () {


        this.testData = [
            {sku: "AAA", qty: 10},
            {sku: "BBB", qty: 0},
            {sku: "CCC", qty: 3}
        ];

        // CREATE MOCK "console" OBJECT AS OBJECT LITERAL
        this.console = {
            // CREATE A 'log()' FUNCTION, BUT FOR THAT log
            // FUNCTION, WE ARE GOING TO USE A SINON SPY.
            // A SPY IS A FUNCTION, SO IT CAN BE INVOKED
            // LIKE 'console.log()' BUT ITS NOT THE 'REAL'
            // CONSOLE LOG FUNCTION. THIS SPY WILL GIVE US
            // DETAILS ON "HOW" CONSOLE.LOG IS CALLED, AND
            // WITH WHAT DATA
            log: sinon.spy()
        }

        order.__set__("inventoryData", this.testData);

        // SET CONSOLE OBJECT TO 'this.console'
        order.__set__("console", this.console);

    })

    it("order an item when there are enough in stock", function (done) {

        // CHECK TO SEE THAT CONSOLE LOGS WERE ACTUALLY
        // CALLED. SAVE A REFERENCE TO THE MOCHA OBJECT
        // FOR USE INSIDE orderItem
        var _this = this;

        order.orderItem("CCC", 3, function () {
            // WE HAVE FALLEN OUT OF SCOPE OF THE MOCHA
            // OBJECT, BUT WE HAVE A REFERENCE WITH '_this'

            // WHAT WE NEED IT FOR, IS TO CHECK THE CONSOLE
            // LOG WE CREATED TO SEE IF ITS CALLCOUNT
            // IS 2
            expect(_this.console.log.callCount).to.equal(1);
            done();
        })

    });



});
