/* */ 
var $ = require("./$"),
    $def = require("./$.def"),
    core = $.core,
    statics = {};
function setStatics(keys, length) {
  $.each.call(keys.split(','), function(key) {
    if (length == undefined && key in core.Array)
      statics[key] = core.Array[key];
    else if (key in [])
      statics[key] = require("./$.ctx")(Function.call, [][key], length);
  });
}
setStatics('pop,reverse,shift,keys,values,entries', 1);
setStatics('indexOf,every,some,forEach,map,filter,find,findIndex,includes', 3);
setStatics('join,slice,concat,push,splice,unshift,sort,lastIndexOf,' + 'reduce,reduceRight,copyWithin,fill,turn');
$def($def.S, 'Array', statics);
