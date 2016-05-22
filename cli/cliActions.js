//let pretty = require('js-object-pretty-print').pretty;
// let pretty = require('prettyjson').render;  // alternate pretty module
// let get = require('get-object');

let self = module.exports = {
  view: function(data, args, cb) {
    // TODO parse options argument for use in view (pretty options)
    data.lib.util.view(data.lib.util.getSubObj(data, args.objPath));
    Debug.L1('done with view');
    cb();
  },
  debug: {
    status: function(data, args,cb) {
      // will only display those levels that are enabled thus showing their status
      Debug.L1('on');
      Debug.L2('on');
      Debug.L3('on');
      cb();
    },
    disable: function(data,args,cb) {
      for (let i = 1; i < 4; i++) {
        Debug['L' + i] = Debug.db.disable;
      }
      console.log('All Debugging is Disabled')
      cb();
    },
    enable: function(data,args,cb) {
      if (!args.level) {
        args.level = 3
      }
      for (let i = args.level + 1; i < 4; i++) {
        Debug['L' + i] = Debug.db.disable;
      }
      for (let i = args.level; i > 0; i--) {
        Debug.db.enable('debug:' + i);
        Debug['L' + i] = Debug.db('debug:' + i);
      }
      self.debug.status(data,args,cb);  // let status call the callback
    },
    view: function(data,args,cb) {
      console.log('DEBUG environment:', process.env['DEBUG']);
      // TODO parse options argument for use in view/pretty
      console.log(data.lib.util.view(Debug));
      cb();
    }
  }
}
