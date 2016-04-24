var events = require('events');;

//THE 'EventEmitter' IS A CONSTRUCTOR AND WILL CREATE A NEW INSTANCE OF THE EVENT EMITTER
var emitter = new events.EventEmitter();

//THE EMITTER WE JUST CREATED HAS A '.on' AN EMIT
//WE CAN WIRE UP CUSTOM EVENTS THIS WAY
emitter.on("customEvent", function(message, status){

    console.log(`${status}: ${message}`);

});

//THE NEXT ABILITY IS TO BE ABLE TO TRIGGER OR '.emit' OUR CUSTOM EVENTS
emitter.emit('customEvent', "hello World", 200);
