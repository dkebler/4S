
// Development or Distribution Build Sequence
// Differences in Build Handled in each module

var html = require('./'+ Config.htmlGenerator);
var sass = require('./sass');
var clean = require('./clean');

var sequence = new require('promise-sequence');

module.exports = new Promise(function(resolve, reject) {
  // do a thing, possibly async, then…
  debug('in build function');

  return sequence([clean,sass,html]).then(resolve("Build Complete!"))

})
