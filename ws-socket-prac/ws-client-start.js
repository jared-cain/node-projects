// WE CAN USE NATIVE JAVASCRIPT IF OUR BROWSER SUPPORTS
// WEBSOCKETS. SINCE WE'RE USING CHROME, WE DO SUPPORT WS

// CREATE WEBSOCKET INSTANCE USING THE NEW CONSTRUCTOR
// WE MUST POINT OUT WHERE OUR WEBSOCKET SERVER IS RUNNING
// WEBSOCKETS USE THEIR OWN PROTOCOL WS://
var ws = new WebSocket("ws://localhost:3000")


// NOW WE USE THE "ws" INSTANCE TO WIRE UP EVENT HANDLERS

// ON SOCKET OPEN CALL setTitle()
ws.onopen = function ( ) {
    setTitle("Connected to Chat Cat");
};

ws.onclose = function () {
    setTitle("DISCONNECTED");
};

// WHEN THE WEBSOCKET RECEIVES A "MESSAGE", FIRE FUNCTION
// THE MESSAGE WE BE A PART OF THE OBJECT THAT GETS SENT
// TO THIS FUNCTION 'payload'
ws.onmessage = function (payload) {

    // ON CONNECTING WE ACTUALLY GET SENT A "MESSAGE"
    // EVERY TIME WE GET A MESSAGE ADD IT TO THE DOM
    // VIA "payload.data"
    printMessage(payload.data);

}


document.forms[0].onsubmit = function () {
    var input = document.getElementById('message');
    input.value = '';
};

function setTitle(title) {
    document.querySelector('h1').innerHTML = title;
}

function printMessage(message) {
    var p = document.createElement('p');
    p.innerText = message;
    document.querySelector('div.messages').appendChild(p);
}
