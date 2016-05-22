// Configuration
module.exports = {
  // loads any config type to object hash, cson,yaml,json....
  load: function(filePath) {
    return new Promise(function(resolve, reject) {
      let object = readConfigFile(filePath);
      if (object instanceof Error) {
        console.log('ERROR: Problem loading configuration file: ', filePath);
        reject(object.stack);
      } else {
        resolve(object);
        return object;
      }
    });
  },
  loadLibs: function(dirPath, options) {
    return new Promise(function(resolve, reject) {
      let object = readLibs(dirPath, options);
      if (object instanceof Error) {
        reject(object.stack);
      } else {
        resolve(object);
      }
    });
  },
  edit: {},
  write: {},
  view: {}
}


// allows single place to change module used for reading multiple config file types
let readConfigFile = require('config').util.parseFile; // TODO switch to  https://github.com/snowyu/load-config-file.js, as it supports promises



// Read library directory
// used for require-all but could be modified for different "readLibs" function below
let readLibsOptions = {
  filter: /(.*)\.js$/, // only .js files
  excludeDirs :  /^(off)$/,  // put code you don't currently want in the library in the /off subdirectory
  recursive: true // loads everyting except what is excluded above
};
let requireall = require('require-all'); // TODO this is all fs sync so might want to do more than wrap i.e. redo to async/promise.
// This abstracts the require-all library so can be replaced later with something async/promise
function readLibs(dirname, options, callback) {
  readLibsOptions.dirname = dirname;
  return requireall(readLibsOptions)
}
