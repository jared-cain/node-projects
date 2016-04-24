var expect = require('chai').expect;
var rewire = require('rewire');

var order = rewire('../lib/order');

var sinon = require('sinon');

describe("Ordering Items", function () {

    beforeEach(function () {

        this.testData = [
            {sku: "AAA", qty: 10},
            {sku: "BBB", qty: 0},
            {sku: "CCC", qty: 3}
        ];

        this.console = {
            log: sinon.spy()
        }

        // FIRST THING TO DO IS CREATE A MOCK 'WAREHOUSE'
        this.warehouse = {
            // ADD MOCK 'packageAndShip' THAT IS A 'STUB'
            // THE '.yields()' FUNCTION WILL INVOKE THE
            // CALLBACK THAT IS SENT TO THE 'packageAndShip'
            // FUNCTION, AS IT IS IN "order.js" , AND
            // WE CAN ADD THE ARGUMENTS IT SHOULD SEND
            // TO THAT CALLBACK
            packageAndShip: sinon.stub().yields(10987654321)
        };

        order.__set__("inventoryData", this.testData);
        order.__set__("console", this.console);

        // INJECT MOCK "WAREHOUSE".
        // NOW WHEN WE INVOKE THE "packageAndShip" FUNCTION
        // IN OUR TEST, WE WONT BE SENDING THE CALL TO THE
        // "REAL" WAREHOUSE, WE WILL BE SENDING IT TO OUR
        // "MOCK" WAREHOUSE
        order.__set__("warehouse", this.warehouse);

    })

    // FOR CODE COVERAGE PURPOSES, CHECK "ITEM NOT FOUND" IS WORKING
    it("logs 'item not found'", function(){
        order.orderItem("ZZZ", 10);
        expect(this.console.log.calledWith("Item - ZZZ not found")).to.equal(true);
    })

    it("order an item when there are enough in stock", function (done) {

        var _this = this;

        order.orderItem("CCC", 3, function () {

            expect(_this.console.log.callCount).to.equal(2);
            done();
        })

    });

    // NEST ANOTHER TEST SUITE HERE FOR "WAREHOUSE"
    // WHERE WE WILL WRITE SEVERAL TESTS
    describe("Warehouse interaction", function () {

        // WE'RE GOING TO EXECUTE THE ORDER OF THE TESTS
        // IN A HOOK
        beforeEach(function () {

            // WE WANT TO INVOKE THE "orderItem" FUNCTION
            // REMEMBER!! WE ARE STILL USING OUR "FAKE"
            // SAMPLE DATA. SO WE KNOW WHAT DATA WE HAVE.
            // INSTEAD OF FIRING A CALLACK FUNCTION,
            // WHAT WE DO IS USE A SPY TO CHECK TO SEE IF
            // THE CALLBACK FUNCTION WAS EVEN CALLED
            this.callback = sinon.spy();
            order.orderItem("CCC", 2, this.callback)
        });

        // CHECK THAT SUCCESSFUL ORDER RECEIVES A TRACKING #
        it("receives a tracking number", function () {

            // IF ORDER WAS SUCCESSFUL, THE CALLBACK SHOULD
            // HAVE BEEN INVOKED, AND, IT SHOULD HAVE BEEN
            // INVOKED WITH OUR FAKE TRACKING NUMBER,
            // BECAUSE WE ARE ACTUALLY SEND OUR ORDER TO
            // THE "packageAndShip" "STUB", WHICH IS GOING
            // TO INVOKE OUR CALLBACK, WITH THE FAKE
            // TRACKING NUMBER
            expect(this.callback.calledWith(10987654321)).to.equal(true);

        });

        // WE WANT TO MAKE SURE THAT WE ARE SENDING THE
        // CORRECT DATA TO THE "REAL" WAREHOUSE IN PRODUCTION
        // SO WE'RE GOING TO CHECK THE DATA THAT WEVE SENT
        // TO OUR "MOCK" WAREHOUSE DURING THE TEST
        it("calls packageAndShip with the correct sku and quantity", function () {

            // WE WANT TO MAKE SURE OUR "packageAndShip"
            // FUNCTION WAS INVOKED WITH THE CORRECT
            // QUANTITY. WE WANT TO MAKE SURE WE ARE
            // ORDERING 2 OF ITEM "CCC" LIKE THE TEST
            // DECLARED
            expect(this.warehouse.packageAndShip.calledWith("CCC", 2)).to.equal(true);

        });

    })


});
