// Development or Distribution Build Sequence
// Differences in Build Handled in each module

var html = require('./' + Config.htmlGenerator);
var sass = require('./sass');
var clean = require('./clean');

var sequence = new require('promise-sequence');

// Set a sequence of functions to run in an array
// TODO combine with .all (waterfall) so that e.g. sass and html can run in parallel
var buildSq = [clean, sass, html];

module.exports = function() {
  Debug('in build function');
  return sequence(buildSq)
}
