// REQUIRE HTTPS MODULE TO LOAD WIKI PAGE
var https = require('https');

module.exports = {

    printName(person){
        return `${person.last}, ${person.first}`;
    },

    // 'loadWiki()' TAKES A PERSON OBJECT AND A CB FUNCTION
    loadWiki(person, callback){

        // CREATE URL OF PERSON WE WOULD LIKE TO REQUEST
        var url = `https://en.wikipedia.org/wiki/${person.first}_${person.last}`

        // ONCE HTTPS MODULE GETS THE URL, IT WILL PASS
        // THE RESPONSE OBJECT TO THE CB FUNCTION. THE CB
        // STARTS PASSING DATA AS SOON AS THE URL IS CONNECTED
        // WE COLLECT THE STREAM OF DATA IN THE 'body' VAR
        https.get(url, function (res) {

            var body = "";

            res.setEncoding("UTF-8");

            res.on("data", function (chunk) {
                body += chunk;
            });

            // WIRE UP AN 'end' LISTENER SO WE CAN INVOKE
            // OUR CALLBACK WHEN WE HAVE THE WHOLE PAGE
            res.on("end", function () {
                // SEND THE PAGE
                callback(body)
            })

        })

    }

}
