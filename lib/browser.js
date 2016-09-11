'use strict';

// require the module as normal
const bs = require("browser-sync").create(),
      url = require('url');

module.exports = function(data) {
  Debug.L1('in browser sync function');
  return new Promise(function(resolve, reject) {
    let config = {
      port: url.parse(data.build.url).port,
      browser: data.browser,
      server: {
        baseDir: data.dir[data.build.type]
      },
      files: [data.dir[data.build.type] + '**']
    };
  Debug.L1(data.build.url, 'browser sync config', config);
    bs.init(config, resolve("browser now syncing " +  data.dir[data.build.type] + " at:" + data.build.url));
  })
}
