/* */ 
'use strict';
var $ = require("./$"),
    safe = require("./$.uid").safe,
    assert = require("./$.assert"),
    forOf = require("./$.iter").forOf,
    has = $.has,
    isObject = $.isObject,
    hide = $.hide,
    isFrozen = Object.isFrozen || $.core.Object.isFrozen,
    id = 0,
    ID = safe('id'),
    WEAK = safe('weak'),
    LEAK = safe('leak'),
    method = require("./$.array-methods"),
    find = method(5),
    findIndex = method(6);
function findFrozen(store, key) {
  return find.call(store.array, function(it) {
    return it[0] === key;
  });
}
function leakStore(that) {
  return that[LEAK] || hide(that, LEAK, {
    array: [],
    get: function(key) {
      var entry = findFrozen(this, key);
      if (entry)
        return entry[1];
    },
    has: function(key) {
      return !!findFrozen(this, key);
    },
    set: function(key, value) {
      var entry = findFrozen(this, key);
      if (entry)
        entry[1] = value;
      else
        this.array.push([key, value]);
    },
    'delete': function(key) {
      var index = findIndex.call(this.array, function(it) {
        return it[0] === key;
      });
      if (~index)
        this.array.splice(index, 1);
      return !!~index;
    }
  })[LEAK];
}
module.exports = {
  getConstructor: function(NAME, IS_MAP, ADDER) {
    function C(iterable) {
      $.set(assert.inst(this, C, NAME), ID, id++);
      if (iterable != undefined)
        forOf(iterable, IS_MAP, this[ADDER], this);
    }
    $.mix(C.prototype, {
      'delete': function(key) {
        if (!isObject(key))
          return false;
        if (isFrozen(key))
          return leakStore(this)['delete'](key);
        return has(key, WEAK) && has(key[WEAK], this[ID]) && delete key[WEAK][this[ID]];
      },
      has: function(key) {
        if (!isObject(key))
          return false;
        if (isFrozen(key))
          return leakStore(this).has(key);
        return has(key, WEAK) && has(key[WEAK], this[ID]);
      }
    });
    return C;
  },
  def: function(that, key, value) {
    if (isFrozen(assert.obj(key))) {
      leakStore(that).set(key, value);
    } else {
      has(key, WEAK) || hide(key, WEAK, {});
      key[WEAK][that[ID]] = value;
    }
    return that;
  },
  leakStore: leakStore,
  WEAK: WEAK,
  ID: ID
};
