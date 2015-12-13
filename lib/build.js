var Promise = require('any-promise');

var clean = require('./clean');

module.exports = function () {
debug('in build function');
return Promise.all(clean).then(clean);
}
