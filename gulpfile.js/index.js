/*
  gulpfile.js
  ===========
  Rather than manage one giant configuration file responsible
  for creating multiple tasks, each task has been broken out into
  its own file in gulpfile.js/tasks. Any files in that directory get
  automatically required below.

  To add a new task, simply add a new task file that directory.
  gulpfile.js/tasks/default.js specifies the default set of tasks to run
  when you run `gulp`.
*/

// require('console.table');  // for use with displaying object contents

require('./lib/debug');  // See gulpfile.js/lib/debug.js to turn on/off/customize debugging

var requireDir = require('require-dir');
// Require all tasks in gulp/tasks, including subfolders
var tasks = requireDir('./tasks', { recurse: true });



