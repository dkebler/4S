'use strict';

// Put simple utility and helper functions here for DRY and to keep code clean.

// different pretty repos for printing objects to console, none are great
// TODO fork a pretty repo and modify to improve readability
// let pretty = require('js-object-pretty-print').pretty;
// let pretty = require('prettyjson').render;
// let pretty = require('pretty-print');
// let pretty = require('node-stringify');
let pretty = require('stringify-object');

let get = require('get-object'),
    del = require('del'),
    sequence = require('when/sequence'),
    parallel = require('when/parallel'),
    watcher = require('chokidar');


let self = module.exports = {

    // sends a file stream to the console.  Good for debugging file streams
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
    fstreamError: function(err) {
        console.log(err.toString());
        this.emit('end');
    },
    // Pretty Print an Object to the Console
    view: function(obj, options) {
        // TODO accept options for use in pretty
        if (!self.isEmpty(obj)) {
            console.log(pretty(obj, {
                indent: '   '
            }));
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
        console.log("need to fork/write a better pretty util function");
    },
    // Run an array of "tasks" in sequence as promises, embedded array will be treated as running in parallel
    tasker: function(tasks, data) {

        return sequence(
            tasks.map(function(item) {
                if (Array.isArray(item)) {
                    return data => parallel(item, data)
                } else {
                    return item
                }
            }), data)
    },
    // use for promise debugging etc
    delay: function(time) {
        return new Promise(function(fulfill) {
            setTimeout(fulfill, time);
        });
    },
    watch: function (event, glob, cb, data) {

    Debug.L1('watching: ' + glob )

    let changed = function (cb, data, path) {
      console.log('File', path, 'has been changed');
      cb(data);
    }.bind(this,cb,data);

    return watcher.watch(glob).on('change', changed);
  },
}
