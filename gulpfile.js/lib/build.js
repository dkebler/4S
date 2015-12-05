var runSequence = require('run-sequence');

module.exports = function (config,cb) {
debug('in build function');
debug2(config);
runSequence('clean',['sass',config.htmlGenerator],cb);
}	


