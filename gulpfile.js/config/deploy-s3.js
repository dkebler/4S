module.exports = {
	  delete:'',  // 
// use this for testing bucket	
	testing: {
		profile:'DGK-deploy',  // aws profile with write privileges to bucket.
		region: 'us-west-2', 
		url: 'test.david.kebler.net',
		bucket:'test.david.kebler.net'
	},
// use this for live production bucket	  	
	live: {
		profile:'DGK-deploy',
		region: 'us-west-2',
		url: 'david.kebler.net',
		bucket:'david.kebler.net'
	},
	location: 'testing' // this is the  default location, "gulp deploy --s3 --xxxx"  will switch to xxxx (e.g.live)
}