var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MemoryStorage = function () {
  function MemoryStorage() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        logger = _ref.logger,
        _ref$initialState = _ref.initialState,
        initialState = _ref$initialState === undefined ? {} : _ref$initialState;

    _classCallCheck(this, MemoryStorage);

    this.storage = Object.assign({}, initialState);
    this.logger = logger;
  }

  _createClass(MemoryStorage, [{
    key: 'log',
    value: function log() {
      if (this.logger && typeof this.logger === 'function') {
        this.logger.apply(this, arguments);
      }
    }
  }, {
    key: 'setItem',
    value: function setItem(key, value, callback) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        _this.storage[key] = value;
        _this.log('setItem called with', key, value);
        if (callback) callback(null, value);
        resolve(value);
      });
    }
  }, {
    key: 'getItem',
    value: function getItem(key, callback) {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        _this2.log('getItem called with', key);
        var value = _this2.storage[key];
        if (callback) callback(null, value);
        resolve(value);
      });
    }
  }, {
    key: 'removeItem',
    value: function removeItem(key, callback) {
      var _this3 = this;

      return new Promise(function (resolve, reject) {
        _this3.log('removeItem called with', key);
        var value = _this3.storage[key];
        delete _this3.storage[key];
        if (callback) callback(null, value);
        resolve(value);
      });
    }
  }, {
    key: 'getAllKeys',
    value: function getAllKeys(callback) {
      var _this4 = this;

      return new Promise(function (resolve, reject) {
        _this4.log('getAllKeys called');
        var keys = Object.keys(_this4.storage);
        if (callback) callback(null, keys);
        resolve(keys);
      });
    }
  }]);

  return MemoryStorage;
}();

export default MemoryStorage;
//# sourceMappingURL=index.js.map