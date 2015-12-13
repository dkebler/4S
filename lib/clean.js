const del = require('del');

module.exports= function () {
	var dir = Config.buildDirectory + Config.buildSubdirectory[Config.buildType];
	debug('cleaning', Config.buildType, dir);
//  del is now promise function
    return del([dir + '/**']).then(paths => {
    debug ('Deleted files and folders:\n', paths.join('\n'));
    info ('Deleted folder : ' + dir);
    })
}();
