let sequence = require('when/sequence');
let parallel = require('when/parallel');

let self = module.exports = {

  enter: function(data) {

//  self.tasker([self.f1, self.f2, [self.f3, self.f4], self.f1], data);
self.subtask(data);


  },
  tasker: function(tasks, data) {

    sequence(
      tasks.map(function(item) {
        if (Array.isArray(item)) {
          return data => parallel(item, data)
        } else {
          return item
        }
      }),data).then(res => console.log('tasks:', res));

  },

  f1: function(data) {
    Debug.L2('in f1 function');
    return new Promise(function(resolve, reject) {
      setTimeout(() => resolve("done f1"), 2000);
    })
  },
  f2: function(data) {
    Debug.L2('in f2 function');
    return new Promise(function(resolve, reject) {
      setTimeout(() => resolve("done f2"), 2000);
    })
  },
  f3: function(data) {
    Debug.L2('in f3 function');
    return new Promise(function(resolve, reject) {
      setTimeout(() => resolve("done f3"), 2000);
    })
  },

  f4: function(data) {
    Debug.L2('in f4 function');
    return new Promise(function(resolve, reject) {
      setTimeout(() => resolve("done f4"), 2000);
    })
  },
subtask: function(data) {
  let styles = data.lib.util.getSubObj(data, 'lib.style');

  Object.keys(styles).forEach(function(type) {

       console.log(type, styles[type]);

  });

},
}
