// CONFIG module
let Promise = require('promise');

// allows single place to change module used for reading multiple config file types
let read = require('config').util.parseFile; // TODO switch to  https://github.com/snowyu/load-config-file.js, as it supports promises

module.exports = {
  // loads any config type to object hash
  load: function(filePath, callback) {
    return new Promise(function(resolve, reject) {
      let object = read(filePath);
      if (object instanceof Error) {
        reject(object.stack);
      } else {
        resolve(object);
      }
    });
    done.nodeify(callback);
  },
  edit: {},
  write:{},
  view:{}
}
