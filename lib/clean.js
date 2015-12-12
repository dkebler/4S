const del = require('del');
var config = require('../' + configfilepath);

module.exports= function () {
	var dir = config.buildDirectory + config.buildSubdirectory[config.buildType];
	debug('cleaning', config.buildType, dir);
//  del is now promise function
    return del([dir + '/**']).then(paths => {
    debug2 ('Deleted files and folders:\n', paths.join('\n'));
    info ('Deleted folder : ' + dir);
    })
}