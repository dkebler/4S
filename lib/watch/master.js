'use strict';

let chokidar = require('chokidar');

module.exports = function(data) {
  Debug.L1('in watch function');

  //  new Promise(function (resolve, reject) {

    // resolve("styles watched");
  let styles_watcher = chokidar.watch(data.dir.styles + '**');
    styles_watcher.on('all', data.lib.util.view);
//  })

}
