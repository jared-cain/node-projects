// ANOTHER FUNCTION AVAILABLE TO US GLOBALLY IS 'require()'
// WHICH ALLOWS US TO IMPORT OTHER NODEJS MODULES
var path = require('path');

//PATH IS NOT GLOBAL, BUT A MODULE AVAILABLE TO US ON INSTALL



//'console' CAN ASSUME GLOBAL BY ITSELF
//BUT IT IS PART OF THE 'global' NAMESPACE
console.log("Hello World");
global.console.log("Hello World");

// WILL NOT WORK
// VARIABLES ARE SCOPED TO THEIR MODULE NAMESPACE, NOT GLOBALLY
var hello = "Hello World from Node js";
console.log(global.hello);
//return undefined



//ANYTHING THAT YOU WOULD USE IN NORMAL JS IS AVAILABLE TO YOU
//SUCH AS DEALING WITH PRIMITIVES, OBJECTS, OR ARRAYS
var justNode = hello.slice(17);

//NODE 4+ SUPPORTS SOME ES2015 SO WE CAN USE TEMPLATE STRINGS
//NOTICE THE BACKTICKS ' ` ` ' DECLARING THE TEMPLATE STRINGS
//AND THE TEMPLATE STRING VARIABLE '${justNode}'
console.log(`Rock on World from ${justNode}`);


//MANY OTHER GLOBALS ARE AVAILABLE

//__dirname WILL SHOW OUR CURRENT DIRECTORY THE FILE IS IN
console.log(__dirname);

//__filename WILL GIVE US THE FULL PATH TO THE FILE INCLUDING THE FILENAME
console.log(__filename);

//WE WILL USE THE 'path' MODULE TO PLUCK THE FILES NAME OUT OF THE FILENAME GLOBAL VARIABLE
console.log(`Keep on rocking from ${path.basename(__filename)}`);