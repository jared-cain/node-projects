var http = require('http');

var data = require('./data/inventory');

http.createServer(function(req, res){

    // NOW WE CAN PROVIDE A COUPLE OF ROUTES THAT ALLOW
    // USERS JUST TO SEE WHATS IN STOCK OR ON BACK ORDER
    if (req.url === "/") {

        //IF REQ HOMEPAGE RESPOND WITH ALL OF THE DATA
        res.writeHead(200, {"Content-Type": "text/json"});

        // RESPOND WITH JSON DATA
        res.end(JSON.stringify(data));

    } else if(req.url === "/instock") {
        listInStock(res);
    } else if(req.url === "/onorder"){
        listOnBackOrder(res);
    } else {
        // IF NONE OF THE ABOVE ASSUME 404
        res.writeHead(404, {"Content-Type": "text/plain"});
        res.end("Whoops.... Data not found.");
    }



}).listen(3000);

console.log("Listening on port 3000.")


// CREATE TWO FUNCTIONS WHICH WILL RECEIVE THE RESPONSE OBJECT

function listInStock(res) {

    // SINCE DATA IS AN ARRAY WE CAN USE THE '.filter()' FUNC
    // USED TO FILTER OUT DATA OBJECTS IN OUR ARRAY FOR
    // SPECIFIC DETAILS. TAKES A CALLBACK FUNCTION
    // WHICH IS INVOKED ONCE FOR EVERY ITEM IN THE DATA.
    // CALLBACK IS CONSIDERED A
    // PREDICATE: IT SHOULD ONLY RETURN TRUE OR FALSE.

    // IF IT RETURNS TRUE,WE ARE GOING TO ADD THIS DATA ITEM
    // TO OUR ARRAY. IF IT RETURNS FALSE, WE WILL SKIP ADDING
    // THE INVENTORY ITEM TO OUR ARRAY

    //CALLBACK RECEIVES THE CURRENT ITEM AS AN ARG

    var inStock = data.filter(function(item){
        return item.avail === "In stock";
    });

    // NOW WE CAN USE OUR RESPONSE OBJECT AND .end() IT BY
    // PASSING IT THE JSON.STRINGIFY OF inStock
    // ESSENTIALLY RESPOND WITH JSON

    res.end(JSON.stringify(inStock));

}

function listOnBackOrder(res) {
    var onOrder = data.filter(function(item){
        return item.avail === "On back order";
    });

    res.end(JSON.stringify(onOrder));
}
