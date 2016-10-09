'use strict';

let browserify = require('browserify'),
  // for stream
    fstream = require('vinyl-fs'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    globby = require('globby'),
    through = require('through2'),
    // for processing
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    // for finding files to process
    blibs  = require('bower-files')(),
    mainNpmFiles = require('npm-main-files'),
    mainBowerFiles = require('main-bower-files');

let self = module.exports = {

        process: function(data) {

            Debug.L1('in scripts function');

            let tasks = [self.browserify, self.bowerDeps, self.npmDeps];

            Debug.L2('tasks: ' + tasks);

            return data.lib.util.tasker(tasks, data)
                .then(res => Debug.L1('done with scripting tasks'))
                .catch(function(e) {
                    console.log('error: ', e)
                });


        }, // end process

        //  bundle application code for use in browser found in the data.dir.scipts folder
        browserify: function(data) {

            return new Promise(function(resolve, reject) {

                let bundledStream = through();

                // this will process the stream piped from browserify
                bundledStream
                    .pipe(source('app.js')) // this will end up being the output name the source is actually coming from browserify
                    // here we're copying from the Browserify + Uglify2 recipe.
                    .pipe(buffer())
                    //          .pipe(sourcemaps.init({
                    //                loadMaps: true
                    //            }))
                    // Add gulp plugins to the pipeline here.
                    //            .pipe(uglify())
                    //            .on('error', console.log('uglify error'))
                    //            .pipe(sourcemaps.write('./'))
                    .pipe(fstream.dest(data.repoPath + data.dir[data.build.type] + 'assets/'));

                // Browserify creates it's own readable stream.
                let scriptsglob = data.repoPath + data.dir.scripts + '*.js'
                Debug.L1('scriptsglob ', scriptsglob);

                globby([scriptsglob]).then(function(entries) {
                    // create the Browserify instance.
                    Debug.L1('entries for browserify: ', entries);
                    var b = browserify({
                        entries: entries,
                        debug: true, // turn off debug for production
                        //                      transform: [xxxx]  // browserify transforms go here if needed
                    });

                    // pipe the  Browserify stream to a through2 stream
                    b.bundle().pipe(bundledStream);
                }).catch(function(err) {
                    // ensure any errors from globby are handled
                    bundledStream.emit('error', err);
                });

                // resolve the promise returning the stream
                resolve(bundledStream);

            }); //end browserify promise

        }, // end browserify function

        bowerDeps: function(data) {
            return new Promise(function(resolve, reject) {
              // on dist change to min.js
              let jsGlob = '**/*.js'
              let src = mainBowerFiles(jsGlob);
              if (src.length > 0) {
              fstream.src(src)
                      .pipe(concat('bowerDeps.js'))
              //      .pipe(uglify())
                      .pipe(fstream.dest(data.repoPath + data.dir[data.build.type] + 'assets/'))
                      .on('end', resolve); //end of stream
             }
              else {
                Debug.L1('no js bower files to reference', src);
                resolve('no bower files')}

              }) //end promise
        },
        npmDeps: function(data) {
            return new Promise(function(resolve, reject) {
                    Debug.L1('mainnpmfiles:', mainNpmFiles('**/*.js'))
                    resolve('npmDeps');
                }) // end promise
        }
    } // end module
