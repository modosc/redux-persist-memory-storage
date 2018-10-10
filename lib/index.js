"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var MemoryStorage = function () {
  function MemoryStorage() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        logger = _ref.logger,
        _ref$initialState = _ref.initialState,
        initialState = _ref$initialState === void 0 ? {} : _ref$initialState;

    (0, _classCallCheck2.default)(this, MemoryStorage);
    this.storage = Object.assign({}, initialState);
    this.logger = logger;
  }

  (0, _createClass2.default)(MemoryStorage, [{
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

      return new Promise(function (resolve, reject) {
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

      return new Promise(function (resolve, reject) {
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

      return new Promise(function (resolve, reject) {
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

exports.default = MemoryStorage;
module.exports = exports.default;
//# sourceMappingURL=index.js.map