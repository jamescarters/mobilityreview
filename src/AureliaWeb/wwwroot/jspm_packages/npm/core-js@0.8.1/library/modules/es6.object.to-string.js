/* */ 
'use strict';
var $ = require("./$"),
    cof = require("./$.cof"),
    tmp = {};
tmp[require("./$.wks")('toStringTag')] = 'z';
if ($.FW && cof(tmp) != 'z')
  $.hide(Object.prototype, 'toString', function() {
    return '[object ' + cof.classof(this) + ']';
  });
