var spawn = require("child_process").spawn;

//CREATE A VAR FOR THE CHILD PROCESS THAT WILL BE RETURNED BY
//SPAWN FUNCTION
//THE FIRST ARGUMENT IS THE COMMAND WE WANT TO RUN IN THE
//TERMINAL
//THE SECOND ARGUMENT IS AN ARRAY THAT INCLUDES ALL O THE THINGS
//WE WANT TO RUN AFTER THE NODE COMMAND
var cp = spawn("node", ["lib/alwaysTalking"]);

//WITH THE CHILD PROCESS INSTANCE WE CAN LISTEN FOR'data'
//EVENTS ON THE 'stdout' PROCESS
cp.stdout.on('data', function(data){
    console.log(`STDOUT: ${data.toString()}`);
})


//ANOTHER THING WE CAN DO WITH CHILD PROCESSES IS LISTEN
//FOR WHEN THEY 'close'
cp.on('close', function(){
    console.log("Child Process has ended.");

    //END THE CHILD PROCESS, THIS PROCESS

})


//WE CAN ALSO SEND DATA TO THIS CHILD PROCESS BY USING
//THE CHILD PROCESS'S 'stdin' OBJECT

setTimeout(function() {
    cp.stdin.write("stop");
}, 4000)
