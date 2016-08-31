'use strict';

let watcher = require('chokidar');

module.exports = function(data) {
  Debug.L1('in watch function');
 data.lib.style.sass.watch(data);


}
