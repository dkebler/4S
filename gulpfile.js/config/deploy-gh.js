var config = require('./')

module.exports = {
  	ghaccount:'dkebler',  // aws profile with write privileges to bucket.
// use this for testing bucket	
	testing: {
		url: 'https://dkebler.github.io/Hugo-Sass-Bower-Gulp-S3-Starter',
 	},
	location: 'testing' // default is to testing bucket
}