//******* Debugging  ***************

// require this file as a global in your app to enable debugging app wide.

// Use environment variable DEBUG (see "run dbx" scripts in npm package.json
// Also these can turn on/off debugging from code.
// .disable(debugx) or .enable('debugx');

// https://github.com/visionmedia/debug
let db = require('debug');

// Add function(s) to module.exports to view objects pretty or as tables for use in debugging
let dbTable = require('easy-table')
// let pretty = require('js-object-pretty-print').pretty;  // alternate pretty module
let dbPretty = require('prettyjson').render; // alternate pretty module

let self = module.exports = {
  // set up with debugging levels, 1,2,3.  If you don't like my choices well then change them or add to them.
  L1: db('debug:1'), // use in place of console.log for debugging
  L2: db('debug:2'), // use for more detail
  L3: db('debug:3'), // use this level for displaying messy stuff (like a whole large object) you only need to see if you are having major troubles.
  db: db, // attach a copy of debug module for later use (enable, disable...etc)
  table: function(obj) {
    // TODO process options here
    return dbTable(obj);
  },
  pretty: function(obj) {
    // TODO process options here
    return dbPretty(obj);
  }
}

//uncomment to run test examples
// let test_text ='this is a test, see debug.js file';
// self.L1('debug level 1:',test_text);
// self.L2('debug level 2:',test_text);
// self.L3('debug level 3:',test_text);
