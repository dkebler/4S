'use strict';

// master.js
// process all browser bound js codes and concatenate
let wiredep = require('wiredep');

module.exports = function(data) {

    Debug.L1('in scripts function');

    //     return new Promise(function(resolve, reject) {
    // //             let settings = {
    // // //                cwd: '..',
    // // //                directory: data.repoPath + '.bowerrc',
    // // //                bowerJson: data.repoPath + 'bower.json',
    // //               src: data.dir.html + data.html.base + '**/*.phtml',
    // // //                src: 'index.html',
    // //                 devDependencies: true
    // //             };
    // //             console.log(settings);
    // //             console.log(wiredep(settings).js);
    // //             resolve('end');
    //     }); //end promise


    let browserify = require('browserify'),
        fstream = require('vinyl-fs'),
        source = require('vinyl-source-stream'),
        buffer = require('vinyl-buffer'),
        globby = require('globby'),
        through = require('through2'),
        //        uglify = require('gulp-uglify'),
        sourcemaps = require('gulp-sourcemaps'),
        debowerify = require('debowerify');

    let mainNpmFiles = require('npm-main-files');
    Debug.L1('npmmailfiles ', mainNpmFiles('**/*', {
          onlySpecified: true
      })
    );

    return new Promise(function(resolve, reject) {

        var bundledStream = through();

        // instead of starting with a vinyl-fs source get a stream from browserify
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
                debug: true,
                transform: [debowerify]
            });

            // pipe the Browserify stream into the stream we created earlier
            // this starts our gulp pipeline.
            b.bundle().pipe(bundledStream);
        }).catch(function(err) {
            // ensure any errors from globby are handled
            bundledStream.emit('error', err);
        });

        // finally, we return the stream, so gulp knows when this task is done.
        resolve(bundledStream);


    }); //end promise

}
