let cli = new require('vorpal')();
let pretty = require('js-object-pretty-print').pretty;
// let pretty = require('prettyjson').render;  // alternate pretty module
let get = require('get-object');

let self = module.exports = {
  view: function(obj, objPath, options) {
    // TODO parse options parameter for use in this call
    console.log(pretty(get(obj, objPath), '5', '', false));
  },
  debug: {
    status: function() {
      // will only display those levels that are enabled thus showing their status
      Debug.L1('on');
      Debug.L2('on');
      Debug.L3('on');
    },
    disable: function(dbLevel) {
      if (!dbLevel) {
        dbLevel = 3
      }
      for (let i = dbLevel; i > 0; i--) {
        Debug['L' + i] = Debug.db.disable;
      }
    },
    enable: function(dbLevel) {
      if (!dbLevel) {
        dbLevel = 3
      }
      for (let i = dbLevel + 1; i < 4; i++) {
        Debug['L' + i] = Debug.db.disable;
      }
      for (let i = dbLevel; i > 0; i--) {
        Debug.db.enable('debug:' + i);
        Debug['L' + i] = Debug.db('debug:' + i);
      }
      self.debug.status();
    },
    view: function() {
      this.log('DEBUG environment:', process.env['DEBUG']);
      this.log(pretty(Debug, '5', '', true));
    }
  }
}
