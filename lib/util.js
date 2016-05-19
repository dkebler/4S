'use strict';

// Put simple "helper" functions here for DRY and to keep code clean.
// use e.g.
// var stoc =require(config.dir.lib + '/helpers').toconsole;

let pretty = require('js-object-pretty-print').pretty;
// let pretty = require('prettyjson').render;
let get = require('get-object');

module.exports = {

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
  // Print
  view: function(obj, options) {
    console.log(pretty(obj,'5','',false));
  },
  getSubObj: function(obj, objPath) {
    return get(obj,objPath);
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
}
