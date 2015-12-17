var ghconfig  = require('../config/deploy-gh');
var config = require('../config/');
var ghpages = require('gh-pages');

module.exports = function(cb) {

var deploySrc = config.buildDirectory + config.buildSubdirectory[config.buildType];
Debug('deploy-gh', config.buildType, config.url, ghconfig[ghconfig.location], deploySrc);

ghpages.publish(deploySrc, ghconfig[ghconfig.location], function(err) {
	if (err) { console.log('error', err); return;}
	Info('build successfully sent to github');
	Debug(cb);
	cb(); // have callback be a function used to open site in browser for check.
	})
}
