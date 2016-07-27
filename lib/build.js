'use strict';

// Development or Distribution Build Sequence

module.exports = function(data) {
  Debug.L1('in build function');

  let tasks = [data.lib.clean,[data.lib.htmls,data.lib.styles]];

  return data.lib.util.tasker(tasks, data)
    .then(res => console.log(res))
    .catch(function(e) {
      console.log('error: ', e)
    })
}

  // return data.lib.clean(data)
  //   .then(res => console.log("done with clean start building"))
  //   .then(Promise.all([
  //     data.lib.htmls(data), data.lib.styles(data)
  //   ]).then(res => console.log("done with promise.all ", res))
  // )

//}
