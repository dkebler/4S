var runSequence = require('run-sequence');

module.exports = function (config,cb) {
debug('in build function');
debug2(config);
runSequence('clean',['sass',config.htmlGenerator],cb);
}	


/*runSequence('clean',['sass',config.htmlGenerator],function(err) {
	if (err) { console.log('error', err); return;}
	info('build successful start deployment');
	cb(next);*/