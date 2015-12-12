// Gulp Task File, see /lib for details of various tasks

// set global master config file path in package.json or use default   
configfilepath = require('./package').configfilepath || '/config/';

var gulp = require('gulp');
var config = require('./' + configfilepath);  
require(config.libDirectory + '/debug');  // see debug.js in library to turn on/off/customize debugging

var argv = require('yargs').argv;  // for gulp tasks accepting arguments (deploy)

// *********************
// Task - DEFAULT  
// just allows you to point to the default (just "gulp") task (currently set to task 'dev')
// *********************
gulp.task('default', ['dev']);	


// *******************
// Task - DEV 
// Builds development version of assets and html and then starts browser with sync and a file watcher
// *******************
gulp.task('dev', function() {
config.buildType='dev';
config.url = 'localhost:' + config.localport;
build = require(config.libDirectory + '/build');
build(watch);  // callback is watch function

function watch() {
    info('dev build complete:  watching for changes');
    var watchAll = require(config.libDirectory + 'watchAll');
    watchAll(error);  //error is callback when something in watching fails.
    }

function error(){console.log('something bad happened while watching');}   

});	


// *******************
// Task - DEPLOY 
// Builds distribution version of assets and html and then deploys based on default (s3) or argument passed (e.g. --gh)
// *******************
gulp.task('deploy',function(cb) {

debug('arguments to deploy', argv, Object.keys(argv)[1]);

var deployto = 's3';
if (Object.keys(argv)[1]!=='$0') {deployto = Object.keys(argv)[1]}

info('Starting deployment to', deployto, ',  building...'); 

var dplyconfig = require('../config/deploy-' + deployto );

if (Object.keys(argv)[2]!=='$0') {dplyconfig.location = Object.keys(argv)[2]}
debug(dplyconfig);

// build the distribution folder
config.buildType='dist';
config.url = dplyconfig[dplyconfig.location].url;
debug('deployurl', config.url);

var build = require('../lib/build');
build(config,deploy);

function deploy() {
    info('deploying after build')
    debug('../lib/deploy-'+ deployto);
    var dp = require('../lib/deploy-'+ deployto);
    dp(openit);
 }

function openit() {
	info('deployment to', deployto, ' commplete');
	info('opening http://', config.url, ' in browser')
	var open = require('open');
	open('http://'+ config.url);  
  }
    


});


// ************************
// Task - sass:paths 
// Generate the bower sass paths file sass-bower.json in the config directory
// This task is only needed after a bower uninstall
// *************************
gulp.task('sass:paths', function () {

require('../lib/sass-bower')();  

});


// ************************
// Task - TODO
// generate a todo.md in root of all repo todos.  uses leasot  https://github.com/pgilad/leasot
// *************************
// TODO use different package than gulp-todo  for example (gulp-comments)
gulp.task('todo', function() {

require(config.libDirectory + '/todo');	

});

// ************************
// Task - TODO
// generate a todo.md in root of all repo todos.  uses leasot  https://github.com/pgilad/leasot
// *************************
var open = require('gulp-open');
gulp.task('todo:view',['todo'], function() {
    gulp.src('./TODO.md')
 //   .pipe(open());       

      .pipe(open({uri: 'localhost:3030', app: 'firefox'}));

});


// ************************
// Task - TEST 
// want to test come code?  Just put it in testing.js in the library directory
// *************************
gulp.task('test', function() {
require(config.libDirectory + '/testing');
});


// ************************
// Task - HELP 
// Lists all the tasks in this gulpfile.js to the console.
// *************************
var taskListing = require('gulp-task-listing');
gulp.task('help', taskListing);