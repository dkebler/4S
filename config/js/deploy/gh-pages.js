module.exports = {
	location: 'default',  // default - in same repo
	default: {
		url: 'dkebler.github.io/super-static-site-starter',  // required - needed for html template
		// repo:'' // don't set this for default (same as current repo remote)
		// branch: ''; if not gh-pages
		// see gh-pages for other options
 	},
	test: {
		url: 'dkebler.github.io/test',  // required
		repo:'https://github.com/dkebler/test.git' // needed if currently open repo is not this repo.
		// branch: ''; if not gh-pages
		// see gh-pages for other options
	}
}
