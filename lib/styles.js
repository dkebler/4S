// index.js
// processes various style formats into css and concatenates
module.exports = function(data) {
  Debug.L1('in styles function');

  // return data.lib.util.tasker(tasks, data)
  //   .then(res => console.log(res))
  //   .catch(function(e) {
  //     console.log('error: ', e)

  // data.lib.style.sass.compile(data);


  // let sty = data.lib.util.getSubObj(data, 'lib.style');

for (let type in data.lib.style) {
    // skip loop if the property is from prototype
    data.lib.style[type].compile(data);
    // console.log('type:'+ type, obj.compile);
    }




  // Object.keys(sty).forEach(function(type) {
  //
  //     console.log(type);
  //
  // });

//     })
// }
//
//   })
}
