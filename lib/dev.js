module.exports = function(data) {

  Debug.L1('in dev');
  let tasks = [data.lib.build, data.lib.browser, data.lib.watchers];

  data.lib.util.tasker(tasks, data)
    .then(res => console.log(res))
    .catch(function(e) {
      console.log('error: ', e)
    })
}
