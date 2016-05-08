// CONFIG module
let Promise = require('promise');

// allows single place to change module used for reading multiple config file types
let readConfigFile = require('config').util.parseFile; // TODO switch to  https://github.com/snowyu/load-config-file.js, as it supports promises

// used for require-all but could be modified for different "readLibs" function below
let readLibsOptions = {
  filter: /(.*)\.js$/,  // only .js files
  recursive: false  // do not look in subdirectories - allows lib subdirectoies to be used for inactive or temp storage
};

module.exports = {
  // loads any config type to object hash, cson,yaml,json....
  load: function(filePath, callback) {
    return new Promise(function(resolve, reject) {
      let object = readConfigFile(filePath);
      if (object instanceof Error) {
        console.log('problem loading configuration file: ', filePath);
        reject(object.stack);
      } else {
        resolve(object);
      }
    });
    done.nodeify(callback);
  },
  loadLibs: function(dirPath, options, callback) {
    return new Promise(function(resolve, reject) {
      let object = readLibs(dirPath,options);
      if (object instanceof Error) {
        reject(object.stack);
      } else {
        resolve(object);
      }
    });
    done.nodeify(callback);
  },
  edit: {},
  write: {},
  view: {}
}



let requireall = require('require-all'); // TODO this is all fs sync so might want to do more than wrap i.e. redo to async/promise.
// This abstracts the require-all library so can be replaced later with something async/promise
function readLibs(dirname, options, callback) {
  readLibsOptions.dirname = dirname;
  return requireall(readLibsOptions)
}
