var fs = require('fs');

// WE CAN ALSO REMOVE FILES WITH '.unlink()'
// SINCE THIS INVOCATION OF '.unlink()' IS SYNC, ANY ERRORS
// WE GET WILL CRASH THE PROGRAM. WE CAN PUT THIS STATEMENT IN
// A TRY/CATCH BLOCK TO CATCH ANY SYNC ERRORS
try {
    fs.unlinkSync("./lib/config.json");
} catch (err) {
    console.log(err)
}

// ASYNC VERSION OF '.unlinkSync()'
fs.unlink("notes.md", function (err) {
    if(err){
        console.log(err);
    } else{
        console.log("Notes.md removed");
    }
})
