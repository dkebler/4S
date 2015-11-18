var config = require('./')
var wd_config      = require('./wiredep');
var jsonfile = require('jsonfile')

var file = config.appRoot + "/" +  wd_config.directory + "/sass.json"
var sass = jsonfile.readFileSync(file);

console.log('after read');
console.table(sass.paths);

if (typeof sass.paths == 'undefined') {console.log('scss bower paths NOT retrieved');}
if (sass.paths == null) {console.log('no scss bower paths available');} 

module.exports = {
  autoprefixer: { browsers: ['last 2 version'] },
  src: config.sourceAssets + "/stylesheets/site.scss",
  watch: config.sourceAssets + "/stylesheets/" + '/**/*.*',
  dest: config.publicAssets + '/stylesheets',
  sasspathsfile: file,
  sasspaths: sass.paths
}

