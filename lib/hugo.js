var exec = require('child-process-promise').exec;
var chugo       = require('.' + Config.configDirectory + 'hugo');

module.exports= function (){

// TODO Build this as a function
var cmd = 'hugo -v'
			+ ' --baseUrl="' + Config.url  +  '"'
			+ ' --config="' + chugo.configPath + '"'
			+ ' --source="' + chugo.layouts + '"'
			+ ' --destination="../../'+ Config.buildDirectory + Config.buildSubdirectory[Config.buildType] + '"';
Debug('cmd: ' + cmd);

return exec(cmd)
.then(function (result) {
	var stdout = result.stdout;
	var stderr = result.stderr;
	Debug('Hugo says: ', stdout);
	Debug('stderr: ', stderr);
 });

}
