// WE CAN COMMUNICATE WITH RUNNING PROCESSES WITH
// 'process.stdin' AND 'process.stdout'

process.stdout.write("Hello ");

process.stdout.write("World \n\n\n");

//THE '.write()' METHOD WRITES DATA TO THE 'process.stdout' OBJECTS


var questions = [
    "What is your name",
    "What is your fav hobby",
    "What is your preferred programming language"
];

var answers = [];

function ask(index){

    process.stdout.write(`\n\n\n\n ${questions[index]}`);
    process.stdout.write("  >  ");
};


//THIS EVENT LISTENER IS ASYNC, IT WILL REACH THIS POINT AND HANG
//LISTENING FOR ANY DATA TO COME IN THE 'process.stdin' OBJECT
//AFTER USER PRESSES ENTER, THE CALLBACK FUNCTION IS RAN WITH THE
//'data' PASSED AS AN ARGUMENT
process.stdin.on('data', function(data){
    answers.push(data.toString().trim());

    if(answers.length < questions.length){
        ask(answers.length);
    } else {
        process.exit();
    }

});


//LISTEN FOR AN 'exit' EVENT ON THE 'process' OBJECT
//NOTICE THAT THIS CALLBACK FUNCTION IS SYNCHRONOUS
//BY THE TIME THIS LISTENER IS CALLED, THE PROCESS IS FOR SURE
//EXITING AND THERE IS NO STOPPING THERE, THEREFORE, THIS FUNCTION
//RUNS AS IS AND DOES NOT WAIT FOR ANYTHING
//AKA PERFECT TIME FOR LISTING INFO COLLECTED OR RESULTS
process.on('exit', function(){

    process.stdout.write("\n\n\n\n");
    process.stdout.write(`Go ${answers[1]}, ${answers[0]}, you can finish writing ${answers[2]} later`);
    process.stdout.write("\n\n\n\n");

});



ask(0);
