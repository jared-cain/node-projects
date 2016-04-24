var fs = require('fs');

if (fs.exists('./lib/project-config.js')){
// SYNC VERSION OF RENAME METHOD. THE FIRST ARGUMENT IS THE FILE
// WE WANT TO RENAME. THE SECOND ARGUMENT IS GOING TO BE THE
// NEW NAME FOR THIS FILE.
    fs.renameSync("./lib/project-config.js", "./lib/config.json");

} else {
    console.log("Already renamed.");
};


// SIMILARLY YOU CAN MOVE A FILE WITH '.rename' BY
// CHANGING THE DIRECTORY IN THE SECOND ARGUMENT
// THE ASYNC VERSION RECEIVES A CALLBACK AS ITS LAST ARGUMENT
// THAT TAKES AN 'err' OBJECT AS ITS ARGUMENT
fs.rename('./lib/notes.md', './notes.md', function(err){
    if (err) {
        console.log(err);
    } else {
        console.log("Notes.md moved successfully");
    }
});
