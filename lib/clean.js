const del = require('del');
var Promise = require('any-promise');

module.exports= new Promise(function (resolve, reject) {
	var dir = Config.buildDirectory + Config.buildSubdirectory[Config.buildType];
	debug('cleaning', Config.buildType, dir);
//  del is now promise function
    del([dir + '/**']).then(paths => {
    debug ('Deleted files and folders:\n', paths.join('\n'));
    info ('Deleted folder : ' + dir);
		resolve('clean complete')
    })
});
