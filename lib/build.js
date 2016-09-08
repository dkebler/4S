'use strict';

// Development or Distribution Build Sequence

module.exports = function(data) {
  Debug.L1('in build function');

  let tasks = [data.lib.clean,[data.lib.htmls,data.lib.styles.process]];

  return data.lib.util.tasker(tasks, data)
    .then(res => Debug.L1('done with build: ' + data.build.type))
    .catch(function(e) {
      console.log('error: ', e)
    })
}
