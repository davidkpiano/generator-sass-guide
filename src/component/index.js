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

          this.options.components = this.config.get('components') || [];
          this.options.components.push(componentName);
          this.config.set('components', this.options.components);
          done();
        });
      }
    }
  }

  get writing() {
    return {
      component() {
        this.fs.copyTpl(
          this.templatePath('_component.scss.tmpl'),
          this.destinationPath(`sass/components/_${this.options.componentName}.scss`),
          { options: this.options });
      },

      all() {
        this.fs.copyTpl(
          this.templatePath('_all.scss.tmpl'),
          this.destinationPath('sass/components/_all.scss'),
          { components: this.config.get('components') });
      }
    }
  }
}