## Sass Guide Yeoman Generator

**Currently under design/development.**

```bash
npm install -g yo
yo sass-guide
```

### Getting Started
The sass-guide generator is currently under development. Its main intent is to allow developers to easily scaffold and maintain a Sass project using the principles and [7-1 architecture](http://sass-guidelin.es/#the-7-1-pattern) in Hugo Giraudel's [Sass Guidelines](http://sass-guidelin.es).

**Editing the generator**
The generator is written in ES6 and transpiled using [Babel JS](http://babeljs.io).

1. Run `npm install` to install the required dependencies.
2. Edit the generator in `src/app/index.js`
3. Add any templates to `generators/app/templates`
4. Clone any repositories to `vendor/`
5. Run `npm start`

This will transpile `src/app/index.js` into `generators/app/index.js` and `npm link` the generator.

**Testing the generator**
After running `npm start` in the generator directory, run `yo sass-guide` in any directory, assuming you have [Yeoman](http://yeoman.io/) installed.

### Included repos
Repos used by the generator are cloned into `vendors`. This makes it easy to keep `generator-sass-guide` up to date, by  updating each repo inside the `vendors` directory.

- [Sass Boilerplate](https://github.com/HugoGiraudel/sass-boilerplate)
- *More coming soon!*
