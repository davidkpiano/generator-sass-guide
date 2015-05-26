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
      name() {
        let done = this.async();
        let prompt = [
          {
            type: 'input',
            name: 'name',
            message: 'Component name:'
          }
        ];

        this.prompt(prompt, ({ name }) => {
          this.options.component = this.options.component || {}; 
          this.options.component.name = name;

          this.options.components = this.config.get('components') || [];
          this.options.components.push(name);
          this.config.set('components', this.options.components);
          done();
        });
      },

      description() {
        let done = this.async();
        let prompt = [
          {
            type: 'input',
            name: 'description',
            message: 'Component description:'
          }
        ];

        this.prompt(prompt, ({ description }) => {
          this.options.component.description = description;

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
          this.destinationPath(`sass/components/_${this.options.component.name}.scss`),
          {
            component: this.options.component,
            meta: this.config.get('meta')
          });
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