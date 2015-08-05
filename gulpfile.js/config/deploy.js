var config = require('./')

module.exports = {
	src: config.publicDirectory,
	options: {
		profile:'hwdeploy',
		grants:'read=uri=http://acs.amazonaws.com/groups/global/AllUsers',
		dryrun:''
	},	
// use this for testing bucket	
	testing: {
		url: 'test.healthwrights.org',
		bucket:'test.healthwrights.org'
	},
// use this for live production bucket	  	
	live: {
		url: 'web.healthwrights.org',
		bucket:'web.healthwrights.org'
	}
}