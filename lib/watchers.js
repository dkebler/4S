'use strict';

let watcher = require('chokidar');

module.exports = function(data) {
  Debug.L1('in watch function');

  let styles = watcher.watch(data.dir.styles + '**');
  styles.on('all', data.lib.styles);

}
