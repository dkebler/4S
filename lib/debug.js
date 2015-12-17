//******* Debugging  ***************
// https://github.com/visionmedia/debug

process.env.DEBUG_DIFF = 0;  // turn off millisecond diff (not working in current version of debug)

var db = require('debug');
// TODO add in ability to print objects as tables
// var Table = require('easy-table')

// comment an enable to disable that output.
db.enable('Debug');
// db.enable('Debug2');
db.enable('Info');
// ********************

Debug = db('Debug');  //  use in place of console.log for debugging
Debug2 = db('Debug2'); // use for more verbose stuff like stdout from a commandline
Info = db('Info'); // use for user information

/*//uncomment to run examples
var text ='this is a test';
Debug(text);
Debug2(text);
Info(text);*/
