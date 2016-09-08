// HTML
// process all html first using post html then the current template engine.
module.exports = function(data) {
  Debug.L1('in html function');

  let tasks = [data.lib.html.merge,data.lib.html.extend,data.lib.html[data.html.generator]];

   Debug.L2('tasks: ' + tasks);

    return data.lib.util.tasker(tasks, data)
       .then(res => Debug.L1('done with html tasks'))
       .catch(function(e) {console.log('error: ', e)});

}
