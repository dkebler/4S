var config = {}

config.buildDirectory = './.builds';  // where the various builds are put 
config.buildSubdirectory  = {dev:'/dev', dist:'/dist'};
config.buildType  = 'dev';  // set this to either 'dev' (default) or 'dist'
config.assetsDirectory = "./assets";  // location of font, css, etc - could put images here as well.
config.repoRoot = require('app-root-path').path; // root of repo/project in the file system, used for absolute references
config.htmlGenerator   = "hugo"; // specify which static site generator is being used.  have a gulp task of same name 
// TODO have content be a submodule
config.contentDirectory = "./content"
// conetent files are usually generator specific so put in subdirectory so it's clear (e.g. content/hugo)
// TODO have html templates be a submodule.
config.htmlDirectory ="./html"; // html templates and other configs needed by the generator
// put generator templates/files in subdirectory of config.html of the same name (e.g. html/hugo)
config.localport = 8090; // default port number for localhost serving (dev)
config.url = 'http://localhost:' + config.localport; // default localhost for dev

//console.table(config);
//console.table(config.buildSubdirectory);

module.exports = config;
