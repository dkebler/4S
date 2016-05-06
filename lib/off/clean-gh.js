'use strict';

const del = require('del');

module.exports = function() {

  const dir = './node_modules/gh-pages/.cache'

  Debug('cleaning', dir);

  //  del is now promise function so returning a promise
  return del([dir + '/**'])
	.then(paths => {
    Debug2('Deleted files and folders:\n', paths.join('\n'));
    Info('Deleted folder : ' + paths[0]);
    })
	.catch(e => console.log('error:', e))

}
