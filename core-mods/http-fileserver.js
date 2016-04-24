// IN ORDER TO BUILD A WEB SERVER WE MUST USE THE 'HTTP' MODULE
// IN CONJUNCTION WITH THE 'FS' MODULE. WHEN WE REQUEST A File
// WE WILL NEED 'FS' TO LOAD THAT FILE, THEN WE USE THE 'HTTP'
// MODULE TO RESPOND WITH ITS CONTENTS.

// WE CAN ALSO USE 'PATH' FOR HELP WITH FILENAMES

var http = require('http');
var fs = require('fs');
var path = require('path')


http.createServer(function(req, res){

    // LOG REQUEST DETAILS FIRST
    console.log(`${req.method} request for ${req.url}`);

    // CHECK IF REQUEST IS FOR HOME PAGE
    if(req.url === "/"){

        // WE NEED TO SERVE INDEX FILE. WE CAN USE FS TO READ
        // THE FILE
        fs.readFile("./public/index.html", "UTF-8", function(err, html){

            // ONCE WE HAVE THE CONTENTS OF THE FILE, THAT IS
            // WHEN WE WILL WRITE TO RESPONSE
            res.writeHead(200, {"Content-Type": "text/html"});
            res.end(html);

        })

        // SINCE 'req.url' IS A STRING, WE CAN USE '.match()'
        // METHOD TO SEE IF ANY FILES MATCH THE REGEXP
    } else if(req.url.match(/.css$/)){

        //CREATE A PATH TO CSS FILE WITH 'path.join()'
        var cssPath = path.join(__dirname, 'public', req.url);

        // NOW INSTEAD OF USING THE 'fs.readFile()' METHOD
        // TO READ THE FILE, WE WILL USE A STREAM.

        // WE WILL USE THE 'fs.createReadStream()' METHOD
        var fileStream = fs.createReadStream(cssPath, "UTF-8");


        // NOW THAT WE HAVE A STREAM FOR THE CSS, WE CAN BEGIN
        // PIPING IT ALONG TO THE RESPONSE

        res.writeHead(200, {"Content-Type": "text/css"});

        // SINCE WE HAVE A READ STREAM, WE CAN '.pipe()'
        // THE READ STREAM TO A WRITABLE STREAM
        // ESSENTIALLY PIPING OUR READ STREAM TO THE RESPONSE

        fileStream.pipe(res);


    } else if (req.url.match(/.jpg$/)) {

        var imgPath = path.join(__dirname, 'public', req.url);

        // SENT AS BINARY INSTEAD OF TEXT. NO UTF-8 ENC
        var imgStream = fs.createReadStream(imgPath);

        // BINARY DATA WE'RE RESPONDING WITH JPEG
        res.writeHead(200, {"Content-Type": "image/jpeg"});

        imgStream.pipe(res);

    } else {

        // 404 ERROR IF ANYTHING ELSE
        res.writeHead(404, {"Content-Type": "text/plain"});
        res.end("404 File Not Found");

    }

}).listen(3000)

// WE CAN CHAIN THE '.listen()' COMMAND RIGHT ON
// THE END OF THE CALL TO '.createServer()'


console.log("Server listening on port 3000.");
