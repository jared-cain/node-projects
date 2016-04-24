var fs = require('fs');

var stream = fs.createReadStream('./lib/chat.log', "UTF-8");

// BEFORE WE HAVE BEEN USING 'fs.readFile()' TO READ DATA FILES
// HOWEVER THIS IS SLOW AND CUMBERSOME ON OUR APP, A BETTER WAY
// WOULD BE TO IMPLEMENT STREAMS

// fs.readFile('./lib/chat.log', 'UTF-8', function (err, chatlog) {
//     console.log(`File Read ${chatlog.length}`);
// })


var data = "";

// NOW, AS OPPOSED TO WAITING FOR THE ENTIRE FILE TO BE READ
// WE CAN USE THIS STREAM TO START RECEIVING SMALL CHUNKS OF
// DATA FROM THIS FILE


// WE CAN ALSO SET AN EVENT LISTENER ON OUR STREAM FOR THE
// 'data' EVENT
stream.once('data', function () {
    console.log("\n\n\n");
    console.log("Started reading file....");
    console.log("\n\n\n");
});



// NOW WE CAN LISTEN FOR 'data' EVENTS ON OUR STREAM
// WHEN A 'data' EVENT IS RAISED, IT DOES NOT MEAN WE HAVE THE
// ENTIRE FILE BUT RATHER A SMALL CHUNK OF THAT FILE
stream.on('data', function (chunk) {

    process.stdout.write(`chunk: ${chunk.length} |`);

    data += chunk;

});



// THE LAST THING WE WANT TO DO IS WIRE UP A LISTENER FOR WHEN
// THIS STREAM IS FINISHED 'end' EVENT
stream.on('end', function(err){
    console.log("\n\n\n");
    console.log(`Finshed Reading File ${data.length}`);
    console.log("\n\n\n");
});
