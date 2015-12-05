// Get array of paths for all bower sass libraries and put in sass.json file 
// in directory set in .bowerrc.  (see config/sass.js)  
// This set of paths gets sent to node-sass in gulp sass task 
// runs ons whenever gulp sass is called or when bower.json changes.



module.exports = (function() {
var jsonfile = require('jsonfile')
var config = require('../config/')
var wd_config      = require('../config/wiredep');  // wiredep used to get the paths, so check config/wiredep.js

// hold bower sass/scss library paths
var sass = {};  

// add access to dev dependencies since that's what the scss/sass libs are.
wd_config.devDependencies = 'true';   

// Let wiredep grab all the bower lib references
var bowerLibs = require('wiredep')(wd_config);

// get both .scss and .sass files, both will work with node-sass
if( "scss" in bowerLibs ) sass.paths = bowerLibs.scss;
if( "sass" in bowerLibs ) sass.paths = sass.paths.concat(bowerLibs.sass);
if ( !("sass" in bowerLibs || "scss" in bowerLibs)  ) {console.log("no sass or scss bower libs, exiting"); return;}

// libsass wants only the parent directory of each "main" file so remove the filenames
for (var i=0; i<sass.paths.length; i++){
  sass.paths[i] = require('path').dirname(sass.paths[i]);
}  

// console.table(sass.paths); 
debug("bower directory", wd_config.directory);

// no need to write them keep in memory?
// now write them out to a json file that can be used in the node-sass call
// jsonfile.writeFile(file, sass, function (err) {console.error(err)});

return sass;

}());  // immediately fun function on require
