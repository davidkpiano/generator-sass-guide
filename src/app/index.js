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
    type: 'confirm',
    name: 'lint',
    message: 'Use SCSS-Lint?',
    default: true,
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
          done();
        });
      }
    }
  }

  get writing() {
    return {
      app() {
        this.directory(paths.sass, 'sass');
      }
    }
  }
}