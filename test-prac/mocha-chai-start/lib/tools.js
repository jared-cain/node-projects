module.exports = {

    // NOTICE HOW WE DEFINE THIS 'printName()' FUNCTION INSIDE
    // OF THIS OBJECT LITERAL...
    // THESE ARE CALLED "OBJECT LITERAL ENHANCEMENTS" , AND
    // THEY ARE A NEW WAY OF DEFINING FUNCTIONS WITHIN AN
    // OBJECT LITERAL THAT IS AVAILABLE TO US WITH ES6
    // SINCE WE ARE USING NODE V +4.1, WE CAN USE SOME ES6
    // SYNTAX.
    printName(person){
        return `${person.last}, ${person.first}`;
    }

}
