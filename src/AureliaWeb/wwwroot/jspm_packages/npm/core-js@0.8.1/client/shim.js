/* */ 
"format cjs";
(function(process) {
  !function(undefined) {
    var __e = null,
        __g = null;
    (function e(t, n, r) {
      function s(o, u) {
        if (!n[o]) {
          if (!t[o]) {
            var a = typeof require == "function" && require;
            if (!u && a)
              return a(o, !0);
            if (i)
              return i(o, !0);
            var f = new Error("Cannot find module '" + o + "'");
            throw f.code = "MODULE_NOT_FOUND", f;
          }
          var l = n[o] = {exports: {}};
          t[o][0].call(l.exports, function(e) {
            var n = t[o][1][e];
            return s(n ? n : e);
          }, l, l.exports, e, t, n, r);
        }
        return n[o].exports;
      }
      var i = typeof require == "function" && require;
      for (var o = 0; o < r.length; o++)
        s(r[o]);
      return s;
    })({
      1: [function(require, module, exports) {
        require("./es5");
        require("./es6.symbol");
        require("./es6.object.assign");
        require("./es6.object.is");
        require("./es6.object.set-prototype-of");
        require("./es6.object.to-string");
        require("./es6.object.statics-accept-primitives");
        require("./es6.function.name");
        require("./es6.number.constructor");
        require("./es6.number.statics");
        require("./es6.math");
        require("./es6.string.from-code-point");
        require("./es6.string.raw");
        require("./es6.string.iterator");
        require("./es6.string.code-point-at");
        require("./es6.string.ends-with");
        require("./es6.string.includes");
        require("./es6.string.repeat");
        require("./es6.string.starts-with");
        require("./es6.array.from");
        require("./es6.array.of");
        require("./es6.array.iterator");
        require("./es6.array.species");
        require("./es6.array.copy-within");
        require("./es6.array.fill");
        require("./es6.array.find");
        require("./es6.array.find-index");
        require("./es6.regexp");
        require("./es6.promise");
        require("./es6.map");
        require("./es6.set");
        require("./es6.weak-map");
        require("./es6.weak-set");
        require("./es6.reflect");
        require("./es7.array.includes");
        require("./es7.string.at");
        require("./es7.regexp.escape");
        require("./es7.object.get-own-property-descriptors");
        require("./es7.object.to-array");
        require("./web.immediate");
        require("./web.dom.iterable");
        require("./web.timers");
        require("./js.array.statics");
      }, {
        "./es5": 27,
        "./es6.array.copy-within": 28,
        "./es6.array.fill": 29,
        "./es6.array.find": 31,
        "./es6.array.find-index": 30,
        "./es6.array.from": 32,
        "./es6.array.iterator": 33,
        "./es6.array.of": 34,
        "./es6.array.species": 35,
        "./es6.function.name": 36,
        "./es6.map": 37,
        "./es6.math": 38,
        "./es6.number.constructor": 39,
        "./es6.number.statics": 40,
        "./es6.object.assign": 41,
        "./es6.object.is": 42,
        "./es6.object.set-prototype-of": 43,
        "./es6.object.statics-accept-primitives": 44,
        "./es6.object.to-string": 45,
        "./es6.promise": 46,
        "./es6.reflect": 47,
        "./es6.regexp": 48,
        "./es6.set": 49,
        "./es6.string.code-point-at": 50,
        "./es6.string.ends-with": 51,
        "./es6.string.from-code-point": 52,
        "./es6.string.includes": 53,
        "./es6.string.iterator": 54,
        "./es6.string.raw": 55,
        "./es6.string.repeat": 56,
        "./es6.string.starts-with": 57,
        "./es6.symbol": 58,
        "./es6.weak-map": 59,
        "./es6.weak-set": 60,
        "./es7.array.includes": 61,
        "./es7.object.get-own-property-descriptors": 62,
        "./es7.object.to-array": 63,
        "./es7.regexp.escape": 64,
        "./es7.string.at": 65,
        "./js.array.statics": 66,
        "./web.dom.iterable": 67,
        "./web.immediate": 68,
        "./web.timers": 69
      }],
      2: [function(require, module, exports) {
        'use strict';
        var $ = require("./$");
        module.exports = function(IS_INCLUDES) {
          return function(el) {
            var O = $.toObject(this),
                length = $.toLength(O.length),
                index = $.toIndex(arguments[1], length),
                value;
            if (IS_INCLUDES && el != el)
              while (length > index) {
                value = O[index++];
                if (value != value)
                  return true;
              }
            else
              for (; length > index; index++)
                if (IS_INCLUDES || index in O) {
                  if (O[index] === el)
                    return IS_INCLUDES || index;
                }
            return !IS_INCLUDES && -1;
          };
        };
      }, {"./$": 15}],
      3: [function(require, module, exports) {
        'use strict';
        var $ = require("./$"),
            ctx = require("./$.ctx");
        module.exports = function(TYPE) {
          var IS_MAP = TYPE == 1,
              IS_FILTER = TYPE == 2,
              IS_SOME = TYPE == 3,
              IS_EVERY = TYPE == 4,
              IS_FIND_INDEX = TYPE == 6,
              NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
          return function(callbackfn) {
            var O = Object($.assertDefined(this)),
                self = $.ES5Object(O),
                f = ctx(callbackfn, arguments[1], 3),
                length = $.toLength(self.length),
                index = 0,
                result = IS_MAP ? Array(length) : IS_FILTER ? [] : undefined,
                val,
                res;
            for (; length > index; index++)
              if (NO_HOLES || index in self) {
                val = self[index];
                res = f(val, index, O);
                if (TYPE) {
                  if (IS_MAP)
                    result[index] = res;
                  else if (res)
                    switch (TYPE) {
                      case 3:
                        return true;
                      case 5:
                        return val;
                      case 6:
                        return index;
                      case 2:
                        result.push(val);
                    }
                  else if (IS_EVERY)
                    return false;
                }
              }
            return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
          };
        };
      }, {
        "./$": 15,
        "./$.ctx": 10
      }],
      4: [function(require, module, exports) {
        var $ = require("./$");
        function assert(condition, msg1, msg2) {
          if (!condition)
            throw TypeError(msg2 ? msg1 + msg2 : msg1);
        }
        assert.def = $.assertDefined;
        assert.fn = function(it) {
          if (!$.isFunction(it))
            throw TypeError(it + ' is not a function!');
          return it;
        };
        assert.obj = function(it) {
          if (!$.isObject(it))
            throw TypeError(it + ' is not an object!');
          return it;
        };
        assert.inst = function(it, Constructor, name) {
          if (!(it instanceof Constructor))
            throw TypeError(name + ": use the 'new' operator!");
          return it;
        };
        module.exports = assert;
      }, {"./$": 15}],
      5: [function(require, module, exports) {
        var $ = require("./$");
        module.exports = Object.assign || function(target, source) {
          var T = Object($.assertDefined(target)),
              l = arguments.length,
              i = 1;
          while (l > i) {
            var S = $.ES5Object(arguments[i++]),
                keys = $.getKeys(S),
                length = keys.length,
                j = 0,
                key;
            while (length > j)
              T[key = keys[j++]] = S[key];
          }
          return T;
        };
      }, {"./$": 15}],
      6: [function(require, module, exports) {
        var $ = require("./$"),
            TAG = require("./$.wks")('toStringTag'),
            toString = {}.toString;
        function cof(it) {
          return toString.call(it).slice(8, -1);
        }
        cof.classof = function(it) {
          var O,
              T;
          return it == undefined ? it === undefined ? 'Undefined' : 'Null' : typeof(T = (O = Object(it))[TAG]) == 'string' ? T : cof(O);
        };
        cof.set = function(it, tag, stat) {
          if (it && !$.has(it = stat ? it : it.prototype, TAG))
            $.hide(it, TAG, tag);
        };
        module.exports = cof;
      }, {
        "./$": 15,
        "./$.wks": 26
      }],
      7: [function(require, module, exports) {
        'use strict';
        var $ = require("./$"),
            ctx = require("./$.ctx"),
            safe = require("./$.uid").safe,
            assert = require("./$.assert"),
            $iter = require("./$.iter"),
            has = $.has,
            set = $.set,
            isObject = $.isObject,
            hide = $.hide,
            step = $iter.step,
            isFrozen = Object.isFrozen || $.core.Object.isFrozen,
            ID = safe('id'),
            O1 = safe('O1'),
            LAST = safe('last'),
            FIRST = safe('first'),
            ITER = safe('iter'),
            SIZE = $.DESC ? safe('size') : 'size',
            id = 0;
        function fastKey(it, create) {
          if (!isObject(it))
            return (typeof it == 'string' ? 'S' : 'P') + it;
          if (isFrozen(it))
            return 'F';
          if (!has(it, ID)) {
            if (!create)
              return 'E';
            hide(it, ID, ++id);
          }
          return 'O' + it[ID];
        }
        function getEntry(that, key) {
          var index = fastKey(key),
              entry;
          if (index != 'F')
            return that[O1][index];
          for (entry = that[FIRST]; entry; entry = entry.n) {
            if (entry.k == key)
              return entry;
          }
        }
        module.exports = {
          getConstructor: function(NAME, IS_MAP, ADDER) {
            function C(iterable) {
              var that = assert.inst(this, C, NAME);
              set(that, O1, $.create(null));
              set(that, SIZE, 0);
              set(that, LAST, undefined);
              set(that, FIRST, undefined);
              if (iterable != undefined)
                $iter.forOf(iterable, IS_MAP, that[ADDER], that);
            }
            $.mix(C.prototype, {
              clear: function() {
                for (var that = this,
                    data = that[O1],
                    entry = that[FIRST]; entry; entry = entry.n) {
                  entry.r = true;
                  if (entry.p)
                    entry.p = entry.p.n = undefined;
                  delete data[entry.i];
                }
                that[FIRST] = that[LAST] = undefined;
                that[SIZE] = 0;
              },
              'delete': function(key) {
                var that = this,
                    entry = getEntry(that, key);
                if (entry) {
                  var next = entry.n,
                      prev = entry.p;
                  delete that[O1][entry.i];
                  entry.r = true;
                  if (prev)
                    prev.n = next;
                  if (next)
                    next.p = prev;
                  if (that[FIRST] == entry)
                    that[FIRST] = next;
                  if (that[LAST] == entry)
                    that[LAST] = prev;
                  that[SIZE]--;
                }
                return !!entry;
              },
              forEach: function(callbackfn) {
                var f = ctx(callbackfn, arguments[1], 3),
                    entry;
                while (entry = entry ? entry.n : this[FIRST]) {
                  f(entry.v, entry.k, this);
                  while (entry && entry.r)
                    entry = entry.p;
                }
              },
              has: function(key) {
                return !!getEntry(this, key);
              }
            });
            if ($.DESC)
              $.setDesc(C.prototype, 'size', {get: function() {
                  return assert.def(this[SIZE]);
                }});
            return C;
          },
          def: function(that, key, value) {
            var entry = getEntry(that, key),
                prev,
                index;
            if (entry) {
              entry.v = value;
            } else {
              that[LAST] = entry = {
                i: index = fastKey(key, true),
                k: key,
                v: value,
                p: prev = that[LAST],
                n: undefined,
                r: false
              };
              if (!that[FIRST])
                that[FIRST] = entry;
              if (prev)
                prev.n = entry;
              that[SIZE]++;
              if (index != 'F')
                that[O1][index] = entry;
            }
            return that;
          },
          getEntry: getEntry,
          getIterConstructor: function() {
            return function(iterated, kind) {
              set(this, ITER, {
                o: iterated,
                k: kind
              });
            };
          },
          next: function() {
            var iter = this[ITER],
                kind = iter.k,
                entry = iter.l;
            while (entry && entry.r)
              entry = entry.p;
            if (!iter.o || !(iter.l = entry = entry ? entry.n : iter.o[FIRST])) {
              iter.o = undefined;
              return step(1);
            }
            if (kind == 'key')
              return step(0, entry.k);
            if (kind == 'value')
              return step(0, entry.v);
            return step(0, [entry.k, entry.v]);
          }
        };
      }, {
        "./$": 15,
        "./$.assert": 4,
        "./$.ctx": 10,
        "./$.iter": 14,
        "./$.uid": 24
      }],
      8: [function(require, module, exports) {
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
      }, {
        "./$": 15,
        "./$.array-methods": 3,
        "./$.assert": 4,
        "./$.iter": 14,
        "./$.uid": 24
      }],
      9: [function(require, module, exports) {
        'use strict';
        var $ = require("./$"),
            $def = require("./$.def"),
            $iter = require("./$.iter"),
            assertInstance = require("./$.assert").inst;
        module.exports = function(NAME, methods, common, IS_MAP, isWeak) {
          var Base = $.g[NAME],
              C = Base,
              ADDER = IS_MAP ? 'set' : 'add',
              proto = C && C.prototype,
              O = {};
          function fixMethod(KEY, CHAIN) {
            var method = proto[KEY];
            if ($.FW)
              proto[KEY] = function(a, b) {
                var result = method.call(this, a === 0 ? 0 : a, b);
                return CHAIN ? this : result;
              };
          }
          if (!$.isFunction(C) || !(isWeak || !$iter.BUGGY && proto.forEach && proto.entries)) {
            C = common.getConstructor(NAME, IS_MAP, ADDER);
            $.mix(C.prototype, methods);
          } else {
            var inst = new C,
                chain = inst[ADDER](isWeak ? {} : -0, 1),
                buggyZero;
            if ($iter.fail(function(iter) {
              new C(iter);
            }) || $iter.DANGER_CLOSING) {
              C = function(iterable) {
                assertInstance(this, C, NAME);
                var that = new Base;
                if (iterable != undefined)
                  $iter.forOf(iterable, IS_MAP, that[ADDER], that);
                return that;
              };
              C.prototype = proto;
              if ($.FW)
                proto.constructor = C;
            }
            isWeak || inst.forEach(function(val, key) {
              buggyZero = 1 / key === -Infinity;
            });
            if (buggyZero) {
              fixMethod('delete');
              fixMethod('has');
              IS_MAP && fixMethod('get');
            }
            if (buggyZero || chain !== inst)
              fixMethod(ADDER, true);
          }
          require("./$.cof").set(C, NAME);
          require("./$.species")(C);
          O[NAME] = C;
          $def($def.G + $def.W + $def.F * (C != Base), O);
          if (!isWeak)
            $iter.std(C, NAME, common.getIterConstructor(), common.next, IS_MAP ? 'key+value' : 'value', !IS_MAP, true);
          return C;
        };
      }, {
        "./$": 15,
        "./$.assert": 4,
        "./$.cof": 6,
        "./$.def": 11,
        "./$.iter": 14,
        "./$.species": 21
      }],
      10: [function(require, module, exports) {
        var assertFunction = require("./$.assert").fn;
        module.exports = function(fn, that, length) {
          assertFunction(fn);
          if (~length && that === undefined)
            return fn;
          switch (length) {
            case 1:
              return function(a) {
                return fn.call(that, a);
              };
            case 2:
              return function(a, b) {
                return fn.call(that, a, b);
              };
            case 3:
              return function(a, b, c) {
                return fn.call(that, a, b, c);
              };
          }
          return function() {
            return fn.apply(that, arguments);
          };
        };
      }, {"./$.assert": 4}],
      11: [function(require, module, exports) {
        var $ = require("./$"),
            global = $.g,
            core = $.core,
            isFunction = $.isFunction;
        function ctx(fn, that) {
          return function() {
            return fn.apply(that, arguments);
          };
        }
        global.core = core;
        $def.F = 1;
        $def.G = 2;
        $def.S = 4;
        $def.P = 8;
        $def.B = 16;
        $def.W = 32;
        function $def(type, name, source) {
          var key,
              own,
              out,
              exp,
              isGlobal = type & $def.G,
              target = isGlobal ? global : type & $def.S ? global[name] : (global[name] || {}).prototype,
              exports = isGlobal ? core : core[name] || (core[name] = {});
          if (isGlobal)
            source = name;
          for (key in source) {
            own = !(type & $def.F) && target && key in target;
            out = (own ? target : source)[key];
            if (type & $def.B && own)
              exp = ctx(out, global);
            else
              exp = type & $def.P && isFunction(out) ? ctx(Function.call, out) : out;
            if (target && !own) {
              if (isGlobal)
                target[key] = out;
              else
                delete target[key] && $.hide(target, key, out);
            }
            if (exports[key] != out)
              $.hide(exports, key, exp);
          }
        }
        module.exports = $def;
      }, {"./$": 15}],
      12: [function(require, module, exports) {
        module.exports = function($) {
          $.FW = true;
          $.path = $.g;
          return $;
        };
      }, {}],
      13: [function(require, module, exports) {
        module.exports = function(fn, args, that) {
          var un = that === undefined;
          switch (args.length) {
            case 0:
              return un ? fn() : fn.call(that);
            case 1:
              return un ? fn(args[0]) : fn.call(that, args[0]);
            case 2:
              return un ? fn(args[0], args[1]) : fn.call(that, args[0], args[1]);
            case 3:
              return un ? fn(args[0], args[1], args[2]) : fn.call(that, args[0], args[1], args[2]);
            case 4:
              return un ? fn(args[0], args[1], args[2], args[3]) : fn.call(that, args[0], args[1], args[2], args[3]);
            case 5:
              return un ? fn(args[0], args[1], args[2], args[3], args[4]) : fn.call(that, args[0], args[1], args[2], args[3], args[4]);
          }
          return fn.apply(that, args);
        };
      }, {}],
      14: [function(require, module, exports) {
        'use strict';
        var $ = require("./$"),
            ctx = require("./$.ctx"),
            cof = require("./$.cof"),
            $def = require("./$.def"),
            assertObject = require("./$.assert").obj,
            SYMBOL_ITERATOR = require("./$.wks")('iterator'),
            FF_ITERATOR = '@@iterator',
            Iterators = {},
            IteratorPrototype = {};
        var BUGGY = 'keys' in [] && !('next' in [].keys());
        setIterator(IteratorPrototype, $.that);
        function setIterator(O, value) {
          $.hide(O, SYMBOL_ITERATOR, value);
          if (FF_ITERATOR in [])
            $.hide(O, FF_ITERATOR, value);
        }
        function defineIterator(Constructor, NAME, value, DEFAULT) {
          var proto = Constructor.prototype,
              iter = proto[SYMBOL_ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT] || value;
          if ($.FW)
            setIterator(proto, iter);
          if (iter !== value) {
            var iterProto = $.getProto(iter.call(new Constructor));
            cof.set(iterProto, NAME + ' Iterator', true);
            if ($.FW)
              $.has(proto, FF_ITERATOR) && setIterator(iterProto, $.that);
          }
          Iterators[NAME] = iter;
          Iterators[NAME + ' Iterator'] = $.that;
          return iter;
        }
        function getIterator(it) {
          var Symbol = $.g.Symbol,
              ext = it[Symbol && Symbol.iterator || FF_ITERATOR],
              getIter = ext || it[SYMBOL_ITERATOR] || Iterators[cof.classof(it)];
          return assertObject(getIter.call(it));
        }
        function closeIterator(iterator) {
          var ret = iterator['return'];
          if (ret !== undefined)
            assertObject(ret.call(iterator));
        }
        function stepCall(iterator, fn, value, entries) {
          try {
            return entries ? fn(assertObject(value)[0], value[1]) : fn(value);
          } catch (e) {
            closeIterator(iterator);
            throw e;
          }
        }
        var DANGER_CLOSING = true;
        !function() {
          try {
            var iter = [1].keys();
            iter['return'] = function() {
              DANGER_CLOSING = false;
            };
            Array.from(iter, function() {
              throw 2;
            });
          } catch (e) {}
        }();
        var $iter = module.exports = {
          BUGGY: BUGGY,
          DANGER_CLOSING: DANGER_CLOSING,
          fail: function(exec) {
            var fail = true;
            try {
              var arr = [[{}, 1]],
                  iter = arr[SYMBOL_ITERATOR](),
                  next = iter.next;
              iter.next = function() {
                fail = false;
                return next.call(this);
              };
              arr[SYMBOL_ITERATOR] = function() {
                return iter;
              };
              exec(arr);
            } catch (e) {}
            return fail;
          },
          Iterators: Iterators,
          prototype: IteratorPrototype,
          step: function(done, value) {
            return {
              value: value,
              done: !!done
            };
          },
          stepCall: stepCall,
          close: closeIterator,
          is: function(it) {
            var O = Object(it),
                Symbol = $.g.Symbol,
                SYM = Symbol && Symbol.iterator || FF_ITERATOR;
            return SYM in O || SYMBOL_ITERATOR in O || $.has(Iterators, cof.classof(O));
          },
          get: getIterator,
          set: setIterator,
          create: function(Constructor, NAME, next, proto) {
            Constructor.prototype = $.create(proto || $iter.prototype, {next: $.desc(1, next)});
            cof.set(Constructor, NAME + ' Iterator');
          },
          define: defineIterator,
          std: function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCE) {
            function createIter(kind) {
              return function() {
                return new Constructor(this, kind);
              };
            }
            $iter.create(Constructor, NAME, next);
            var entries = createIter('key+value'),
                values = createIter('value'),
                proto = Base.prototype,
                methods,
                key;
            if (DEFAULT == 'value')
              values = defineIterator(Base, NAME, values, 'values');
            else
              entries = defineIterator(Base, NAME, entries, 'entries');
            if (DEFAULT) {
              methods = {
                entries: entries,
                keys: IS_SET ? values : createIter('key'),
                values: values
              };
              $def($def.P + $def.F * BUGGY, NAME, methods);
              if (FORCE)
                for (key in methods) {
                  if (!(key in proto))
                    $.hide(proto, key, methods[key]);
                }
            }
          },
          forOf: function(iterable, entries, fn, that) {
            var iterator = getIterator(iterable),
                f = ctx(fn, that, entries ? 2 : 1),
                step;
            while (!(step = iterator.next()).done) {
              if (stepCall(iterator, f, step.value, entries) === false) {
                return closeIterator(iterator);
              }
            }
          }
        };
      }, {
        "./$": 15,
        "./$.assert": 4,
        "./$.cof": 6,
        "./$.ctx": 10,
        "./$.def": 11,
        "./$.wks": 26
      }],
      15: [function(require, module, exports) {
        'use strict';
        var global = typeof self != 'undefined' ? self : Function('return this')(),
            core = {},
            defineProperty = Object.defineProperty,
            hasOwnProperty = {}.hasOwnProperty,
            ceil = Math.ceil,
            floor = Math.floor,
            max = Math.max,
            min = Math.min;
        var DESC = !!function() {
          try {
            return defineProperty({}, 'a', {get: function() {
                return 2;
              }}).a == 2;
          } catch (e) {}
        }();
        var hide = createDefiner(1);
        function toInteger(it) {
          return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
        }
        function desc(bitmap, value) {
          return {
            enumerable: !(bitmap & 1),
            configurable: !(bitmap & 2),
            writable: !(bitmap & 4),
            value: value
          };
        }
        function simpleSet(object, key, value) {
          object[key] = value;
          return object;
        }
        function createDefiner(bitmap) {
          return DESC ? function(object, key, value) {
            return $.setDesc(object, key, desc(bitmap, value));
          } : simpleSet;
        }
        function isObject(it) {
          return it !== null && (typeof it == 'object' || typeof it == 'function');
        }
        function isFunction(it) {
          return typeof it == 'function';
        }
        function assertDefined(it) {
          if (it == undefined)
            throw TypeError("Can't call method on  " + it);
          return it;
        }
        var $ = module.exports = require("./$.fw")({
          g: global,
          core: core,
          html: global.document && document.documentElement,
          isObject: isObject,
          isFunction: isFunction,
          it: function(it) {
            return it;
          },
          that: function() {
            return this;
          },
          toInteger: toInteger,
          toLength: function(it) {
            return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0;
          },
          toIndex: function(index, length) {
            index = toInteger(index);
            return index < 0 ? max(index + length, 0) : min(index, length);
          },
          has: function(it, key) {
            return hasOwnProperty.call(it, key);
          },
          create: Object.create,
          getProto: Object.getPrototypeOf,
          DESC: DESC,
          desc: desc,
          getDesc: Object.getOwnPropertyDescriptor,
          setDesc: defineProperty,
          getKeys: Object.keys,
          getNames: Object.getOwnPropertyNames,
          getSymbols: Object.getOwnPropertySymbols,
          assertDefined: assertDefined,
          ES5Object: Object,
          toObject: function(it) {
            return $.ES5Object(assertDefined(it));
          },
          hide: hide,
          def: createDefiner(0),
          set: global.Symbol ? simpleSet : hide,
          mix: function(target, src) {
            for (var key in src)
              hide(target, key, src[key]);
            return target;
          },
          each: [].forEach
        });
        if (typeof __e != 'undefined')
          __e = core;
        if (typeof __g != 'undefined')
          __g = global;
      }, {"./$.fw": 12}],
      16: [function(require, module, exports) {
        var $ = require("./$");
        module.exports = function(object, el) {
          var O = $.toObject(object),
              keys = $.getKeys(O),
              length = keys.length,
              index = 0,
              key;
          while (length > index)
            if (O[key = keys[index++]] === el)
              return key;
        };
      }, {"./$": 15}],
      17: [function(require, module, exports) {
        var $ = require("./$"),
            assertObject = require("./$.assert").obj;
        module.exports = function(it) {
          assertObject(it);
          return $.getSymbols ? $.getNames(it).concat($.getSymbols(it)) : $.getNames(it);
        };
      }, {
        "./$": 15,
        "./$.assert": 4
      }],
      18: [function(require, module, exports) {
        'use strict';
        var $ = require("./$"),
            invoke = require("./$.invoke"),
            assertFunction = require("./$.assert").fn;
        module.exports = function() {
          var fn = assertFunction(this),
              length = arguments.length,
              pargs = Array(length),
              i = 0,
              _ = $.path._,
              holder = false;
          while (length > i)
            if ((pargs[i] = arguments[i++]) === _)
              holder = true;
          return function() {
            var that = this,
                _length = arguments.length,
                j = 0,
                k = 0,
                args;
            if (!holder && !_length)
              return invoke(fn, pargs, that);
            args = pargs.slice();
            if (holder)
              for (; length > j; j++)
                if (args[j] === _)
                  args[j] = arguments[k++];
            while (_length > k)
              args.push(arguments[k++]);
            return invoke(fn, args, that);
          };
        };
      }, {
        "./$": 15,
        "./$.assert": 4,
        "./$.invoke": 13
      }],
      19: [function(require, module, exports) {
        'use strict';
        module.exports = function(regExp, replace, isStatic) {
          var replacer = replace === Object(replace) ? function(part) {
            return replace[part];
          } : replace;
          return function(it) {
            return String(isStatic ? it : this).replace(regExp, replacer);
          };
        };
      }, {}],
      20: [function(require, module, exports) {
        var $ = require("./$"),
            assert = require("./$.assert");
        module.exports = Object.setPrototypeOf || ('__proto__' in {} ? function(buggy, set) {
          try {
            set = require("./$.ctx")(Function.call, $.getDesc(Object.prototype, '__proto__').set, 2);
            set({}, []);
          } catch (e) {
            buggy = true;
          }
          return function(O, proto) {
            assert.obj(O);
            assert(proto === null || $.isObject(proto), proto, ": can't set as prototype!");
            if (buggy)
              O.__proto__ = proto;
            else
              set(O, proto);
            return O;
          };
        }() : undefined);
      }, {
        "./$": 15,
        "./$.assert": 4,
        "./$.ctx": 10
      }],
      21: [function(require, module, exports) {
        var $ = require("./$");
        module.exports = function(C) {
          if ($.DESC && $.FW)
            $.setDesc(C, require("./$.wks")('species'), {
              configurable: true,
              get: $.that
            });
        };
      }, {
        "./$": 15,
        "./$.wks": 26
      }],
      22: [function(require, module, exports) {
        'use strict';
        var $ = require("./$");
        module.exports = function(TO_STRING) {
          return function(pos) {
            var s = String($.assertDefined(this)),
                i = $.toInteger(pos),
                l = s.length,
                a,
                b;
            if (i < 0 || i >= l)
              return TO_STRING ? '' : undefined;
            a = s.charCodeAt(i);
            return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff ? TO_STRING ? s.charAt(i) : a : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
          };
        };
      }, {"./$": 15}],
      23: [function(require, module, exports) {
        'use strict';
        var $ = require("./$"),
            ctx = require("./$.ctx"),
            cof = require("./$.cof"),
            invoke = require("./$.invoke"),
            global = $.g,
            isFunction = $.isFunction,
            setTask = global.setImmediate,
            clearTask = global.clearImmediate,
            postMessage = global.postMessage,
            addEventListener = global.addEventListener,
            MessageChannel = global.MessageChannel,
            counter = 0,
            queue = {},
            ONREADYSTATECHANGE = 'onreadystatechange',
            defer,
            channel,
            port;
        function run() {
          var id = +this;
          if ($.has(queue, id)) {
            var fn = queue[id];
            delete queue[id];
            fn();
          }
        }
        function listner(event) {
          run.call(event.data);
        }
        if (!isFunction(setTask) || !isFunction(clearTask)) {
          setTask = function(fn) {
            var args = [],
                i = 1;
            while (arguments.length > i)
              args.push(arguments[i++]);
            queue[++counter] = function() {
              invoke(isFunction(fn) ? fn : Function(fn), args);
            };
            defer(counter);
            return counter;
          };
          clearTask = function(id) {
            delete queue[id];
          };
          if (cof(global.process) == 'process') {
            defer = function(id) {
              global.process.nextTick(ctx(run, id, 1));
            };
          } else if (addEventListener && isFunction(postMessage) && !$.g.importScripts) {
            defer = function(id) {
              postMessage(id, '*');
            };
            addEventListener('message', listner, false);
          } else if (isFunction(MessageChannel)) {
            channel = new MessageChannel;
            port = channel.port2;
            channel.port1.onmessage = listner;
            defer = ctx(port.postMessage, port, 1);
          } else if ($.g.document && ONREADYSTATECHANGE in document.createElement('script')) {
            defer = function(id) {
              $.html.appendChild(document.createElement('script'))[ONREADYSTATECHANGE] = function() {
                $.html.removeChild(this);
                run.call(id);
              };
            };
          } else {
            defer = function(id) {
              setTimeout(ctx(run, id, 1), 0);
            };
          }
        }
        module.exports = {
          set: setTask,
          clear: clearTask
        };
      }, {
        "./$": 15,
        "./$.cof": 6,
        "./$.ctx": 10,
        "./$.invoke": 13
      }],
      24: [function(require, module, exports) {
        var sid = 0;
        function uid(key) {
          return 'Symbol(' + key + ')_' + (++sid + Math.random()).toString(36);
        }
        uid.safe = require("./$").g.Symbol || uid;
        module.exports = uid;
      }, {"./$": 15}],
      25: [function(require, module, exports) {
        var $ = require("./$"),
            UNSCOPABLES = require("./$.wks")('unscopables');
        if ($.FW && !(UNSCOPABLES in []))
          $.hide(Array.prototype, UNSCOPABLES, {});
        module.exports = function(key) {
          if ($.FW)
            [][UNSCOPABLES][key] = true;
        };
      }, {
        "./$": 15,
        "./$.wks": 26
      }],
      26: [function(require, module, exports) {
        var global = require("./$").g,
            store = {};
        module.exports = function(name) {
          return store[name] || (store[name] = global.Symbol && global.Symbol[name] || require("./$.uid").safe('Symbol.' + name));
        };
      }, {
        "./$": 15,
        "./$.uid": 24
      }],
      27: [function(require, module, exports) {
        var $ = require("./$"),
            cof = require("./$.cof"),
            $def = require("./$.def"),
            invoke = require("./$.invoke"),
            arrayMethod = require("./$.array-methods"),
            IE_PROTO = require("./$.uid").safe('__proto__'),
            assert = require("./$.assert"),
            assertObject = assert.obj,
            ObjectProto = Object.prototype,
            A = [],
            slice = A.slice,
            indexOf = A.indexOf,
            classof = cof.classof,
            defineProperties = Object.defineProperties,
            has = $.has,
            defineProperty = $.setDesc,
            getOwnDescriptor = $.getDesc,
            isFunction = $.isFunction,
            toObject = $.toObject,
            toLength = $.toLength,
            IE8_DOM_DEFINE = false;
        if (!$.DESC) {
          try {
            IE8_DOM_DEFINE = defineProperty(document.createElement('div'), 'x', {get: function() {
                return 8;
              }}).x == 8;
          } catch (e) {}
          $.setDesc = function(O, P, Attributes) {
            if (IE8_DOM_DEFINE)
              try {
                return defineProperty(O, P, Attributes);
              } catch (e) {}
            if ('get' in Attributes || 'set' in Attributes)
              throw TypeError('Accessors not supported!');
            if ('value' in Attributes)
              assertObject(O)[P] = Attributes.value;
            return O;
          };
          $.getDesc = function(O, P) {
            if (IE8_DOM_DEFINE)
              try {
                return getOwnDescriptor(O, P);
              } catch (e) {}
            if (has(O, P))
              return $.desc(!ObjectProto.propertyIsEnumerable.call(O, P), O[P]);
          };
          defineProperties = function(O, Properties) {
            assertObject(O);
            var keys = $.getKeys(Properties),
                length = keys.length,
                i = 0,
                P;
            while (length > i)
              $.setDesc(O, P = keys[i++], Properties[P]);
            return O;
          };
        }
        $def($def.S + $def.F * !$.DESC, 'Object', {
          getOwnPropertyDescriptor: $.getDesc,
          defineProperty: $.setDesc,
          defineProperties: defineProperties
        });
        var keys1 = ('constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,' + 'toLocaleString,toString,valueOf').split(','),
            keys2 = keys1.concat('length', 'prototype'),
            keysLen1 = keys1.length;
        var createDict = function() {
          var iframe = document.createElement('iframe'),
              i = keysLen1,
              iframeDocument;
          iframe.style.display = 'none';
          $.html.appendChild(iframe);
          iframe.src = 'javascript:';
          iframeDocument = iframe.contentWindow.document;
          iframeDocument.open();
          iframeDocument.write('<script>document.F=Object</script>');
          iframeDocument.close();
          createDict = iframeDocument.F;
          while (i--)
            delete createDict.prototype[keys1[i]];
          return createDict();
        };
        function createGetKeys(names, length) {
          return function(object) {
            var O = toObject(object),
                i = 0,
                result = [],
                key;
            for (key in O)
              if (key != IE_PROTO)
                has(O, key) && result.push(key);
            while (length > i)
              if (has(O, key = names[i++])) {
                ~indexOf.call(result, key) || result.push(key);
              }
            return result;
          };
        }
        function isPrimitive(it) {
          return !$.isObject(it);
        }
        function Empty() {}
        $def($def.S, 'Object', {
          getPrototypeOf: $.getProto = $.getProto || function(O) {
            O = Object(assert.def(O));
            if (has(O, IE_PROTO))
              return O[IE_PROTO];
            if (isFunction(O.constructor) && O instanceof O.constructor) {
              return O.constructor.prototype;
            }
            return O instanceof Object ? ObjectProto : null;
          },
          getOwnPropertyNames: $.getNames = $.getNames || createGetKeys(keys2, keys2.length, true),
          create: $.create = $.create || function(O, Properties) {
            var result;
            if (O !== null) {
              Empty.prototype = assertObject(O);
              result = new Empty();
              Empty.prototype = null;
              result[IE_PROTO] = O;
            } else
              result = createDict();
            return Properties === undefined ? result : defineProperties(result, Properties);
          },
          keys: $.getKeys = $.getKeys || createGetKeys(keys1, keysLen1, false),
          seal: $.it,
          freeze: $.it,
          preventExtensions: $.it,
          isSealed: isPrimitive,
          isFrozen: isPrimitive,
          isExtensible: $.isObject
        });
        $def($def.P, 'Function', {bind: function(that) {
            var fn = assert.fn(this),
                partArgs = slice.call(arguments, 1);
            function bound() {
              var args = partArgs.concat(slice.call(arguments));
              return invoke(fn, args, this instanceof bound ? $.create(fn.prototype) : that);
            }
            if (fn.prototype)
              bound.prototype = fn.prototype;
            return bound;
          }});
        function arrayMethodFix(fn) {
          return function() {
            return fn.apply($.ES5Object(this), arguments);
          };
        }
        if (!(0 in Object('z') && 'z'[0] == 'z')) {
          $.ES5Object = function(it) {
            return cof(it) == 'String' ? it.split('') : Object(it);
          };
        }
        $def($def.P + $def.F * ($.ES5Object != Object), 'Array', {
          slice: arrayMethodFix(slice),
          join: arrayMethodFix(A.join)
        });
        $def($def.S, 'Array', {isArray: function(arg) {
            return cof(arg) == 'Array';
          }});
        function createArrayReduce(isRight) {
          return function(callbackfn, memo) {
            assert.fn(callbackfn);
            var O = toObject(this),
                length = toLength(O.length),
                index = isRight ? length - 1 : 0,
                i = isRight ? -1 : 1;
            if (arguments.length < 2)
              for (; ; ) {
                if (index in O) {
                  memo = O[index];
                  index += i;
                  break;
                }
                index += i;
                assert(isRight ? index >= 0 : length > index, 'Reduce of empty array with no initial value');
              }
            for (; isRight ? index >= 0 : length > index; index += i)
              if (index in O) {
                memo = callbackfn(memo, O[index], index, this);
              }
            return memo;
          };
        }
        $def($def.P, 'Array', {
          forEach: $.each = $.each || arrayMethod(0),
          map: arrayMethod(1),
          filter: arrayMethod(2),
          some: arrayMethod(3),
          every: arrayMethod(4),
          reduce: createArrayReduce(false),
          reduceRight: createArrayReduce(true),
          indexOf: indexOf = indexOf || require("./$.array-includes")(false),
          lastIndexOf: function(el, fromIndex) {
            var O = toObject(this),
                length = toLength(O.length),
                index = length - 1;
            if (arguments.length > 1)
              index = Math.min(index, $.toInteger(fromIndex));
            if (index < 0)
              index = toLength(length + index);
            for (; index >= 0; index--)
              if (index in O)
                if (O[index] === el)
                  return index;
            return -1;
          }
        });
        $def($def.P, 'String', {trim: require("./$.replacer")(/^\s*([\s\S]*\S)?\s*$/, '$1')});
        $def($def.S, 'Date', {now: function() {
            return +new Date;
          }});
        function lz(num) {
          return num > 9 ? num : '0' + num;
        }
        $def($def.P, 'Date', {toISOString: function() {
            if (!isFinite(this))
              throw RangeError('Invalid time value');
            var d = this,
                y = d.getUTCFullYear(),
                m = d.getUTCMilliseconds(),
                s = y < 0 ? '-' : y > 9999 ? '+' : '';
            return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) + '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) + 'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) + ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
          }});
        if (classof(function() {
          return arguments;
        }()) == 'Object')
          cof.classof = function(it) {
            var tag = classof(it);
            return tag == 'Object' && isFunction(it.callee) ? 'Arguments' : tag;
          };
      }, {
        "./$": 15,
        "./$.array-includes": 2,
        "./$.array-methods": 3,
        "./$.assert": 4,
        "./$.cof": 6,
        "./$.def": 11,
        "./$.invoke": 13,
        "./$.replacer": 19,
        "./$.uid": 24
      }],
      28: [function(require, module, exports) {
        'use strict';
        var $ = require("./$"),
            $def = require("./$.def"),
            toIndex = $.toIndex;
        $def($def.P, 'Array', {copyWithin: function(target, start) {
            var O = Object($.assertDefined(this)),
                len = $.toLength(O.length),
                to = toIndex(target, len),
                from = toIndex(start, len),
                end = arguments[2],
                fin = end === undefined ? len : toIndex(end, len),
                count = Math.min(fin - from, len - to),
                inc = 1;
            if (from < to && to < from + count) {
              inc = -1;
              from = from + count - 1;
              to = to + count - 1;
            }
            while (count-- > 0) {
              if (from in O)
                O[to] = O[from];
              else
                delete O[to];
              to += inc;
              from += inc;
            }
            return O;
          }});
        require("./$.unscope")('copyWithin');
      }, {
        "./$": 15,
        "./$.def": 11,
        "./$.unscope": 25
      }],
      29: [function(require, module, exports) {
        'use strict';
        var $ = require("./$"),
            $def = require("./$.def"),
            toIndex = $.toIndex;
        $def($def.P, 'Array', {fill: function(value) {
            var O = Object($.assertDefined(this)),
                length = $.toLength(O.length),
                index = toIndex(arguments[1], length),
                end = arguments[2],
                endPos = end === undefined ? length : toIndex(end, length);
            while (endPos > index)
              O[index++] = value;
            return O;
          }});
        require("./$.unscope")('fill');
      }, {
        "./$": 15,
        "./$.def": 11,
        "./$.unscope": 25
      }],
      30: [function(require, module, exports) {
        var $def = require("./$.def");
        $def($def.P, 'Array', {findIndex: require("./$.array-methods")(6)});
        require("./$.unscope")('findIndex');
      }, {
        "./$.array-methods": 3,
        "./$.def": 11,
        "./$.unscope": 25
      }],
      31: [function(require, module, exports) {
        var $def = require("./$.def");
        $def($def.P, 'Array', {find: require("./$.array-methods")(5)});
        require("./$.unscope")('find');
      }, {
        "./$.array-methods": 3,
        "./$.def": 11,
        "./$.unscope": 25
      }],
      32: [function(require, module, exports) {
        var $ = require("./$"),
            ctx = require("./$.ctx"),
            $def = require("./$.def"),
            $iter = require("./$.iter"),
            stepCall = $iter.stepCall;
        $def($def.S + $def.F * $iter.DANGER_CLOSING, 'Array', {from: function(arrayLike) {
            var O = Object($.assertDefined(arrayLike)),
                mapfn = arguments[1],
                mapping = mapfn !== undefined,
                f = mapping ? ctx(mapfn, arguments[2], 2) : undefined,
                index = 0,
                length,
                result,
                step,
                iterator;
            if ($iter.is(O)) {
              iterator = $iter.get(O);
              result = new (typeof this == 'function' ? this : Array);
              for (; !(step = iterator.next()).done; index++) {
                result[index] = mapping ? stepCall(iterator, f, [step.value, index], true) : step.value;
              }
            } else {
              result = new (typeof this == 'function' ? this : Array)(length = $.toLength(O.length));
              for (; length > index; index++) {
                result[index] = mapping ? f(O[index], index) : O[index];
              }
            }
            result.length = index;
            return result;
          }});
      }, {
        "./$": 15,
        "./$.ctx": 10,
        "./$.def": 11,
        "./$.iter": 14
      }],
      33: [function(require, module, exports) {
        var $ = require("./$"),
            setUnscope = require("./$.unscope"),
            ITER = require("./$.uid").safe('iter'),
            $iter = require("./$.iter"),
            step = $iter.step,
            Iterators = $iter.Iterators;
        $iter.std(Array, 'Array', function(iterated, kind) {
          $.set(this, ITER, {
            o: $.toObject(iterated),
            i: 0,
            k: kind
          });
        }, function() {
          var iter = this[ITER],
              O = iter.o,
              kind = iter.k,
              index = iter.i++;
          if (!O || index >= O.length) {
            iter.o = undefined;
            return step(1);
          }
          if (kind == 'key')
            return step(0, index);
          if (kind == 'value')
            return step(0, O[index]);
          return step(0, [index, O[index]]);
        }, 'value');
        Iterators.Arguments = Iterators.Array;
        setUnscope('keys');
        setUnscope('values');
        setUnscope('entries');
      }, {
        "./$": 15,
        "./$.iter": 14,
        "./$.uid": 24,
        "./$.unscope": 25
      }],
      34: [function(require, module, exports) {
        var $def = require("./$.def");
        $def($def.S, 'Array', {of: function() {
            var index = 0,
                length = arguments.length,
                result = new (typeof this == 'function' ? this : Array)(length);
            while (length > index)
              result[index] = arguments[index++];
            result.length = length;
            return result;
          }});
      }, {"./$.def": 11}],
      35: [function(require, module, exports) {
        require("./$.species")(Array);
      }, {"./$.species": 21}],
      36: [function(require, module, exports) {
        'use strict';
        var $ = require("./$"),
            NAME = 'name',
            setDesc = $.setDesc,
            FunctionProto = Function.prototype;
        NAME in FunctionProto || $.FW && $.DESC && setDesc(FunctionProto, NAME, {
          configurable: true,
          get: function() {
            var match = String(this).match(/^\s*function ([^ (]*)/),
                name = match ? match[1] : '';
            $.has(this, NAME) || setDesc(this, NAME, $.desc(5, name));
            return name;
          },
          set: function(value) {
            $.has(this, NAME) || setDesc(this, NAME, $.desc(0, value));
          }
        });
      }, {"./$": 15}],
      37: [function(require, module, exports) {
        'use strict';
        var strong = require("./$.collection-strong");
        require("./$.collection")('Map', {
          get: function(key) {
            var entry = strong.getEntry(this, key);
            return entry && entry.v;
          },
          set: function(key, value) {
            return strong.def(this, key === 0 ? 0 : key, value);
          }
        }, strong, true);
      }, {
        "./$.collection": 9,
        "./$.collection-strong": 7
      }],
      38: [function(require, module, exports) {
        var Infinity = 1 / 0,
            $def = require("./$.def"),
            E = Math.E,
            pow = Math.pow,
            abs = Math.abs,
            exp = Math.exp,
            log = Math.log,
            sqrt = Math.sqrt,
            ceil = Math.ceil,
            floor = Math.floor,
            sign = Math.sign || function(x) {
              return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
            };
        function asinh(x) {
          return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : log(x + sqrt(x * x + 1));
        }
        function expm1(x) {
          return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : exp(x) - 1;
        }
        $def($def.S, 'Math', {
          acosh: function(x) {
            return (x = +x) < 1 ? NaN : isFinite(x) ? log(x / E + sqrt(x + 1) * sqrt(x - 1) / E) + 1 : x;
          },
          asinh: asinh,
          atanh: function(x) {
            return (x = +x) == 0 ? x : log((1 + x) / (1 - x)) / 2;
          },
          cbrt: function(x) {
            return sign(x = +x) * pow(abs(x), 1 / 3);
          },
          clz32: function(x) {
            return (x >>>= 0) ? 32 - x.toString(2).length : 32;
          },
          cosh: function(x) {
            return (exp(x = +x) + exp(-x)) / 2;
          },
          expm1: expm1,
          fround: function(x) {
            return new Float32Array([x])[0];
          },
          hypot: function(value1, value2) {
            var sum = 0,
                len1 = arguments.length,
                len2 = len1,
                args = Array(len1),
                larg = -Infinity,
                arg;
            while (len1--) {
              arg = args[len1] = +arguments[len1];
              if (arg == Infinity || arg == -Infinity)
                return Infinity;
              if (arg > larg)
                larg = arg;
            }
            larg = arg || 1;
            while (len2--)
              sum += pow(args[len2] / larg, 2);
            return larg * sqrt(sum);
          },
          imul: function(x, y) {
            var UInt16 = 0xffff,
                xn = +x,
                yn = +y,
                xl = UInt16 & xn,
                yl = UInt16 & yn;
            return 0 | xl * yl + ((UInt16 & xn >>> 16) * yl + xl * (UInt16 & yn >>> 16) << 16 >>> 0);
          },
          log1p: function(x) {
            return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : log(1 + x);
          },
          log10: function(x) {
            return log(x) / Math.LN10;
          },
          log2: function(x) {
            return log(x) / Math.LN2;
          },
          sign: sign,
          sinh: function(x) {
            return abs(x = +x) < 1 ? (expm1(x) - expm1(-x)) / 2 : (exp(x - 1) - exp(-x - 1)) * (E / 2);
          },
          tanh: function(x) {
            var a = expm1(x = +x),
                b = expm1(-x);
            return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
          },
          trunc: function(it) {
            return (it > 0 ? floor : ceil)(it);
          }
        });
      }, {"./$.def": 11}],
      39: [function(require, module, exports) {
        'use strict';
        var $ = require("./$"),
            isObject = $.isObject,
            isFunction = $.isFunction,
            NUMBER = 'Number',
            Number = $.g[NUMBER],
            Base = Number,
            proto = Number.prototype;
        function toPrimitive(it) {
          var fn,
              val;
          if (isFunction(fn = it.valueOf) && !isObject(val = fn.call(it)))
            return val;
          if (isFunction(fn = it.toString) && !isObject(val = fn.call(it)))
            return val;
          throw TypeError("Can't convert object to number");
        }
        function toNumber(it) {
          if (isObject(it))
            it = toPrimitive(it);
          if (typeof it == 'string' && it.length > 2 && it.charCodeAt(0) == 48) {
            var binary = false;
            switch (it.charCodeAt(1)) {
              case 66:
              case 98:
                binary = true;
              case 79:
              case 111:
                return parseInt(it.slice(2), binary ? 2 : 8);
            }
          }
          return +it;
        }
        if ($.FW && !(Number('0o1') && Number('0b1'))) {
          Number = function Number(it) {
            return this instanceof Number ? new Base(toNumber(it)) : toNumber(it);
          };
          $.each.call($.DESC ? $.getNames(Base) : ('MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' + 'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' + 'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger').split(','), function(key) {
            if ($.has(Base, key) && !$.has(Number, key)) {
              $.setDesc(Number, key, $.getDesc(Base, key));
            }
          });
          Number.prototype = proto;
          proto.constructor = Number;
          $.hide($.g, NUMBER, Number);
        }
      }, {"./$": 15}],
      40: [function(require, module, exports) {
        var $ = require("./$"),
            $def = require("./$.def"),
            abs = Math.abs,
            floor = Math.floor,
            MAX_SAFE_INTEGER = 0x1fffffffffffff;
        function isInteger(it) {
          return !$.isObject(it) && isFinite(it) && floor(it) === it;
        }
        $def($def.S, 'Number', {
          EPSILON: Math.pow(2, -52),
          isFinite: function(it) {
            return typeof it == 'number' && isFinite(it);
          },
          isInteger: isInteger,
          isNaN: function(number) {
            return number != number;
          },
          isSafeInteger: function(number) {
            return isInteger(number) && abs(number) <= MAX_SAFE_INTEGER;
          },
          MAX_SAFE_INTEGER: MAX_SAFE_INTEGER,
          MIN_SAFE_INTEGER: -MAX_SAFE_INTEGER,
          parseFloat: parseFloat,
          parseInt: parseInt
        });
      }, {
        "./$": 15,
        "./$.def": 11
      }],
      41: [function(require, module, exports) {
        var $def = require("./$.def");
        $def($def.S, 'Object', {assign: require("./$.assign")});
      }, {
        "./$.assign": 5,
        "./$.def": 11
      }],
      42: [function(require, module, exports) {
        var $def = require("./$.def");
        $def($def.S, 'Object', {is: function(x, y) {
            return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
          }});
      }, {"./$.def": 11}],
      43: [function(require, module, exports) {
        var $def = require("./$.def");
        $def($def.S, 'Object', {setPrototypeOf: require("./$.set-proto")});
      }, {
        "./$.def": 11,
        "./$.set-proto": 20
      }],
      44: [function(require, module, exports) {
        var $ = require("./$"),
            $def = require("./$.def"),
            isObject = $.isObject,
            toObject = $.toObject;
        function wrapObjectMethod(METHOD, MODE) {
          var fn = ($.core.Object || {})[METHOD] || Object[METHOD],
              f = 0,
              o = {};
          o[METHOD] = MODE == 1 ? function(it) {
            return isObject(it) ? fn(it) : it;
          } : MODE == 2 ? function(it) {
            return isObject(it) ? fn(it) : true;
          } : MODE == 3 ? function(it) {
            return isObject(it) ? fn(it) : false;
          } : MODE == 4 ? function(it, key) {
            return fn(toObject(it), key);
          } : MODE == 5 ? function(it) {
            return fn(Object($.assertDefined(it)));
          } : function(it) {
            return fn(toObject(it));
          };
          try {
            fn('z');
          } catch (e) {
            f = 1;
          }
          $def($def.S + $def.F * f, 'Object', o);
        }
        wrapObjectMethod('freeze', 1);
        wrapObjectMethod('seal', 1);
        wrapObjectMethod('preventExtensions', 1);
        wrapObjectMethod('isFrozen', 2);
        wrapObjectMethod('isSealed', 2);
        wrapObjectMethod('isExtensible', 3);
        wrapObjectMethod('getOwnPropertyDescriptor', 4);
        wrapObjectMethod('getPrototypeOf', 5);
        wrapObjectMethod('keys');
        wrapObjectMethod('getOwnPropertyNames');
      }, {
        "./$": 15,
        "./$.def": 11
      }],
      45: [function(require, module, exports) {
        'use strict';
        var $ = require("./$"),
            cof = require("./$.cof"),
            tmp = {};
        tmp[require("./$.wks")('toStringTag')] = 'z';
        if ($.FW && cof(tmp) != 'z')
          $.hide(Object.prototype, 'toString', function() {
            return '[object ' + cof.classof(this) + ']';
          });
      }, {
        "./$": 15,
        "./$.cof": 6,
        "./$.wks": 26
      }],
      46: [function(require, module, exports) {
        'use strict';
        var $ = require("./$"),
            ctx = require("./$.ctx"),
            cof = require("./$.cof"),
            $def = require("./$.def"),
            assert = require("./$.assert"),
            $iter = require("./$.iter"),
            SPECIES = require("./$.wks")('species'),
            RECORD = require("./$.uid").safe('record'),
            forOf = $iter.forOf,
            PROMISE = 'Promise',
            global = $.g,
            process = global.process,
            asap = process && process.nextTick || require("./$.task").set,
            Promise = global[PROMISE],
            Base = Promise,
            isFunction = $.isFunction,
            isObject = $.isObject,
            assertFunction = assert.fn,
            assertObject = assert.obj,
            test;
        function getConstructor(C) {
          var S = assertObject(C)[SPECIES];
          return S != undefined ? S : C;
        }
        isFunction(Promise) && isFunction(Promise.resolve) && Promise.resolve(test = new Promise(function() {})) == test || function() {
          function isThenable(it) {
            var then;
            if (isObject(it))
              then = it.then;
            return isFunction(then) ? then : false;
          }
          function handledRejectionOrHasOnRejected(promise) {
            var record = promise[RECORD],
                chain = record.c,
                i = 0,
                react;
            if (record.h)
              return true;
            while (chain.length > i) {
              react = chain[i++];
              if (react.fail || handledRejectionOrHasOnRejected(react.P))
                return true;
            }
          }
          function notify(record, isReject) {
            var chain = record.c;
            if (isReject || chain.length)
              asap(function() {
                var promise = record.p,
                    value = record.v,
                    ok = record.s == 1,
                    i = 0;
                if (isReject && !handledRejectionOrHasOnRejected(promise)) {
                  setTimeout(function() {
                    if (!handledRejectionOrHasOnRejected(promise)) {
                      if (cof(process) == 'process') {
                        process.emit('unhandledRejection', value, promise);
                      } else if (global.console && isFunction(console.error)) {
                        console.error('Unhandled promise rejection', value);
                      }
                    }
                  }, 1e3);
                } else
                  while (chain.length > i)
                    !function(react) {
                      var cb = ok ? react.ok : react.fail,
                          ret,
                          then;
                      try {
                        if (cb) {
                          if (!ok)
                            record.h = true;
                          ret = cb === true ? value : cb(value);
                          if (ret === react.P) {
                            react.rej(TypeError(PROMISE + '-chain cycle'));
                          } else if (then = isThenable(ret)) {
                            then.call(ret, react.res, react.rej);
                          } else
                            react.res(ret);
                        } else
                          react.rej(value);
                      } catch (err) {
                        react.rej(err);
                      }
                    }(chain[i++]);
                chain.length = 0;
              });
          }
          function reject(value) {
            var record = this;
            if (record.d)
              return ;
            record.d = true;
            record = record.r || record;
            record.v = value;
            record.s = 2;
            notify(record, true);
          }
          function resolve(value) {
            var record = this,
                then,
                wrapper;
            if (record.d)
              return ;
            record.d = true;
            record = record.r || record;
            try {
              if (then = isThenable(value)) {
                wrapper = {
                  r: record,
                  d: false
                };
                then.call(value, ctx(resolve, wrapper, 1), ctx(reject, wrapper, 1));
              } else {
                record.v = value;
                record.s = 1;
                notify(record);
              }
            } catch (err) {
              reject.call(wrapper || {
                r: record,
                d: false
              }, err);
            }
          }
          Promise = function(executor) {
            assertFunction(executor);
            var record = {
              p: assert.inst(this, Promise, PROMISE),
              c: [],
              s: 0,
              d: false,
              v: undefined,
              h: false
            };
            $.hide(this, RECORD, record);
            try {
              executor(ctx(resolve, record, 1), ctx(reject, record, 1));
            } catch (err) {
              reject.call(record, err);
            }
          };
          $.mix(Promise.prototype, {
            then: function(onFulfilled, onRejected) {
              var S = assertObject(assertObject(this).constructor)[SPECIES];
              var react = {
                ok: isFunction(onFulfilled) ? onFulfilled : true,
                fail: isFunction(onRejected) ? onRejected : false
              };
              var P = react.P = new (S != undefined ? S : Promise)(function(res, rej) {
                react.res = assertFunction(res);
                react.rej = assertFunction(rej);
              });
              var record = this[RECORD];
              record.c.push(react);
              record.s && notify(record);
              return P;
            },
            'catch': function(onRejected) {
              return this.then(undefined, onRejected);
            }
          });
        }();
        $def($def.G + $def.W + $def.F * (Promise != Base), {Promise: Promise});
        $def($def.S, PROMISE, {
          reject: function(r) {
            return new (getConstructor(this))(function(res, rej) {
              rej(r);
            });
          },
          resolve: function(x) {
            return isObject(x) && RECORD in x && $.getProto(x) === this.prototype ? x : new (getConstructor(this))(function(res) {
              res(x);
            });
          }
        });
        $def($def.S + $def.F * ($iter.fail(function(iter) {
          Promise.all(iter)['catch'](function() {});
        }) || $iter.DANGER_CLOSING), PROMISE, {
          all: function(iterable) {
            var C = getConstructor(this),
                values = [];
            return new C(function(resolve, reject) {
              forOf(iterable, false, values.push, values);
              var remaining = values.length,
                  results = Array(remaining);
              if (remaining)
                $.each.call(values, function(promise, index) {
                  C.resolve(promise).then(function(value) {
                    results[index] = value;
                    --remaining || resolve(results);
                  }, reject);
                });
              else
                resolve(results);
            });
          },
          race: function(iterable) {
            var C = getConstructor(this);
            return new C(function(resolve, reject) {
              forOf(iterable, false, function(promise) {
                C.resolve(promise).then(resolve, reject);
              });
            });
          }
        });
        cof.set(Promise, PROMISE);
        require("./$.species")(Promise);
      }, {
        "./$": 15,
        "./$.assert": 4,
        "./$.cof": 6,
        "./$.ctx": 10,
        "./$.def": 11,
        "./$.iter": 14,
        "./$.species": 21,
        "./$.task": 23,
        "./$.uid": 24,
        "./$.wks": 26
      }],
      47: [function(require, module, exports) {
        var $ = require("./$"),
            $def = require("./$.def"),
            setProto = require("./$.set-proto"),
            $iter = require("./$.iter"),
            ITER = require("./$.uid").safe('iter'),
            step = $iter.step,
            assert = require("./$.assert"),
            isObject = $.isObject,
            getDesc = $.getDesc,
            setDesc = $.setDesc,
            getProto = $.getProto,
            apply = Function.apply,
            assertObject = assert.obj,
            isExtensible = Object.isExtensible || $.it;
        function Enumerate(iterated) {
          var keys = [],
              key;
          for (key in iterated)
            keys.push(key);
          $.set(this, ITER, {
            o: iterated,
            a: keys,
            i: 0
          });
        }
        $iter.create(Enumerate, 'Object', function() {
          var iter = this[ITER],
              keys = iter.a,
              key;
          do {
            if (iter.i >= keys.length)
              return step(1);
          } while (!((key = keys[iter.i++]) in iter.o));
          return step(0, key);
        });
        function wrap(fn) {
          return function(it) {
            assertObject(it);
            try {
              fn.apply(undefined, arguments);
              return true;
            } catch (e) {
              return false;
            }
          };
        }
        function reflectGet(target, propertyKey) {
          var receiver = arguments.length < 3 ? target : arguments[2],
              desc = getDesc(assertObject(target), propertyKey),
              proto;
          if (desc)
            return $.has(desc, 'value') ? desc.value : desc.get === undefined ? undefined : desc.get.call(receiver);
          return isObject(proto = getProto(target)) ? reflectGet(proto, propertyKey, receiver) : undefined;
        }
        function reflectSet(target, propertyKey, V) {
          var receiver = arguments.length < 4 ? target : arguments[3],
              ownDesc = getDesc(assertObject(target), propertyKey),
              existingDescriptor,
              proto;
          if (!ownDesc) {
            if (isObject(proto = getProto(target))) {
              return reflectSet(proto, propertyKey, V, receiver);
            }
            ownDesc = $.desc(0);
          }
          if ($.has(ownDesc, 'value')) {
            if (ownDesc.writable === false || !isObject(receiver))
              return false;
            existingDescriptor = getDesc(receiver, propertyKey) || $.desc(0);
            existingDescriptor.value = V;
            setDesc(receiver, propertyKey, existingDescriptor);
            return true;
          }
          return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
        }
        var reflect = {
          apply: require("./$.ctx")(Function.call, apply, 3),
          construct: function(target, argumentsList) {
            var proto = assert.fn(arguments.length < 3 ? target : arguments[2]).prototype,
                instance = $.create(isObject(proto) ? proto : Object.prototype),
                result = apply.call(target, instance, argumentsList);
            return isObject(result) ? result : instance;
          },
          defineProperty: wrap(setDesc),
          deleteProperty: function(target, propertyKey) {
            var desc = getDesc(assertObject(target), propertyKey);
            return desc && !desc.configurable ? false : delete target[propertyKey];
          },
          enumerate: function(target) {
            return new Enumerate(assertObject(target));
          },
          get: reflectGet,
          getOwnPropertyDescriptor: function(target, propertyKey) {
            return getDesc(assertObject(target), propertyKey);
          },
          getPrototypeOf: function(target) {
            return getProto(assertObject(target));
          },
          has: function(target, propertyKey) {
            return propertyKey in target;
          },
          isExtensible: function(target) {
            return !!isExtensible(assertObject(target));
          },
          ownKeys: require("./$.own-keys"),
          preventExtensions: wrap(Object.preventExtensions || $.it),
          set: reflectSet
        };
        if (setProto)
          reflect.setPrototypeOf = function(target, proto) {
            setProto(assertObject(target), proto);
            return true;
          };
        $def($def.G, {Reflect: {}});
        $def($def.S, 'Reflect', reflect);
      }, {
        "./$": 15,
        "./$.assert": 4,
        "./$.ctx": 10,
        "./$.def": 11,
        "./$.iter": 14,
        "./$.own-keys": 17,
        "./$.set-proto": 20,
        "./$.uid": 24
      }],
      48: [function(require, module, exports) {
        var $ = require("./$"),
            cof = require("./$.cof"),
            RegExp = $.g.RegExp,
            Base = RegExp,
            proto = RegExp.prototype;
        if ($.FW && $.DESC) {
          if (!function() {
            try {
              return RegExp(/a/g, 'i') == '/a/i';
            } catch (e) {}
          }()) {
            RegExp = function RegExp(pattern, flags) {
              return new Base(cof(pattern) == 'RegExp' && flags !== undefined ? pattern.source : pattern, flags);
            };
            $.each.call($.getNames(Base), function(key) {
              key in RegExp || $.setDesc(RegExp, key, {
                configurable: true,
                get: function() {
                  return Base[key];
                },
                set: function(it) {
                  Base[key] = it;
                }
              });
            });
            proto.constructor = RegExp;
            RegExp.prototype = proto;
            $.hide($.g, 'RegExp', RegExp);
          }
          if (/./g.flags != 'g')
            $.setDesc(proto, 'flags', {
              configurable: true,
              get: require("./$.replacer")(/^.*\/(\w*)$/, '$1')
            });
        }
        require("./$.species")(RegExp);
      }, {
        "./$": 15,
        "./$.cof": 6,
        "./$.replacer": 19,
        "./$.species": 21
      }],
      49: [function(require, module, exports) {
        'use strict';
        var strong = require("./$.collection-strong");
        require("./$.collection")('Set', {add: function(value) {
            return strong.def(this, value = value === 0 ? 0 : value, value);
          }}, strong);
      }, {
        "./$.collection": 9,
        "./$.collection-strong": 7
      }],
      50: [function(require, module, exports) {
        var $def = require("./$.def");
        $def($def.P, 'String', {codePointAt: require("./$.string-at")(false)});
      }, {
        "./$.def": 11,
        "./$.string-at": 22
      }],
      51: [function(require, module, exports) {
        'use strict';
        var $ = require("./$"),
            cof = require("./$.cof"),
            $def = require("./$.def"),
            toLength = $.toLength;
        $def($def.P, 'String', {endsWith: function(searchString) {
            if (cof(searchString) == 'RegExp')
              throw TypeError();
            var that = String($.assertDefined(this)),
                endPosition = arguments[1],
                len = toLength(that.length),
                end = endPosition === undefined ? len : Math.min(toLength(endPosition), len);
            searchString += '';
            return that.slice(end - searchString.length, end) === searchString;
          }});
      }, {
        "./$": 15,
        "./$.cof": 6,
        "./$.def": 11
      }],
      52: [function(require, module, exports) {
        var $def = require("./$.def"),
            toIndex = require("./$").toIndex,
            fromCharCode = String.fromCharCode;
        $def($def.S, 'String', {fromCodePoint: function(x) {
            var res = [],
                len = arguments.length,
                i = 0,
                code;
            while (len > i) {
              code = +arguments[i++];
              if (toIndex(code, 0x10ffff) !== code)
                throw RangeError(code + ' is not a valid code point');
              res.push(code < 0x10000 ? fromCharCode(code) : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00));
            }
            return res.join('');
          }});
      }, {
        "./$": 15,
        "./$.def": 11
      }],
      53: [function(require, module, exports) {
        'use strict';
        var $ = require("./$"),
            cof = require("./$.cof"),
            $def = require("./$.def");
        $def($def.P, 'String', {includes: function(searchString) {
            if (cof(searchString) == 'RegExp')
              throw TypeError();
            return !!~String($.assertDefined(this)).indexOf(searchString, arguments[1]);
          }});
      }, {
        "./$": 15,
        "./$.cof": 6,
        "./$.def": 11
      }],
      54: [function(require, module, exports) {
        var set = require("./$").set,
            at = require("./$.string-at")(true),
            ITER = require("./$.uid").safe('iter'),
            $iter = require("./$.iter"),
            step = $iter.step;
        $iter.std(String, 'String', function(iterated) {
          set(this, ITER, {
            o: String(iterated),
            i: 0
          });
        }, function() {
          var iter = this[ITER],
              O = iter.o,
              index = iter.i,
              point;
          if (index >= O.length)
            return step(1);
          point = at.call(O, index);
          iter.i += point.length;
          return step(0, point);
        });
      }, {
        "./$": 15,
        "./$.iter": 14,
        "./$.string-at": 22,
        "./$.uid": 24
      }],
      55: [function(require, module, exports) {
        var $ = require("./$"),
            $def = require("./$.def");
        $def($def.S, 'String', {raw: function(callSite) {
            var raw = $.toObject(callSite.raw),
                len = $.toLength(raw.length),
                sln = arguments.length,
                res = [],
                i = 0;
            while (len > i) {
              res.push(String(raw[i++]));
              if (i < sln)
                res.push(String(arguments[i]));
            }
            return res.join('');
          }});
      }, {
        "./$": 15,
        "./$.def": 11
      }],
      56: [function(require, module, exports) {
        'use strict';
        var $ = require("./$"),
            $def = require("./$.def");
        $def($def.P, 'String', {repeat: function(count) {
            var str = String($.assertDefined(this)),
                res = '',
                n = $.toInteger(count);
            if (n < 0 || n == Infinity)
              throw RangeError("Count can't be negative");
            for (; n > 0; (n >>>= 1) && (str += str))
              if (n & 1)
                res += str;
            return res;
          }});
      }, {
        "./$": 15,
        "./$.def": 11
      }],
      57: [function(require, module, exports) {
        'use strict';
        var $ = require("./$"),
            cof = require("./$.cof"),
            $def = require("./$.def");
        $def($def.P, 'String', {startsWith: function(searchString) {
            if (cof(searchString) == 'RegExp')
              throw TypeError();
            var that = String($.assertDefined(this)),
                index = $.toLength(Math.min(arguments[1], that.length));
            searchString += '';
            return that.slice(index, index + searchString.length) === searchString;
          }});
      }, {
        "./$": 15,
        "./$.cof": 6,
        "./$.def": 11
      }],
      58: [function(require, module, exports) {
        'use strict';
        var $ = require("./$"),
            setTag = require("./$.cof").set,
            uid = require("./$.uid"),
            $def = require("./$.def"),
            keyOf = require("./$.keyof"),
            has = $.has,
            hide = $.hide,
            getNames = $.getNames,
            toObject = $.toObject,
            Symbol = $.g.Symbol,
            Base = Symbol,
            setter = false,
            TAG = uid.safe('tag'),
            SymbolRegistry = {},
            AllSymbols = {};
        function wrap(tag) {
          var sym = AllSymbols[tag] = $.set($.create(Symbol.prototype), TAG, tag);
          $.DESC && setter && $.setDesc(Object.prototype, tag, {
            configurable: true,
            set: function(value) {
              hide(this, tag, value);
            }
          });
          return sym;
        }
        if (!$.isFunction(Symbol)) {
          Symbol = function(description) {
            if (this instanceof Symbol)
              throw TypeError('Symbol is not a constructor');
            return wrap(uid(description));
          };
          hide(Symbol.prototype, 'toString', function() {
            return this[TAG];
          });
        }
        $def($def.G + $def.W, {Symbol: Symbol});
        var symbolStatics = {
          'for': function(key) {
            return has(SymbolRegistry, key += '') ? SymbolRegistry[key] : SymbolRegistry[key] = Symbol(key);
          },
          keyFor: function(key) {
            return keyOf(SymbolRegistry, key);
          },
          pure: uid.safe,
          set: $.set,
          useSetter: function() {
            setter = true;
          },
          useSimple: function() {
            setter = false;
          }
        };
        $.each.call(('hasInstance,isConcatSpreadable,iterator,match,replace,search,' + 'species,split,toPrimitive,toStringTag,unscopables').split(','), function(it) {
          var sym = require("./$.wks")(it);
          symbolStatics[it] = Symbol === Base ? sym : wrap(sym);
        });
        setter = true;
        $def($def.S, 'Symbol', symbolStatics);
        $def($def.S + $def.F * (Symbol != Base), 'Object', {
          getOwnPropertyNames: function(it) {
            var names = getNames(toObject(it)),
                result = [],
                key,
                i = 0;
            while (names.length > i)
              has(AllSymbols, key = names[i++]) || result.push(key);
            return result;
          },
          getOwnPropertySymbols: function(it) {
            var names = getNames(toObject(it)),
                result = [],
                key,
                i = 0;
            while (names.length > i)
              has(AllSymbols, key = names[i++]) && result.push(AllSymbols[key]);
            return result;
          }
        });
        setTag(Symbol, 'Symbol');
        setTag(Math, 'Math', true);
        setTag($.g.JSON, 'JSON', true);
      }, {
        "./$": 15,
        "./$.cof": 6,
        "./$.def": 11,
        "./$.keyof": 16,
        "./$.uid": 24,
        "./$.wks": 26
      }],
      59: [function(require, module, exports) {
        'use strict';
        var $ = require("./$"),
            weak = require("./$.collection-weak"),
            leakStore = weak.leakStore,
            ID = weak.ID,
            WEAK = weak.WEAK,
            has = $.has,
            isObject = $.isObject,
            isFrozen = Object.isFrozen || $.core.Object.isFrozen,
            tmp = {};
        var WeakMap = require("./$.collection")('WeakMap', {
          get: function(key) {
            if (isObject(key)) {
              if (isFrozen(key))
                return leakStore(this).get(key);
              if (has(key, WEAK))
                return key[WEAK][this[ID]];
            }
          },
          set: function(key, value) {
            return weak.def(this, key, value);
          }
        }, weak, true, true);
        if ($.FW && new WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7) {
          $.each.call(['delete', 'has', 'get', 'set'], function(key) {
            var method = WeakMap.prototype[key];
            WeakMap.prototype[key] = function(a, b) {
              if (isObject(a) && isFrozen(a)) {
                var result = leakStore(this)[key](a, b);
                return key == 'set' ? this : result;
              }
              return method.call(this, a, b);
            };
          });
        }
      }, {
        "./$": 15,
        "./$.collection": 9,
        "./$.collection-weak": 8
      }],
      60: [function(require, module, exports) {
        'use strict';
        var weak = require("./$.collection-weak");
        require("./$.collection")('WeakSet', {add: function(value) {
            return weak.def(this, value, true);
          }}, weak, false, true);
      }, {
        "./$.collection": 9,
        "./$.collection-weak": 8
      }],
      61: [function(require, module, exports) {
        var $def = require("./$.def");
        $def($def.P, 'Array', {includes: require("./$.array-includes")(true)});
        require("./$.unscope")('includes');
      }, {
        "./$.array-includes": 2,
        "./$.def": 11,
        "./$.unscope": 25
      }],
      62: [function(require, module, exports) {
        var $ = require("./$"),
            $def = require("./$.def"),
            ownKeys = require("./$.own-keys");
        $def($def.S, 'Object', {getOwnPropertyDescriptors: function(object) {
            var O = $.toObject(object),
                result = {};
            $.each.call(ownKeys(O), function(key) {
              $.setDesc(result, key, $.desc(0, $.getDesc(O, key)));
            });
            return result;
          }});
      }, {
        "./$": 15,
        "./$.def": 11,
        "./$.own-keys": 17
      }],
      63: [function(require, module, exports) {
        var $ = require("./$"),
            $def = require("./$.def");
        function createObjectToArray(isEntries) {
          return function(object) {
            var O = $.toObject(object),
                keys = $.getKeys(object),
                length = keys.length,
                i = 0,
                result = Array(length),
                key;
            if (isEntries)
              while (length > i)
                result[i] = [key = keys[i++], O[key]];
            else
              while (length > i)
                result[i] = O[keys[i++]];
            return result;
          };
        }
        $def($def.S, 'Object', {
          values: createObjectToArray(false),
          entries: createObjectToArray(true)
        });
      }, {
        "./$": 15,
        "./$.def": 11
      }],
      64: [function(require, module, exports) {
        var $def = require("./$.def");
        $def($def.S, 'RegExp', {escape: require("./$.replacer")(/([\\\-[\]{}()*+?.,^$|])/g, '\\$1', true)});
      }, {
        "./$.def": 11,
        "./$.replacer": 19
      }],
      65: [function(require, module, exports) {
        var $def = require("./$.def");
        $def($def.P, 'String', {at: require("./$.string-at")(true)});
      }, {
        "./$.def": 11,
        "./$.string-at": 22
      }],
      66: [function(require, module, exports) {
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
      }, {
        "./$": 15,
        "./$.ctx": 10,
        "./$.def": 11
      }],
      67: [function(require, module, exports) {
        require("./es6.array.iterator");
        var $ = require("./$"),
            Iterators = require("./$.iter").Iterators,
            ITERATOR = require("./$.wks")('iterator'),
            NodeList = $.g.NodeList;
        if ($.FW && NodeList && !(ITERATOR in NodeList.prototype)) {
          $.hide(NodeList.prototype, ITERATOR, Iterators.Array);
        }
        Iterators.NodeList = Iterators.Array;
      }, {
        "./$": 15,
        "./$.iter": 14,
        "./$.wks": 26,
        "./es6.array.iterator": 33
      }],
      68: [function(require, module, exports) {
        var $def = require("./$.def"),
            $task = require("./$.task");
        $def($def.G + $def.B, {
          setImmediate: $task.set,
          clearImmediate: $task.clear
        });
      }, {
        "./$.def": 11,
        "./$.task": 23
      }],
      69: [function(require, module, exports) {
        var $ = require("./$"),
            $def = require("./$.def"),
            invoke = require("./$.invoke"),
            partial = require("./$.partial"),
            MSIE = !!$.g.navigator && /MSIE .\./.test(navigator.userAgent);
        function wrap(set) {
          return MSIE ? function(fn, time) {
            return set(invoke(partial, [].slice.call(arguments, 2), $.isFunction(fn) ? fn : Function(fn)), time);
          } : set;
        }
        $def($def.G + $def.B + $def.F * MSIE, {
          setTimeout: wrap($.g.setTimeout),
          setInterval: wrap($.g.setInterval)
        });
      }, {
        "./$": 15,
        "./$.def": 11,
        "./$.invoke": 13,
        "./$.partial": 18
      }]
    }, {}, [1]);
    if (typeof module != 'undefined' && module.exports)
      module.exports = __e;
    else if (typeof define == 'function' && define.amd)
      define(function() {
        return __e;
      });
    else
      __g.core = __e;
  }();
})(require("process"));
