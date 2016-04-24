var waitTime = 3000;
var currentTime = 0;
var waitInterval = 100;
var percentWaited = 0;

function writeWaitingPercent(p){
    // 'process.stdout.clearLine()' WILL CLEAR THE CURRENT LINE ON THE TERMINAL
    process.stdout.clearLine();
    //'process.stdout.cursorTo()' WILL MOVE OUR CURSOR TO WHERE WE WANT IT IN THE CURRENT LINE
    process.stdout.cursorTo(0);

    process.stdout.write(`Waiting...${p}%`)
}

//'setInterval' MUST BE SET TO VARIABLE IN ORDER TO BE RAN BY 'clearInterval'
var interval = setInterval(function(){
    currentTime += waitInterval;
    percentWaited = Math.floor((currentTime/waitTime) * 100);
    writeWaitingPercent(percentWaited);
}, waitInterval);

//TIME IS IN MILLISECONDS
setTimeout(function(){
    clearInterval(interval);
    writeWaitingPercent(100);
    process.stdout.write('\n\n\n');
    console.log("done");
}, waitTime);

process.stdout.write('\n\n\n');
writeWaitingPercent(percentWaited);
