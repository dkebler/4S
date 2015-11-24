var config = require('./')
var fs = require('fs');
var sass = require('../lib/sass-bower');

if (DEBUG) console.log('after re/create');
if (DEBUG) console.table(sass.paths);

if (typeof sass.paths == 'undefined') {console.log('scss bower paths NOT retrieved');}
if (sass.paths == null) {console.log('no scss bower paths available');} 

module.exports = {
  autoprefixer: { browsers: ['last 2 version'] },
  src: config.assetsDirectory + "/styles/sass/site.scss",
  watch: config.assetsDirectory + "/styles/sass/" + '/**/*.*',
  dest: config.buildDirectory + config.buildSubdirectory[config.buildType] + '/assets/styles/',
  sasspaths: sass.paths
}

