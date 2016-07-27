'use strict';

// Put simple "helper" functions here for DRY and to keep code clean.

// let pretty = require('js-object-pretty-print').pretty;
// let pretty = require('prettyjson').render;
// let pretty = require('pretty-print');
// let pretty = require('node-stringify');
let pretty = require('stringify-object');
let get = require('get-object');
let del = require('del');

let sequence = require('when/sequence');
let parallel = require('when/parallel');


let self = module.exports = {

  // sends your file stream to the console.  Good for debugging file streams
  toconsole: function(chunk) {
    var contents = chunk.contents.toString().trim();
    var bufLength = process.stdout.columns;
    var hr = '\n\n' + Array(bufLength).join("_") + '\n\n'
    if (contents.length > 1) {
      process.stdout.write(chunk.path + '\n' + contents + '\n');
      process.stdout.write(chunk.path + hr);
    }
  },
  isEmpty: function(obj) {
    return Object.keys(obj).length === 0;
  },
  keyname: function(obj) {
    return Object.keys(obj)[0];
  },
  // Pretty Print an Object to the Console
  view: function(obj, options) {
    // TODO accept options for use in pretty
    if (!self.isEmpty(obj)) {
    console.log(pretty(obj,{indent:'   '}));
      Debug.L1('test: after output of util view')
    } else {
      console.log('No such (sub)object or empty')
    }
    return;
  },
  // Get a subset of an object
  getSubObj: function(obj, objPath) {
    return get(obj, objPath);
  },
  // rmrf, clean a directory (remove all files and sub-directories)
  clean: function(dir) {
    Debug.L1('cleaning', dir);
    //  del is now promise function so returning a promise
    return del([dir + '/**'])
      .then(paths => {
        Debug.L2('Deleted files and folders:\n', paths.join('\n'));
        Debug.L1('Deleted folder : ' + paths[0]);
      });
  },
  // TODO abstract a pretty module that handles simple set of options
  pretty: function() {
    console.log("need to write a pretty util function");
  },
  tasker: function(tasks, data) {

    return sequence(
      tasks.map(function(item) {
        if (Array.isArray(item)) {
          return data => parallel(item, data)
        } else {
          return item
        }
      }),data)
  }
}


// ,
// promise: {
//   series: function(tasks) {
//     finalTaskPromise = tasks.reduce(function(prevTaskPromise, task) {
//       return prevTaskPromise.then(task);
//     }, resolvedPromise); // initial value
//     return finalTaskPromise;
//   },
//   parallel: function(tasks) {
//     var results = [];
//     taskPromises = tasks.map(function(task) {
//       return task();
//     });
//     return when.all(taskPromises);
//   // }
// }
