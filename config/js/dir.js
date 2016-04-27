module.exports = {
// Project Directories you can change to your liking

  // Note: config is set in package.json or by default config/
  build: 'builds',  // where the various builds are put
  buildSub : {dev:'dev/', dist:'dist/'},  // different builds within .builds
  lib: 'lib',  // workflow library directory
  assets: 'assets',  // location of font, css, site images, html templates
  content: 'content',  // content files are usually generator specific so put in subdirectory so it's clear (e.g. content/hugo)
}
