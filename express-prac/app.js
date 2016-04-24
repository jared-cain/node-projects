var express = require('express');;
var cors = require('cors');

// WE CAN COLLECT OUR POSTED DATA WITH A PIECE OF MIDDLEWARE
// NAMED 'body-parser' . THIS WILL HELP US PARSE THE POST
// BODY POSTED TO THE API. SO IF WE POST DATA FROM A REST
// API APPLICATION, IT WILL SEND DATA AS JSON. IF WE FILL
// A FORM IN A WEB BROWSER IT WILL BE SENT TO US URL-ENCODED
// WE NEED TO PARSE THESE VARIABLES TO WE CAN USE THEM

var bodyParser = require('body-parser');

var app = express();

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

// ADD BODYPARSER ABOVE THE LOG CUSTOM MIDDLEWARE

// THE FIRST TYPE OF POST BODY WE WANT TO PARSE IS JSON
// IF DATA SENT TO API IS JSON, WE WILL PARSE THAT DATA
app.use(bodyParser.json());


// THE SECOND TYPE OF POST BODY WE WILL WANT TO PARSE IS
// URL-ENCODED. THE '.urlencoded()' METHOD TAKES ONE
// OPTION, 'extended', WHICH WE CAN SET TO FALSE.
// WE ONLY NEED TO SET EXTENDED TO TRUE IF WE HAVE LARGE
// AMOUNTS OF NESTED POST DATA TO PARSE
app.use(bodyParser.urlencoded({ extended: false  }));


// LOG CUSTOM MIDDLEWARE
app.use(function (req, res, next) {

    // NOW THAT WE'VE PARSED THE POST BODY DATA, IT IS NOW
    // ATTACHED TO THE REQ OBJ ON THE '.body' PROPERTY

    console.log(`${req.method} request for '${req.url}' - ${JSON.stringify(req.body)}`);

    next();
});

app.use(express.static("./public"));

app.use(cors());

app.get('/dictionary-api', function (req, res) {
    res.json(skierTerms);
});


// ADD POST ROUTE TO 'dictionary-api'.
// WE CAN HANLDE POST REQ IN CALLBACK FUNCTION,
// WHICH TAKES THE REQ OBJ AND RES OBJ
app.post("/dictionary-api", function (req, res) {
    // PUSH POST DATA TO DICTIONARY
    // AND RES WITH JSON SKIERTERMS
    skierTerms.push(req.body);
    res.json(skierTerms);
});

// SET UP A ROUTE WITH A ROUTING VARIABLE SO THAT WAY WE
// CAN KNOW WHICH TERM TO DELETE. WE CAN SET UP A ROUTING
// VARIABLE BY ADDING TERM AFTER A COLON ":"
// THE VALUE OF TERM WILL BE WHATEVER IS IN THE ROUTE AFTER
// "/dictionary-api/" WITH A DELETE REQ

// HANDLE DELETE WITH CALLBACK WHICH RECEIVES REQ/RES OBJ
app.delete('/dictionary-api/:term', function (req, res) {
    // THE ROUTING VARIABLE WILL NOW BE AVAILABLE ON
    // 'req.params.term'

    // FILTER TERM OUT OF DICTIONARY
    skierTerms = skierTerms.filter(function(def){
        return def.term.toLowerCase() !== req.params.term.toLowerCase();
    });
    res.json(skierTerms);
})


app.listen(3000);

console.log("Express app running on port 3000.");

module.exports = app;
