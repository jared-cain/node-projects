var fs = require('fs');

// YOU CANNOT REMOVE A DIRECTORY WITH FILES IN THEM
fs.readdirSync('./assets').forEach(function(fileName){
    fs.unlinkSync("./assets/" + fileName);
})


// WE CAN REMOVE DIRECTORY WITH '.rmdir'. TAKES TWO ARGS.
// THE FIRST ARG IS THE DIRECTORY YOU WOULD LIKE TO RM
// THE SECOND ARG IS A CALLBACK FUNCTION WHICH RECEIVES AN
// 'err' OBJECT AS ITS ONLY ARGUMENT
fs.rmdir('./assets', function(err){
    if(err){
        throw err;
    }

    console.log("Assets Directory Removed");
});
