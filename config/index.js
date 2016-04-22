module.exports = {
// If you want to move this file or rename it you can do that with a 'configfilepath' entry in package.json
// It must be the "path/to/filename".  If absent it will default to config/index.js
// TODO Deal with ./ , following / and relative paths in a more flexible way using npm relative module.
// All directory paths in this form  "./path/to/place/"

  repoRoot : require('app-root-path').path, // root of repo/project in the file system, used for absolute references
  configDirectory: 'config',  //  directory where collection of config files resides.
  buildDirectory: 'builds',  // where the various builds are put
  buildSubdirectory : {dev:'dev/', dist:'dist/'},  // different builds within .builds
  libDirectory: 'lib',  // workflow library directory
  assetsDirectory: 'assets',  // location of font, css, site images, html templates
  contentDirectory: 'content',  // content files are usually generator specific so put in subdirectory so it's clear (e.g. content/hugo)
  htmlGenerator: 'hugo', // specify which static site generator is being used and directory of its templates and extension file
  buildType : 'dev',  // set this to either 'dev' (default) or 'dist'
  localport: '8090' // port number for localhost serving (dev)
}

//   repoRoot = require('app-root-path').path; // root of repo/project in the file system, used for absolute references
//   configDirectory = 'config';  //  directory where collection of config files resides.
//   buildDirectory = 'builds';  // where the various builds are put
//   buildSubdirectory  = {dev:'dev/', dist:'dist/'};  // different builds within .builds
//   libDirectory = 'lib';  // workflow library directory
//   assetsDirectory = 'assets';  // location of font, css, site images, html templates
//   contentDirectory = 'content'  // content files are usually generator specific so put in subdirectory so it's clear (e.g. content/hugo)
//   htmlGenerator = 'hugo'; // specify which static site generator is being used and directory of its templates and extension file
//   buildType  = 'dev';  // set this to either 'dev' (default) or 'dist'
//   localport = '8090'; // port number for localhost serving (dev)
