'use strict';

// require the module as normal
var bs = require("browser-sync").create();

module.exports = function(data) {
  Debug.L1('in browser sync function');
  return new Promise(function(resolve, reject) {
    let config = {
      port: data.build.port,
      server: {
        baseDir: data.dir[data.build.type]
      },
      files: [data.dir[data.build.type] + '**']
    };
  Debug.L2('browser sync config', config);
    bs.init(config, resolve("browser now syncing " +  data.dir[data.build.type] + " on port:" + data.build.port));
  })
}
