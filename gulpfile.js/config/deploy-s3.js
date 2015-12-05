var config = require('./')

module.exports = {
	profile:'DGK-deploy',  // aws profile with write privileges to bucket.
	delete:'',
// use this for testing bucket	
	testing: {
		region: 'us-west-2',
		url: 'test.david.kebler.net',
		bucket:'test.david.kebler.net'
	},
// use this for live production bucket	  	
	live: {
		url: 'david.kebler.net',
		bucket:'david.kebler.net'
	},
	location: 'testing' // default is to testing bucket, "gulp deploy --s3 --live"  will switch to live
}