
var WebSocketServer = require('ws').Server;

var wss = new WebSocketServer(  { port: 3000 } );


wss.on("connection", function (ws) {

    // WE CAN ADD LISTENERS TO 'ws' SOCKET HERE
    // WE WANT TO LISTEN FOR ANY "MESSAGE"S FROM THE BROWSER
    // TO THIS SOCKET SERVER.
    // RECEIVES A CALLBACK FUNCTION THAT RECEIVES THE MESSAGE
    // PASSED FROM THE BROWSER AS AN ARGUMENT.
    ws.on("message", function (message) {

        if (message === 'exit') {
            //  WE CAN CLOSE THE CLIENT SOCKET CONNECTION
            // WHILE LEAVING THE SERVER SOCKET OPEN.
            ws.close();
        } else {
            // BROADCAST TO ALL CLIENTS
            // ".clients()" IS AN ARRAY OF ALL CONNECTED
            // CLIENTS TO THE SOCKET SERVER. SINCE CLIENTS
            // IS AN ARRAY, WE CAN "forEach()" IT
            wss.clients.forEach(function (client) {
                // SEND MESSAGE TO GIVEN CLIENT SOCKET
                // EXACTLY LIKE ".send()" FURTHER BELOW
                client.send(message);
            })
        }

    })

    ws.send("Welcome to the Chat Cat");

});

console.log("WSS Started on port 3000");
