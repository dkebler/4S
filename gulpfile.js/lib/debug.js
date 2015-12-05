//******* Debugging  ***************
// https://github.com/visionmedia/debug

process.env.DEBUG_DIFF = 0;  // turn off millisecond diff

var db = require('debug');

// comment an enable to disable that output.
// db.enable('debug');
// db.enable('debug2');
db.enable('info');
// ********************

debug = db('debug');  //  use in place of console.log for debugging
debug2 = db('debug2');  // use for more verbose stuff like stdout from a commandline
info = db('info'); // use for user information

/*//uncomment to run examples
var text ='this is a test';
debug(text);
debug2(text);
info(text);*/

