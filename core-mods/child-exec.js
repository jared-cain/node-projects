var exec = require('child_process').exec;


//NOW WE CAN CALL EXEC AND RUN A COMMAND IN THE TERMINAL
// exec('open http://www.linkedin.com');  //MAC

//YOU CAN ALSO OPEN A TERMINAL FROM MODULE
// exec('open -a Terminal .') //MAC
// exec('cmd .') //WINDOWS


//SPIT SOME OUTPUT TO THE TERMINAL AND COLLECT IT
//AFTER 'ls' HAS EXECUTED AND RETURNED DATA, WE CAN INJECT
//THE OUTCOME INTO A CB FUNCTION, WHERE 'err' IS ANY ERROR
//ENCOUNTERED DURING EXECUTION, AND 'stdout' IS THE STDOUT DATA
//WE RECEIVED FROM THE EXECUTION
exec('ls', function(err, stdout){
    //ALWAYS GOOD TO CHECK FOR ERR FIRST
    if(err){
        throw err;
    }

    console.log("Listing Finished");

    console.log(stdout);

});

exec('git version', function (err, stdout) {
    if (err){
        throw err;
    }

    console.log("Git Version Finished")

    console.log(stdout);

})
