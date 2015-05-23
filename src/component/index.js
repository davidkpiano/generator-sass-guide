import { Base } from 'yeoman-generator';
import fs from 'fs';
import path from 'path';

// Paths
const vendorPath = path.join(__dirname, '../../vendor');

const paths = {
  components: path.join(vendorPath, 'sass-boilerplate/stylesheets/components') 
};

export default class SassGuideGenerator extends Base {
  constructor(...args) {
    super(...args);
  }

  get prompting() {
    return {
      componentName() {
        let done = this.async();
        let prompt = [
          {
            type: 'input',
            name: 'componentName',
            message: 'Component name:'
          }
        ];

        this.prompt(prompt, ({ componentName }) => {
          this.options.componentName = componentName;
          done();
        });
      }
    }
  }

  get writing() {
    return {
      component() {
        this.template('component.scss', `_${this.options.componentName}.scss`);
      }
    }
  }
}