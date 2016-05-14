//******* Debugging  ***************

// require this file to enable debugging for a module, etc.

// https://github.com/visionmedia/debug
let db = require('debug');

// TODO add in ability to view objects pretty or as tables for use in debugging
// let table = require('easy-table')
// let pretty = require(....pretty)

// outside of environment variable DEBUG (see scripts in npm package.json these can turn on/off debugging
// db.enable('Debug');
// db.enable('Debug2');
// db.enable('Debug3');

// ********************//

let self = module.exports = {

// set up with debugging levels, 1,2,3.  If you don't like my choices well then change them or add to them.
L1: db('debug1'), //  use in place of console.log for debugging
L2: db('debug2'), // use for more detail
L3: db('debug3'), // use this level for displaying messy stuff (like a whole large object) you only need to see if you are having major troubles.

}

//uncomment to run test examples
// let test_text ='this is a test, see debug.js file';
// self.L1('debug level 1:',test_text);
// self.L2('debug level 2:',test_text);
// self.L3('debug level 3:',test_text);
