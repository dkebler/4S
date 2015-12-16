module.exports = {
	// "gulp deploy --s3 --xxxx"  will switch to xxxx (e.g.live)
	location: 'testing',  // default deployment bucket (one of keys below)
// could use this for testing bucket
	testing: {
		profile: 'DGK-deploy',  // aws profile with write privileges to bucket, keys must be in you aws credentials file
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
	}
	// can add as many other locations as you want.  use gulp deploy --s3 --<key>
}
