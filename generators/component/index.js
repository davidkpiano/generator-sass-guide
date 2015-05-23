'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _yeomanGenerator = require('yeoman-generator');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

// Paths
var vendorPath = _path2['default'].join(__dirname, '../../vendor');

var paths = {
  components: _path2['default'].join(vendorPath, 'sass-boilerplate/stylesheets/components')
};

var SassGuideGenerator = (function (_Base) {
  function SassGuideGenerator() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _classCallCheck(this, SassGuideGenerator);

    _get(Object.getPrototypeOf(SassGuideGenerator.prototype), 'constructor', this).apply(this, args);
  }

  _inherits(SassGuideGenerator, _Base);

  _createClass(SassGuideGenerator, [{
    key: 'prompting',
    get: function () {
      return {
        componentName: function componentName() {
          var _this = this;

          var done = this.async();
          var prompt = [{
            type: 'input',
            name: 'componentName',
            message: 'What is the name of your component?'
          }];

          this.prompt(prompt, function (_ref) {
            var componentName = _ref.componentName;

            _this.options.componentName = componentName;
            done();
          });
        }
      };
    }
  }, {
    key: 'writing',
    get: function () {
      return {
        component: function component() {
          this.template('component.scss', '_' + this.options.componentName + '.scss');
        }
      };
    }
  }]);

  return SassGuideGenerator;
})(_yeomanGenerator.Base);

exports['default'] = SassGuideGenerator;
module.exports = exports['default'];