var fs = require("fs");
var path = require("path");
// WE CAN SIMPLY READ THE CONTENTS OF A FILE USING THE
// '.readFile' COMMAND. WHENEVER READING A TEXT FILE,
// THE SECOND ARG TO '.readFileSync' IS THE ENCODING
// THAT THE FILE WILL BE RETURNED AS

// var contents = fs.readFileSync('./lib/sayings.md', "UTF-8");
//
// console.log(contents);




// ASYNCHRONOUS VERSION SIMILAR TO SYNC VERSION EXCEPT THE
// SECOND ARG IS ENCODING AND THIRD IS A CALLBACK FUNCTION
// WHICH RECEIVES AN 'err' OBJECT AND THE 'data' RETURNED FROM
// THE READ

// fs.readFile('./lib/sayings.md', 'UTF-8', function (err, data) {
//     if (err){
//         // ONLY LOG ERROR SINCE THROWING WOULD CRASH PROGRAM
//         console.log(err);
//     }
//
//     console.log(data);
//
// });
//
// console.log("Ran first....");


// ********************************************************
// CHALLENGE: FIND ALL FILES IN DIR AND LIST THEIR CONTENTS
// ********************************************************


fs.readdir("./lib", function(err, files){

    // SINCE 'files' IS AN ARRAY WE CAN '.forEach'

    files.forEach(function(fileName){

        // CREATE FULL PATH BY '.join()' THE CURRENT DIR TO THE "lib" DIR TO THE 'fileName' FILE
        var file = path.join(__dirname, "lib", fileName);

        // NEXT WE WANT TO GET SOME STATS ON OUR FILE
        // THIS WILL ALLOW TO US TO DO THINGS LIKE CHECK TO SEE IF THIS IS A FILE OR DIR
        var stats = fs.statSync(file);

        if(stats.isFile() && fileName !== ".DS_Store"){

            fs.readFile(file, "UTF-8", function(err, contents){
                console.log(contents);
            })

        }
    })

})
