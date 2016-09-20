let sequence = require('when/sequence');
let parallel = require('when/parallel');

let self = module.exports = {

  enter: function(data) {

//  useage ....self. name of some function below to test that function

//  self.tasker([self.f1, self.f2, [self.f3, self.f4], self.f1], data);
//  self.subtask(data);
self.jsscripts(data);


  },
  jsscripts: function(data) {
data.lib.scripts(data);
},

  hugo: function(data) {

  let exec = require('child_process').execFile;
  let hugo = require('hugo-bin');


  // TODO Make command line build utility to build commands.
  let cmd = '-v'
    			+ ' --config="'   		+ data.repoPath + data.dir.content + data.html.template	+ 'config.toml' + '"'
  				+ ' --baseUrl="'			+ data.build.url + ':'+ data.build.port				+'"'
    			+ ' --layoutDir="'			+ data.repoPath + data.dir.html + data.html.template + data.html.layouts +'"'
  				+ ' --contentDir="'	  + data.repoPath + data.dir.content + data.html.template + "pages/"							+'"'
    			+ ' --destination="'	+ data.repoPath + data.dir[data.build.type] 							+'"'
  			;
  Debug.L1('cmd: ' + cmd);

  exec(hugo, [cmd], (err, stdout) => {
  			  console.log(stdout);
  				console.log(err);
  			});

},
  tasker: function(tasks, data) {

    sequence(
      tasks.map(function(item) {
        if (Array.isArray(item)) {
          return data => parallel(item, data)
        } else {
          return item
        }
      }),data).then(res => console.log('tasks:', res));

  },

  f1: function(data) {
    Debug.L2('in f1 function');
    return new Promise(function(resolve, reject) {
      setTimeout(() => resolve("done f1"), 2000);
    })
  },
  f2: function(data) {
    Debug.L2('in f2 function');
    return new Promise(function(resolve, reject) {
      setTimeout(() => resolve("done f2"), 2000);
    })
  },
  f3: function(data) {
    Debug.L2('in f3 function');
    return new Promise(function(resolve, reject) {
      setTimeout(() => resolve("done f3"), 2000);
    })
  },

  f4: function(data) {
    Debug.L2('in f4 function');
    return new Promise(function(resolve, reject) {
      setTimeout(() => resolve("done f4"), 2000);
    })
  },
subtask: function(data) {
  let styles = data.lib.util.getSubObj(data, 'lib.style');

  Object.keys(styles).forEach(function(type) {

       console.log(type, styles[type]);

  });

},
}
