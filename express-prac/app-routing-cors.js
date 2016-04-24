var express = require('express');;
// REQUIRE "cors". CORS IS A FUNCTION THAT RETURNS
// SOME MIDDLEWARE. CORS ALLOWS US TO SERVE CONTENT TO
// SITES WITH DIFFERENT DOMAIN NAMES. CROSS ORIGIN
// RESOURCE SHARING.
var cors = require('cors');


var app = express();

// DATA TO WORK WITH. ARRAY OF OBJECTS.
// WE WANT TO TAKE THIS DICTIONARY OF TERMS AND SERVE IT ON
// THE API ROUTE

var skierTerms = [
    {
        term: "Rip",
        defined: "To move at a high rate of speed"
    },
    {
        term: "Huck",
        defined: "To throw your body off of something, usually a natural feature like a cliff"
    },
    {
        term: "Chowder",
        defined: "Powder after it has been sufficiently skied"
    }
];

app.use(function (req, res, next) {
    console.log(`${req.method} request for '${req.url}'`);
    next();
});

app.use(express.static("./public"));


// NOW WE WANT TO INCLUDE CROSS ORIGIN RESOURCE SHARING
// TO ALL OF OUR API REQUESTS. WE WANT TO ADD THIS BELOW
// WHERE WE HANDLED THE STATIC MIDDLEWARE, BUT ABOVE WHERE
// WE HANDLE OUR API MIDDLEWARE
app.use(cors());

// NOW ANY DOMAIN CAN MAKE A DICTIONARY REQUEST TO OUR API



// SET UP A 'GET' ROUTE. THE FIRST ARG THAT IT TAKES IS
// LOCATION OF THE ROUTE. THE SECOND ARG IS THE FUNCTION
// THAT WILL ACTUALLY HANDLE ANY SPECIFIC REQUESTS FOR THAT
// ROUTE. THIS CALLBACK WILL TAKE A REQ OBJ, AND RES OBJ

// THESE ARE THE SAME HTTP REQ AND RES OBJECTS AS BEFORE.
// EXCEPT THESE HAVE BEEN EXTENDED BY EXPRESS TO ADD
// FUNCTIONALITY AND MAKE THINGS EASY FOR US.

// THE RES OBJ NOW HAS A '.json()' METHOD. WE CAN GIVE IT
// A JSON OBJECT OR ARRAY AND IT WILL TAKE CARE OF STRINGIFY
// AND SETTING UP THE HEADERS TO REPLY WITH JSON RESPONSE
app.get('/dictionary-api', function (req, res) {
    res.json(skierTerms);
});



// TELL EXPRESS APP TO LISTEN TO PORT 3000
app.listen(3000);

console.log("Express app running on port 3000.");

module.exports = app;
