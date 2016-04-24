var http = require('http');


//  WE CAN CREATE A SERVER USING '.createServer()' METHOD ON THE
// 'http' MODULE. THE 'createServer()' METHOD TAKES A CALLBACK
// FUNCTION THAT GETS INVOKED EVERY TIME THERE IS A REQUEST

// WHAT WE GET WITH THIS FUNCTION IS THE ACTUAL REQUEST OBJECT
// THIS 'req' OBJECT WILL CONTAIN INFORMATION ABOUT THE
// REQUESTED HEADERS, AND DATA THAT IS GOING ALONG WITH THE
// REQUEST, AS WELL AS INFORMATION ABOUT OUR USER LIKE ENVIRON
// AND SO FORTH

// WE ALSO GET A BLANK RESPONSE OBJECT AND IT IS OUR JOB TO
// COMPLETE THE RESPONSE 'res'
var server = http.createServer(function(req, res){

    // THE FIRST THING WE WANT TO DO IS WRITE THE RESPONSE
    // HEADERS USING THE '.writeHead()' METHOD.
    // THE FIRST ARGUMENT IS A STATUS CODE
    // THE SECOND ARG IS A JSON LITERTAL OF HEADERS YOU WOULD
    // LIKE TO ADD TO THE RESPONSE
    res.writeHead(200, {"Content-Type": "text/html"});

    // NEXT IF WE WANTED TO WE CAN END THE RESPONSE AND SEND
    // SOME DATA USING THE 'res' OBJECTS '.end()' METHOD

    res.end(`
        <!DOCTYPE html>
        <html>
            <head>
                <title>HTML Response</title>
            </head>
            <body>
                <h1>Serving HTML Text</h1>
                <p>${req.url}</p>
                <p>${req.method}</p>
            </body>
        </html>
        `);

});

// FINALLY WE NEED TO TELL THIS SERVER INSTANCE WHAT IP AND PORT
// IT SHOULD BE LISTENING FOR INCOMING REQUESTS ON, BY USING THE
// '.listen()' METHOD
server.listen(3000);

console.log("Server listening on port 3000");
