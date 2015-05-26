import { Base } from 'yeoman-generator';
import fs from 'fs';
import path from 'path';

// Paths
const vendorPath = path.join(__dirname, '../../vendor');

const paths = {
  sass: 'sass'
};

export default class SassGuideGenerator extends Base {
  constructor(...args) {
    super(...args);
  }

  get prompting() {
    return {
      appName() {
        let done = this.async();
        let prompt = [
          {
            type: 'input',
            name: 'author',
            message: 'What is your name?'
          }
        ];

        this.prompt(prompt, ({ author }) => {
          this.config.set({
            meta: { author }
          });

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