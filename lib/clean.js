'use strict';

const del = require('del');

module.exports = function (data) {

	const dir = config.dir.build + config.dir.buildSub[config.build.type];

//  del is now promise function so returning a promise
    return del([dir + '/**']).then(paths => {
//		Debug2('Deleted files and folders:\n', paths.join('\n'));
//  	Info('Deleted folder : ', paths[0]);
	})
}
