var gulp         = require('gulp');
var config = require('../config/');

var argv = require('yargs').argv;  
var runSequence = require('run-sequence');

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
	info('opening http://', config.url, ' in browser')
	var open = require('open');
	open('http://'+ config.url);  
  }
    


});





