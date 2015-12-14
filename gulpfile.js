// Gulp Task File, see /lib for details of various tasks

// set global master config file path in package.json or use default  config/index.js
Configfilepath = require('./package').configfilepath || 'config/';
// Have the main config file be global
var ds = require('dot-slash').enforce;
Config = require(ds(Configfilepath));

// Promise = require('any-promise');
// Promise = require('q');
Promise = require('bluebird');

var gulp = require('gulp');
require(Config.libDirectory + 'debug');  // see debug.js in library to turn on/off/customize debugging
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

return  new Promise(function(resolve, reject) {
  Config.buildType='dev';
  Config.url = 'localhost:' + Config.localport;
  require(Config.libDirectory + 'build')
    .then (res => {info(res)})
    .then(require(Config.libDirectory + 'watchAll'))
    .catch(function(e){config.log('error: ', e)})
    .done;
})

function error(){console.log('something bad happened');}

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

var dplyconfig = require(Config.configDirectory, + 'deploy-' + deployto );

if (Object.keys(argv)[2]!=='$0') {dplyconfig.location = Object.keys(argv)[2]}
debug(dplyconfig);

// build the distribution folder
Config.buildType='dist';
Config.url = dplyconfig[dplyconfig.location].url;
debug('deployurl', Config.url);

var build = require(Config.libDirectory + 'build');
build(config,deploy);

function deploy() {
    info('deploying after build')
    debug('deploy to ' + deployto);
    var dp = require(Config.libDirectory +'deploy-'+ deployto);
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
// Task - TEST
// want to test come code?  Just put it in testing.js in the library directory
// *************************
gulp.task('test', function() {
require(Config.libDirectory + 'testing');
});

// ************************
// Task - HELP
// Lists all the tasks in this gulpfile.js to the console.
// *************************
var taskListing = require('gulp-task-listing');
gulp.task('help', taskListing);
