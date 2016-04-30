//******* Debugging  ***************
// https://github.com/visionmedia/debug
// This is gets fed into the global.js file.
process.env.DEBUG_DIFF = 0;  // turn off millisecond diff (not working in current version of debug)

var db = require('debug');
// TODO add in ability to print objects as tables for use in debugging
// var Table = require('easy-table')

// change this to enable/disable based on env variable debug level,   DEBUG
// comment to disable that output.
// db.enable('Info');
// db.enable('Debug');
// db.enable('Debug2');
// db.enable('Debug3');


// ********************

//  These will be global functions, take note of the leading capitial.
Debug = db('Debug');  //  use in place of console.log for debugging
Debug2 = db('Debug2'); // use for more verbose stuff like stdout from a commandline
Info = db('Info'); // use for user information

/*//uncomment to run examples
var text ='this is a test';
Debug(text);
Debug2(text);
Info(text);*/
