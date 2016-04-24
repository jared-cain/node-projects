var fs = require('fs');

// 'fs' HAS AN '.exists()' METHOD THAT WE CAN USE TO CHECK
// THE EXISTENCE OF A FILE OR DIRECTORY
if(fs.existsSync("public")){
    console.log("Directory already there");
} else {

    // THE '.mkdir()' METHOD TAKES 2 ARGS: THE FIRST IS THE
    // DIRECTORY YOU WOULD LIKE TO MAKE, AND THE SECOND IS A
    // CALLBACK THAT IS INVOKED AFTER COMPLETION WHICH IS PASSED
    // AN 'err' ARGUMENT
    fs.mkdir("public", function(err){
        if (err){
            throw err;
        } else {
            console.log("Directory Created");
        }

    });

}
