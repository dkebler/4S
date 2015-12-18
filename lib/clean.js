'use strict';

const del = require('del');

module.exports = function () {

	const dir = Config.buildDirectory + Config.buildSubdirectory[Config.buildType];

	Debug('cleaning', Config.buildType, dir);

//  del is now promise function so returning a promise
    return del([dir + '/**']).then(paths => {

		Debug2('Deleted files and folders:\n', paths.join('\n'));
		Debug('Deleted folder : ' + dir);

	})
}
