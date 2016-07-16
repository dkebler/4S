'use strict';

let del = require('del');

module.exports = function (data) {

let dir = data.dir[data.build.type];

Debug.L1('dir to clean:',dir);

//  del is now promise function so returning a promise
    return del([dir + '/**']).then(paths => {
		Debug.L2('Deleted files and folders:\n', paths.join('\n'));
  	Debug.L1('Deleted folder : ', paths[0]);
	})
}
