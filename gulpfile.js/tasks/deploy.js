var gulp         = require('gulp');
var open    = require('open');
var config = require('../config/');

var argv = require('yargs').argv;  
var runSequence = require('run-sequence');

gulp.task('deploy',function(cb) {

debug('arguments to deploy', argv, Object.keys(argv)[1]);

var deployto = 's3';
if (Object.keys(argv)[1]!=='$0') {deployto = Object.keys(argv)[1]}

info('Starting deployment to', deployto, ',  building...'); 

var dplyconfig = require('../config/deploy-' + deployto );

debug(dplyconfig);

// build the distribution folder
config.buildType='dist';
config.url = dplyconfig[dplyconfig.location].url;

// runSequence('build', deploy);
build = require('../lib/build');
build(config,deploy);

function deploy() {
    info('syncing after build')
    debug('../lib/deploy-'+ deployto);
    require('../lib/deploy-'+ deployto);
    open(config.url);
}

});





