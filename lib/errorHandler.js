'use strict';

// set up for use with plumber

var notify = require('gulp-notify');
var beep = require('beepbeep');

module.exports = function(err, callback) {
   notify.onError({
      title:    "Gulp error in " + err.plugin,
      message:  err.toString()
    })(err);
    beep(3);
    if (typeof this.emit === 'function') this.emit('end')
}



