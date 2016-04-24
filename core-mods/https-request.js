var https = require('https');
var fs = require('fs');


// IN ORDER TO MAKE AN 'https' REQUEST WE NEED TO CREATE
// AN OPTIONS OBJECT THAT CONTAINS OUR DETAILS
// THE FIRST THING WE NEED IS A HOSTNAME. SECOND A PORT NUMBER
// THIRD A PATH. FINALLY THE METHOD, IN THIS CASE "GET"
var options = {
    hostname: 'en.wikipedia.org',
    port: 443,
    path: "/wiki/George_Washington",
    method: "GET"
};


// WE CAN MAKE A REQUEST USING 'https.request()'. BOTH 'http'
// AND 'https' MODULES HAVE A '.request()' METHOD.

// THE REQUEST METHOD TAKES IN THE REQUEST VIA 'options' AS
// THE FIRST ARGUMENT. THE SECOND ARGUMENT IS A CALLBACK THAT
// EXECUTES ONCE THE REQUEST IS STARTED!!

// 'response' OBJECT IMPLEMENTS THE STREAM INTERFACE
var req = https.request(options, function(res){

    // CREATE VAR TO SAVE OUR BITS FROM RESPONSE STREAM
    var responseBody = "";

    // THE 'response' OBJECT HAS ACCESS TO MULTIPLE PROPERTIES
    // INCLUDING THE '.statusCode' INT AND THE '.headers' OBJ

    console.log("Response from server started.");
    console.log(`Server status: ${res.statusCode}`);
    console.log("Response Headers: %j", res.headers);

    // BY DEFAULT THE Response OBJECT WILL BE BINARY
    // WE CAN CHANGE THAT BY SETTING THE ENCODING WITH THE
    // 'res.setEncoding()' METHOD
    res.setEncoding("UTF-8");


    res.once('data', function(chunk){
        console.log(chunk);
    });

    res.on('data', function(chunk){
        console.log(`--chunk-- ${chunk.length}`);
        responseBody += chunk;
    });

    res.on('end', function(){
        fs.writeFile("george-washington.html", responseBody, function(err){
            if (err) {
                throw err;
            } else {
                console.log("File has been downloaded.");
            }
        });
    })

});


// SINCE WE CREATED OUR REQUEST TO THE VAR 'req' , WE CAN NOW
// WIRE UP OTHER EVENT LISTENERS ON THE REQUEST OBJECT.
req.on('error', function (err) {
    console.log(`problem with request: ${err.message}`);
});

// WE ALSO WANT TO MAKE SURE TO END OUR REQUEST
// WHEN THERE ARE NO MORE LISTENERS OR DATA FLOWING IN 
req.end();
