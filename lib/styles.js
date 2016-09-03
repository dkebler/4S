
// processes various style formats into css and then concatenate maybe minify and autoprefix
module.exports = function(data) {

  Debug.L1('in styles function');

// each js file in lib/styles folder should have a render function.
  let toRender=[];
  for (let type in data.lib.style) {
    // TODO check to see if js file has render function
      toRender.push(data.lib.style[type].render);
      }

  let tasks =[toRender];

  return data.lib.util.tasker(tasks, data)
     .then(res => console.log(res))
     .catch(function(e) {console.log('error: ', e)});

   }

// TODO add file stream to concat all css file then minify etc. and write out singe css file to build
