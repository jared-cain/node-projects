//WE CAN REQUIRE CUSTOM MODULES RELATIVELY
var Person = require('./lib/Person');

//CREATE A NEW PERSON
var ben = new Person("Ben Franklin");
var george = new Person("George Washington");

//SINCE BEN IS AN INSTANCE OF PERSON WE CAN USE '.on()' TO LISTEN FOR CUSTOM EVENTS; ASYNC VERY IMPORTANT!!
ben.on('speak', function(said){

    console.log(`${this.name}: ${said}`);

});

//BEN ALSO HAS ACCESS TO THE '.emit()' METHOD FOR OUR CUSTOM EVENTS
ben.emit('speak', "You may delay, but time will not.");


george.on('speak', function (said) {
    console.log(`${this.name} -> ${said}`);
});


george.emit('speak', "It is far better to be alone, than to be in bad company");
