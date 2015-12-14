var exec = require('child_process').exec;
var hugo       = require('../config/hugo');

module.exports= function (){

// TODO Build this as a function
var cmd = 'hugo -v'
			+ ' --baseUrl="' + Config.url  +  '"'
			+ ' --config="' + hugo.configPath + '"'
			+ ' --source="' + hugo.layouts + '"'
			+ ' --destination="../../'+ Config.buildDirectory + Config.buildSubdirectory[Config.buildType] + '"';
debug('cmd: ' + cmd);

exec(cmd,function (error, stdout, stderr) {
    info('Hugo Processing Done');
    debug2('HugoBuilder Says: ' +  stdout);

    if (error !== null) {
      console.log('stderr: ' + stderr);
      console.log('exec error: ' + error);
		}

    });

}
