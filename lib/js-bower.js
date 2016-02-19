//  Browserify (or webpack) to combine local js code for browser
//  Wiredep to wire in bower js libraries directly (could be replaced with corresponding cdns in production)

'use strict';

var cwiredep      = require('.' + Config.configDirectory + 'wiredep');  // wiredep used to get the paths, so check config/wiredep.js

module.exports = (function() {

// add access to dev dependencies since that's what the scss/sass libs are.
cwiredep.devDependencies = 'true';
// location of template partial
cwiredep.src = './html/hugo/layouts/partials/body/javascripts.html';  //TODO get this from a config file

// Let wiredep insert all js main files
Debug2(require('wiredep')(cwiredep));
Info(cwiredep);

}());  // immediately run function on require
