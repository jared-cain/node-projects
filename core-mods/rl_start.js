var readline = require('readline');
var fs = require('fs');
//CREATES INSTANCE OF READLINE OBJECT THAT TAKES CONTROL OF 'process.stdin' AND 'process.stdout' OBJECTS VIA PASSING IN AN OBJECT OF OPTIONS
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var realPerson = {
    name: '',
    sayings: []
};


//TO ASK A QUESTION IN READLINE ALL YOU HAVE TO DO IS ASK A QUESTION
//THE CALLBACK FUNCTION WILL BE INVOKED AFTER AN ANSWER IS PROVIDED AND THE ANSWER WILL BE PASSED AS AN ARGUMENT
rl.question("What is the name of a real person?", function(answer){

    // ADD THE ANSWER TO THE REALPERSON OBJECT
    realPerson.name = answer;

    fs.writeFileSync("./lib/" + realPerson.name + ".md", `${realPerson.name}\n=============\n\n`)

    //SET THE PROMPT FOR THE NEXT QUESTION
    rl.setPrompt(`What would ${realPerson.name} say?`);

    //DISPLAY THE PROMPT TO THE TERMINAL
    rl.prompt();

    //CREATE 'line' EVENT LISTENER TO LISTEN FOR RESPONSE FROM THE TERMINAL
    //AND SAVE IT TO 'saying' VARIABLE IN THE CALLBACK FUNCTION
    rl.on('line', function(saying){


        //IF THE TERMINAL RETURNS THE STRING 'exit' IN 'saying'
        if (saying.toLowerCase().trim() === 'exit') {

            //CLOSE THE READLINE INSTANCE
            rl.close();
        } else {
            //ELSE APPEND THE 'saying' VARIABLE TO REALPERSONS SAYINGS
            realPerson.sayings.push(saying.trim());


            fs.appendFile("./lib/" + realPerson.name + ".md", `* ${saying} \n`);


            //SET THE PROMPT FOR THE NEXT QUESTION
            rl.setPrompt(`What else would ${realPerson.name} say? ('exit')`);
            //DISPLY PROMPT TO THE USER
            rl.prompt();
        };


    });

});

//LISTEN FOR CLOSE EVENT ON READLINE INSTANCE
rl.on('close', function(){

    //YOU CAN USE '%s' AS A QUERY STRING THAT MATCHES THE SECOND ARGUMENT
    //'%j' ALLOWS YOU TO INSERT A JSON OBJECT
    console.log("%s is a real person that says %j", realPerson.name, realPerson.sayings);

});
