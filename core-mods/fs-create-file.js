var fs =  require("fs");

var md = `

Sample Markdown Title
=====================

Sample subtitle
---------------

* point
* point
* point

`;

// ASYNCHRONOUS CALL TO '.writeFile' . THE FIRST ARG IS THE FILE
// WHICH YOU WANT TO WRITE TO. THE SECOND ARG REPRESENTS THE
// CONTENT WE WANT TO WRITE TO THAT FILE. THE THIRD ARG IS THE
// CALLBACK FUNCTION; THIS FUNCTION WILL FIRE ONCE WE HAVE
// CREATED THE FILE, AND GETS PASSED AN 'err' OBJECT AS ARG
fs.writeFile("sample.md", md.trim(), function (err) {
    console.log("File Created....");
});


// ****************************************************************
// fs.writeFile() AND .appendFile() ARE APPLIED IN 'rl_start.js'!!!
// ****************************************************************
