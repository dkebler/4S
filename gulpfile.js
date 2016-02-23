'use strict';

// Gulp Task File, see /lib for details of various tasks

require('./lib/globals.js');

var gulp = require('gulp');
var argv = require('yargs').argv; // for gulp tasks accepting arguments (deploy)

var build = require(Config.libDirectory + 'build');

function errorLog(err) {
  console.log('something bad happened: ', err);
}


// *********************
// Task - DEFAULT
// just allows you to point to the default (just "gulp") task (currently set to task 'dev')
// *********************

gulp.task('default', ['dev']);


// *******************
// Task - DEV
// Builds development version of assets and html and then starts browser with sync and a file watcher
// *******************

var watch = require(Config.libDirectory + 'watch');

gulp.task('dev', function() {

// TODO all below to dev.js in /lib and require
  Config.buildType = 'dev';
  Config.url = 'localhost:' + Config.localport;

  return build()
    .then(res => Info('Dev Build Complete'))
    .then(watch)
    .then(res => Info('Watching Files - Start Editing'))
    .catch(function(e) {
      console.log('error: ', e)
    });

});  // End Task DEV


// *******************
// Task - DEPLOY
// Builds distribution version of assets and html and then deploys based on default (s3) or argument passed (e.g. --gh)
// *******************

var view = require('open');

gulp.task('deploy', function() {

// TODO all below to deploy.js in /lib and require
// TODO Make deployment type default in the master file
  var deployto = 'gh'; // default change to 's3' if you want s3 to be the default
  if (Object.keys(argv)[1] !== '$0') {
    deployto = Object.keys(argv)[1]
  }

  Debug('arguments to deploy, all, 1, 2 :', argv, Object.keys(argv)[1], Object.keys(argv)[2]);

  Info('Starting deployment to', deployto);

  var cdeploy = require(Config.configDirectory + 'deploy-' + deployto);

  // see if location is other than default based on CLI arguments
//  if (Object.keys(argv)[2] !== undefined) ||  {
var loc = Object.keys(argv)[2];
// FIXME this doesn't catch undefined correctly need typeof(temp)
    if ([null,undefined,'$0'].indexOf(loc) === -1 ) {
      cdeploy.location = loc;
      Debug("taking location from command line=> ",loc)
    }

  Debug('deployment config: ', cdeploy);
  Debug('location: ', cdeploy.location);

  Config.buildType = 'dist';
  Config.url = cdeploy[cdeploy.location].url;

  Debug('deployurl', Config.url);

// load the specific deploy library
  var sync = require(Config.libDirectory + 'deploy-' + deployto);

  return build()
    .then(res => Info('build complete'))
    .then(sync)
    .then(res => Info('opening browser'))
    .then(view(('http://' + Config.url)))
    .catch(function(e) {
      console.log('error: ', e)
    });

});


// ************************
// Task - bowersass
// Generate the bower sass paths file sass-bower.json in the config directory
// This task is only needed after a bower uninstall
// *************************
gulp.task('bowersass', function() {

require('./lib/sass-bower');

});


// ************************
// Task - bowersass
// Generate the bower sass paths file sass-bower.json in the config directory
// This task is only needed after a bower uninstall
// *************************
gulp.task('clean-gh', function() {

require('./lib/clean-gh')();

});


// ************************
// Task - TEST
// want to test come code?  Just put it here or in testing.js in the library directory
// *************************
gulp.task('test', function() {

  // var foo = require(Config.libDirectory + 'testing').vfs;
  //
  // function bar() {
  //     console.log('Now doing Bar stuff');
  // }
  //
  // function oopsBar() {
  //     console.log('Something went wrong up before');
  // }
  //
  // var p = foo('./builds/**/*.*' );
  //
  // Debug(p);
  //
  // return p.then( bar, oopsBar );


  Debug("globals: ", global);

});

var merge = require('gulp-file-include')
var rename = require("gulp-rename");
var htmlbeautify = require('gulp-html-beautify');


var hbOptions = {
    "indent_size": 4,
    "indent_char": " ",
    "eol": "\n",
    "indent_level": 0,
    "indent_with_tabs": false,
    "preserve_newlines": false,  // changed
    "max_preserve_newlines": 10,
    "jslint_happy": false,
    "space_after_anon_function": false,
    "brace_style": "collapse",
    "keep_array_indentation": false,
    "keep_function_indentation": false,
    "space_before_conditional": true,
    "break_chained_methods": false,
    "eval_code": false,
    "unescape_strings": false,
    "wrap_line_length": 0,
    "wrap_attributes": "auto",
    "wrap_attributes_indent_size": 4,
    "end_with_newline": false
}

// Info(hbOptions)

gulp.task('html:merge', function() {

  gulp.src(['assets/html/base/layouts/*.pnjk'])
    .pipe(merge({prefix: '@@',basepath: 'assets/html/base/'}))
    .pipe(rename({extname: ".njk"}))
   .pipe(htmlbeautify(hbOptions))
   .pipe(gulp.dest('assets/html/base/layouts/'));
});


var watch = require(Config.libDirectory + 'watch');

var nunjucks = require('gulp-nunjucks-render');

gulp.task('html:extend',['html:merge'], function() {

	gulp.src('assets/html/base/*.njk')
		.pipe(nunjucks({ path: ['assets/html/base'] // String or Array
    }))
			.on('error', console.log)
		.pipe(gulp.dest('assets/html/hugo/layouts/_default/'));
});


// ************************
// Task - HELP
// Lists all the tasks in this gulpfile.js to the console.
// *************************
var taskListing = require('gulp-task-listing');
gulp.task('help', taskListing);
