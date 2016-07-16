'use strict';

// Development or Distribution Build Sequence

// Set a sequence of functions to run in an array
// TODO combine promise sequence with .all (waterfall) so that e.g. sass and html can run in parallel
// buildSq = [clean, Promise.all([style, html, fonts, images, scripts]);

module.exports = function(data) {
  Debug.L1('in build function');

  return data.lib.clean(data)
    .then(Promise.all([
      data.lib.html.master(data),data.lib.style.master(data)
    ]))
}
