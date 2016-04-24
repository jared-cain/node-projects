var Readable = require('stream').Readable;
var Writable = require('stream').Writable;

var rs = new Readable();

var ws = new Writable({ decodeStrings: false });

ws._write = function(chunk, enc, next){
    process.stdout.write(chunk.toString());
    next();
};

// // push chunks to readable stream

// rs.push('beep ');

// // chunks pushed to the readable stream are buffered
// // until a consumer is ready to read them

// rs.push('boop \n');


// // 'null' lets consumer know rs is done outputting data

// rs.push(null);


// //pipe readable stream to process.stdout

// rs.pipe(process.stdout);

var c = 97;

// we can push chunks on demand by defining a '._read' function
rs._read = function() {
    if (c > 'z'.charCodeAt(0)){
        rs.push(null)
    } else {
        setTimeout(function(){
            rs.push(String.fromCharCode(c++));
        }, 100);
    };

};

rs.pipe(ws);

process.on('exit', function(chunk){
    console.log('\n_read() was called ' + (c - 97) + ' times');
});
