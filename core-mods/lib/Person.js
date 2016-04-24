//WE CAN PULL EventEmitter DIRECTLY OUT OF REQUIRE
var EventEmitter = require('events').EventEmitter;
var util = require('util');


//CREATE INSTANCE OF A PERSON THATS AN OBJECT THAT RECEIVES A NAME PROPERTY
var Person = function (name) {
    this.name = name;
};


//'util.inherits' ALLLOWS US TO ADD AN OBJECT TO THE PROTOTYPE OF ANOTHER OBJECT, THATS HOW JS HANDLES INHERITANCE

//'Person' OBJECT WILL INHERIT 'EventEmitter'
//'Person.prototype' WILL NOW HAVE ALL OF THE FUNCTIONALITY OF 'EventEmitter'

util.inherits(Person, EventEmitter);

//TO MAKE 'Person.js' MODULE AVAILABLE TO OTHER MODULES, WE MUST
//ADD THEM TO 'module.exports'
//'module.exports' IS A JAVASCRIPT OBJECT
module.exports = Person;
