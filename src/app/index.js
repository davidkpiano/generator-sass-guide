import { Base } from 'yeoman-generator';
import fs from 'fs';
import path from 'path';

// Paths
const vendorPath = path.join(__dirname, '../../vendor');

const paths = {
  sass: 'sass'
};

const prompts = [
  {
    type: 'input',
    name: 'author',
    message: 'What is your name?',
    store: true
  },
  {
    type: 'list',
    name: 'sass',
    message: 'Which implementation of Sass are you using?',
    choices: [
      {
        name: 'LibSass (Node Sass)',
        value: 'node'
      },
      {
        name: 'Ruby Sass',
        value: 'ruby'
      }
    ],
    default: 'node',
    store: true
  },
  {
    type: 'confirm',
    name: 'lint',
    message: 'Use SCSS-Lint config? (requires SCSS-Lint)',
    default: true,
    store: true,
    when: (answers) => answers.sass == 'ruby'
  },
  {
    type: 'confirm',
    name: 'gulp',
    message: 'Use Gulp?',
    default: true,
    store: true
  },
  {
    type: 'checkbox',
    name: 'tasks',
    message: 'Which Gulp Sass tasks would you like to run?',
    choices: [
      {
        name: 'AutoPrefixer',
        value: 'autoprefixer',
        checked: true
      },
      {
        name: 'Source Maps',
        value: 'sourcemaps',
        checked: false
      },
      {
        name: 'SassDoc',
        value: 'sassdoc',
        checked: false
      }
    ],
    when: (answers) => answers.gulp == true
  },
  {
    type: 'input',
    name: 'sassPath',
    message: 'SCSS directory?',
    default: 'sass',
    store: true
  },
  {
    type: 'input',
    name: 'cssPath',
    message: 'Output directory for compiled CSS?',
    default: 'css',
    store: true
  }
];

export default class SassGuideGenerator extends Base {
  constructor(...args) {
    super(...args);

    this.meta = {};
  }

  get prompting() {
    return {
      app() {
        let done = this.async();

        this.prompt(prompts, (res) => {
          this.config.set('meta', res);

          done();
        });
      }
    }
  }

  get writing() {
    return {
      app() {
        let meta = this.config.get('meta');

        this.directory(paths.sass, meta.sassPath);

        meta.lint && this.copy('.scss-lint.yml', '.scss-lint.yml');
      },

      gulp() {
        let meta = this.config.get('meta');

        if (!meta.gulp) return;

        this.fs.copyTpl(
          this.templatePath('gulpfile.js.tmpl'),
          this.destinationPath('gulpfile.js'),
          {
            meta: this.config.get('meta'),
            gulp: {
              compiler: meta.sass == 'node' ? 'gulp-sass' : 'gulp-ruby-sass'
            }
          });
      }
    }
  }

  get install() {
    return {
      app() {
        let meta = this.config.get('meta');

        if (meta.sass == 'node') {
          this.npmInstall(['gulp', 'node-sass', 'gulp-sass'], { 'saveDev': true });
        }
      }
    }
  }
}

