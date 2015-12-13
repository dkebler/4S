var Promise = require('any-promise');

//var clean = require('./clean');

module.exports = new Promise(function(resolve, reject) {
  // do a thing, possibly async, then…
  debug('in build function');
  require('./clean').then(function(result) {info(result)})
// sequence of the rest.
  .then(resolve("Build Complete!"));
  // reject(Error("It broke"));

})
