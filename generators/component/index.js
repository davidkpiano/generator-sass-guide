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
        name: function name() {
          var _this = this;

          var done = this.async();
          var prompt = [{
            type: 'input',
            name: 'name',
            message: 'Component name:'
          }];

          this.prompt(prompt, function (_ref) {
            var name = _ref.name;

            _this.options.component = _this.options.component || {};
            _this.options.component.name = name;

            _this.options.components = _this.config.get('components') || [];
            _this.options.components.push(name);
            _this.config.set('components', _this.options.components);
            done();
          });
        },

        description: function description() {
          var _this2 = this;

          var done = this.async();
          var prompt = [{
            type: 'input',
            name: 'description',
            message: 'Component description:'
          }];

          this.prompt(prompt, function (_ref2) {
            var description = _ref2.description;

            _this2.options.component.description = description;

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
          this.fs.copyTpl(this.templatePath('_component.scss.tmpl'), this.destinationPath('sass/components/_' + this.options.component.name + '.scss'), {
            component: this.options.component,
            meta: this.config.get('meta')
          });
        },

        all: function all() {
          this.fs.copyTpl(this.templatePath('_all.scss.tmpl'), this.destinationPath('sass/components/_all.scss'), { components: this.config.get('components') });
        }
      };
    }
  }]);

  return SassGuideGenerator;
})(_yeomanGenerator.Base);

exports['default'] = SassGuideGenerator;
module.exports = exports['default'];