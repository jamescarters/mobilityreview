/* */ 
"use strict";
var _core = require("../core-js")["default"];
exports["default"] = function(arr, i) {
  if (_core.Array.isArray(arr)) {
    return arr;
  } else if (_core.isIterable(Object(arr))) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;
    try {
      for (var _i = _core.getIterator(arr),
          _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);
        if (i && _arr.length === i)
          break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"])
          _i["return"]();
      } finally {
        if (_d)
          throw _e;
      }
    }
    return _arr;
  } else {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  }
};
exports.__esModule = true;
