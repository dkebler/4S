// Globals
// yea Globals are evil but this is just a simple stand alone command line invoked utility, no harm in a few.
// I use a captial at the start of each objec/function if it is to be global.  start all locals with lowercase.

// set global master config file path in package.json or use default  config/index.js
Configfilepath = require('../package').configfilepath || '../config/';
// Have the main config file be global
var ds = require('dot-slash').enforce;
Config = require(ds(Configfilepath));

// uncomment a promise library if you want something other than the now built in.
// and be SURE to use "new" with every promise your create.

// Promise = require('any-promise');
// Promise = require("es6-promise").Promise
// Promise = require('q');
// Promise = require('bluebird');

require('./debug'); // see debug.js in library to turn on/off/customize debugging
