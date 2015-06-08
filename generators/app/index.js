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
  sass: 'sass'
};

var prompts = [{
  type: 'input',
  name: 'author',
  message: 'What is your name?',
  store: true
}, {
  type: 'list',
  name: 'sass',
  message: 'Which implementation of Sass are you using?',
  choices: [{
    name: 'LibSass (Node Sass)',
    value: 'node'
  }, {
    name: 'Ruby Sass',
    value: 'ruby'
  }],
  'default': 'node',
  store: true
}, {
  type: 'confirm',
  name: 'lint',
  message: 'Use SCSS-Lint config? (requires SCSS-Lint)',
  'default': true,
  store: true,
  when: function when(answers) {
    return answers.sass == 'ruby';
  }
}, {
  type: 'confirm',
  name: 'gulp',
  message: 'Use Gulp?',
  'default': true,
  store: true
}, {
  type: 'checkbox',
  name: 'tasks',
  message: 'Which Gulp Sass tasks would you like to run?',
  choices: [{
    name: 'AutoPrefixer',
    value: 'autoprefixer',
    checked: true
  }, {
    name: 'Source Maps',
    value: 'sourcemaps',
    checked: false
  }, {
    name: 'SassDoc',
    value: 'sassdoc',
    checked: false
  }],
  when: function when(answers) {
    return answers.gulp == true;
  }
}, {
  type: 'input',
  name: 'sassPath',
  message: 'SCSS directory?',
  'default': 'sass',
  store: true
}, {
  type: 'input',
  name: 'cssPath',
  message: 'Output directory for compiled CSS?',
  'default': 'css',
  store: true
}];

var SassGuideGenerator = (function (_Base) {
  function SassGuideGenerator() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _classCallCheck(this, SassGuideGenerator);

    _get(Object.getPrototypeOf(SassGuideGenerator.prototype), 'constructor', this).apply(this, args);

    this.meta = {};
  }

  _inherits(SassGuideGenerator, _Base);

  _createClass(SassGuideGenerator, [{
    key: 'prompting',
    get: function () {
      return {
        app: function app() {
          var _this = this;

          var done = this.async();

          this.prompt(prompts, function (res) {
            _this.config.set('meta', res);

            done();
          });
        }
      };
    }
  }, {
    key: 'writing',
    get: function () {
      return {
        app: function app() {
          var meta = this.config.get('meta');

          this.directory(paths.sass, meta.sassPath);

          meta.lint && this.copy('.scss-lint.yml', '.scss-lint.yml');
        },

        gulp: function gulp() {
          var meta = this.config.get('meta');

          if (!meta.gulp) return;

          this.fs.copyTpl(this.templatePath('gulpfile.js.tmpl'), this.destinationPath('gulpfile.js'), {
            meta: this.config.get('meta'),
            gulp: {
              compiler: meta.sass == 'node' ? 'gulp-sass' : 'gulp-ruby-sass'
            }
          });
        }
      };
    }
  }, {
    key: 'install',
    get: function () {
      return {
        app: function app() {
          var meta = this.config.get('meta');

          if (meta.sass == 'node') {
            this.npmInstall(['gulp', 'node-sass', 'gulp-sass'], { 'saveDev': true });
          }
        }
      };
    }
  }]);

  return SassGuideGenerator;
})(_yeomanGenerator.Base);

exports['default'] = SassGuideGenerator;
module.exports = exports['default'];