'use strict';

let exec = require('child-process-promise').exec;

module.exports= function (data){

// TODO Make command line build utility to build commands.
let cmd = 'hugo -v'
			+ ' --baseUrl="'			+ data.build.url + data.build.port				+'"'
			+ ' --config="'				+ data.dir.content + data.html.generator	+'"'
			+ ' --source="'				+ data.dir.html + data.html.template + '/layouts'			+'"'
			+ ' --destination="'	+ data.dir[data.build.type] 							+'"';

Debug.L1('cmd: ' + cmd);

// return exec(cmd)
// .then(function (result) {
// 	let stdout = result.stdout;
// 	let stderr = result.stderr;
// 	Debug.L1('Hugo says: ', stdout);
// 	Debug.L1('stderr: ', stderr);
//  });

}
