// generate list of paths to bower sass/scss libraries
var sass = require('./sass-bower'); // json file of paths

if (typeof sass.paths == 'undefined') {console.log('scss bower paths NOT retrieved');}
if (sass.paths == null) {console.log('no scss bower paths available');}

module.exports = {
  autoprefixer: { browsers: ['last 2 version'] },
  src: Config.assetsDirectory + "styles/sass/site.scss",
  watch: Config.assetsDirectory + "styles/sass/" + '**/*.*',
  dest: 'assets/styles/',
  paths: sass.paths
}
