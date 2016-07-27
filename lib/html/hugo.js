'use strict';

let exec = require('child-process-promise').exec;

module.exports= function (data){

// TODO Make command line build utility to build commands.
let cmd = 'hugo -v'
			+ ' --baseUrl="'			+ data.repoPath + data.build.url + ':'+ data.build.port				+'"'
			+ ' --config="'				+ data.repoPath + data.dir.content + data.html.generator	+ '/config.toml"'
			+ ' --source="'				+ data.repoPath + data.dir.html + data.html.template + '/layouts'			+'"'
			+ ' --destination="'	+ data.repoPath + data.dir[data.build.type] 							+'"';

Debug.L1('cmd: ' + cmd);

// exec('echo hello')
//     .then(function (result) {
//         var stdout = result.stdout;
//         var stderr = result.stderr;
//         console.log('stdout: ', stdout);
//         console.log('stderr: ', stderr);
//     })
//     .catch(function (err) {
//         console.error('ERROR: ', err);
//     });

return exec(cmd)
.then(function (result) {
	let stdout = result.stdout;
	let stderr = result.stderr;
	Debug.L2('Hugo says: ', stdout);
	Debug.L2('stderr: ', stderr);
	console.log("done with hugo command")
 });

}
