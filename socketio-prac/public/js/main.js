// CREATE NEW SOCKET INSTANCE USING SOCKET.IO-CLIENTS "io()"
// FUNCTION. INSTEAD OF SENDING IT A WEBSOCKET, WE WILL SEND
// IT A LINK TO WHERE SOCKET.IO IS RUNNING
// SOCKET.IO IS RUNNING WITH OUR EXPRESS APP, ON OUR HTTP
// SERVER, HOSTED AT LOCALHOST:3000 .
// SO, WHEN WE CREATE A SOCKET, WE'RE PUTTING IN HTTP://
// SERVER AS OPPOSED TO WS://
var socket = io("http://localhost:3000");

// WHEN WE DISCONNECT, WE WILL USE THIS SOCKET TO LISTEN
// FOR A "DISCONNECT" EVENT. WHEN DISCONNECT EVENT OCCURS
// A CALLBACK FUNCTION WILL BE INVOKED.
socket.on("disconnect", function() {
	setTitle("Disconnected");
});

// WHEN THERE IS A NEW CONNECTION, THE "CONNECT" EVENT FIRES
socket.on("connect", function() {
	setTitle("Connected to Chat Cat");
});


// NOW WHEN THE MESSAGE EVENT OCCURS, I.E THE "MESSAGE" EVENT
// WE EMITTED FROM THE SERVER, THIS CALLBACK FUNCTION WILL
// BE FIRED WHICH RECEIVES THE MESSAGE AS ITS ARGUMENT
socket.on("message", function(message) {
	printMessage(message);
});

document.forms[0].onsubmit = function () {
    var input = document.getElementById("message");
    printMessage(input.value);

	// LAST THING TO DO, WHEN USER SUBMITS THE FORM,
	// WE NEED TO SEND A "CHAT" EVENT BACK TO THE SERVER
	// USE THE SOCKET TO EMIT A "CHAT" EVENT BACK TO SERVER
	// WHICH TAKES THE MESSAGE THE USER ADDED TO INPUT FIELD
    socket.emit("chat", input.value);
    input.value = '';
};

function setTitle(title) {
    document.querySelector("h1").innerHTML = title;
}

function printMessage(message) {
    var p = document.createElement("p");
    p.innerText = message;
    document.querySelector("div.messages").appendChild(p);
}
