var config = {}

// If you want to move this file or rename it you can do that with a 'configfilepath' entry in package.json
// It must be the "path/to/filename".  If absent it will default to config/index.js
// TODO Deal with ./ , following / and relative paths in a more flexible way using relative module.
// All directory paths in this form  "./path/to/place/"
config.repoRoot = require('app-root-path').path; // root of repo/project in the file system, used for absolute references
config.configDirectory = './config/';  //  directory where collection of config files resides.
config.buildDirectory = './builds/';  // where the various builds are put
config.buildSubdirectory  = {dev:'dev/', dist:'dist/'};  // different builds within .builds
config.libDirectory = './lib/';  // workflow library directory
config.assetsDirectory = "./assets/";  // location of font, css, etc - could put images here as well.
config.contentDirectory = "./content/"
// content files are usually generator specific so put in subdirectory so it's clear (e.g. content/hugo)
config.htmlDirectory ="./html/"; // html templates and other layout and configs specific to a generator
// put generator templates/files in subdirectory of config.htmlDirectory of the htmlGenerator (e.g. html/hugo)
config.htmlGenerator = "hugo"; // specify which static site generator is being used.
config.buildType  = 'dev';  // set this to either 'dev' (default) or 'dist'
config.localport = '8090'; // default port number for localhost serving (dev)
config.url = 'localhost:' + config.localport; // default url for for development

module.exports = config;
