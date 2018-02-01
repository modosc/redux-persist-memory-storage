import _Object$keys from "@babel/runtime/core-js/object/keys";
import _Promise from "@babel/runtime/core-js/promise";
import _Object$assign from "@babel/runtime/core-js/object/assign";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";

var MemoryStorage = function () {
  function MemoryStorage() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        logger = _ref.logger,
        _ref$initialState = _ref.initialState,
        initialState = _ref$initialState === void 0 ? {} : _ref$initialState;

    _classCallCheck(this, MemoryStorage);

    this.storage = _Object$assign({}, initialState);
    this.logger = logger;
  }

  _createClass(MemoryStorage, [{
    key: "log",
    value: function log() {
      if (this.logger && typeof this.logger === 'function') {
        this.logger.apply(this, arguments);
      }
    }
  }, {
    key: "setItem",
    value: function setItem(key, value, callback) {
      var _this = this;

      return new _Promise(function (resolve, reject) {
        _this.storage[key] = value;

        _this.log('setItem called with', key, value);

        if (callback) callback(null, value);
        resolve(value);
      });
    }
  }, {
    key: "getItem",
    value: function getItem(key, callback) {
      var _this2 = this;

      return new _Promise(function (resolve, reject) {
        _this2.log('getItem called with', key);

        var value = _this2.storage[key];
        if (callback) callback(null, value);
        resolve(value);
      });
    }
  }, {
    key: "removeItem",
    value: function removeItem(key, callback) {
      var _this3 = this;

      return new _Promise(function (resolve, reject) {
        _this3.log('removeItem called with', key);

        var value = _this3.storage[key];
        delete _this3.storage[key];
        if (callback) callback(null, value);
        resolve(value);
      });
    }
  }, {
    key: "getAllKeys",
    value: function getAllKeys(callback) {
      var _this4 = this;

      return new _Promise(function (resolve, reject) {
        _this4.log('getAllKeys called');

        var keys = _Object$keys(_this4.storage);

        if (callback) callback(null, keys);
        resolve(keys);
      });
    }
  }]);

  return MemoryStorage;
}();

export { MemoryStorage as default };
//# sourceMappingURL=index.js.map