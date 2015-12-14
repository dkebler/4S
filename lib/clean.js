const del = require('del');

module.exports = function () {
	const dir = Config.buildDirectory + Config.buildSubdirectory[Config.buildType];
	debug('cleaning', Config.buildType, dir);
//  del is now promise function so returning a promise
    return del([dir + '/**']).then(paths => {
    debug2 ('Deleted files and folders:\n', paths.join('\n'));
    info ('Deleted folder : ' + dir);
	})
}
