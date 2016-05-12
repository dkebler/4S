'use strict';

// Put simple "helper" functions here for DRY and to keep code clean.
// use e.g.
// var stoc =require(config.dir.lib + '/helpers').toconsole;

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
  view: function(obj, objPath, options) {
    // console.log('passed key', key);
    // if (!key) {
    //   prop = obj
    // } else {
    //   prop = obj[key]
    // }
    // if (!prop) {return undefined}
    // console.log('property of obj', get(obj,path));
    //   else {
    console.log(pretty(get(obj,objPath),'5','',false));
    //     return;}
  },
  promise: {
    // series: function(tasks) {
    //   finalTaskPromise = tasks.reduce(function(prevTaskPromise, task) {
    //     return prevTaskPromise.then(task);
    //   }, resolvedPromise); // initial value
    //   return finalTaskPromise;
    // },
    // parallel: function(tasks) {
    //   var results = [];
    //   taskPromises = tasks.map(function(task) {
    //     return task();
    //   });
    //   return when.all(taskPromises);
    // }
  }

}

let pretty = require('js-object-pretty-print').pretty;
// let pretty = require('prettyjson').render;
