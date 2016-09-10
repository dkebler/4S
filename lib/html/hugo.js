'use strict';
// let exec = require('child_process').execFile;

let exec = require('child-process-promise').exec;
let hugo = require('hugo-bin');


module.exports= function (data){

let baseUrl  = '';
if (data.build.port) {baseUrl =data.build.url + ':'+ data.build.port} else { baseUrl = data.build.url}
Debug.L1('baseUrl: '+ baseUrl);

// TODO Make command line build utility to build commands.
let cmd = hugo + ' -v'
  			+ ' --config="'   		+ data.repoPath + data.dir.content + data.html.template	+ 'config.toml' + '"'
				+ ' --baseUrl="'			+ baseUrl	+'"'
  			+ ' --layoutDir="'		+ data.repoPath + data.dir.html + data.html.template + data.html.layouts +'"'
				+ ' --contentDir="'	  + data.repoPath + data.dir.content + data.html.template + "pages/"							+'"'
  			+ ' --destination="'	+ data.repoPath + data.dir[data.build.type] 							+'"'
			;

Debug.L2('hugo cmd: ' + cmd);

return exec(cmd)
.then(function (result) {
	let stdout = result.stdout;
	let stderr = result.stderr;
	Debug.L2('Hugo says: ', stdout);
	Debug.L2('stderr: ', stderr);
	Debug.L1("done with hugo command")
 });

}


// exec(hugo, [cmd], (err, stdout) => {
// 			  console.log(stdout);
// 				console.log(err);
// 			});
