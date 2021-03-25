'use strict';
const Generator = require('yeoman-generator');
const pluralize = require('pluralize');

module.exports = class extends Generator {

  constructor(args, opts) {
    super(args, opts);
    this.conflicter.force = true;
    this.argument("model", { type: String, required: true });

    this.answers = {};
    this.answers.model = this.options.model.charAt(0).toUpperCase() + this.options.model.slice(1).toLowerCase();
    this.answers.models = pluralize(this.options.model.charAt(0).toUpperCase() + this.options.model.slice(1).toLowerCase());
    this.answers.small_models = pluralize(this.options.model.toLowerCase());
    this.answers.small_model = this.options.model.toLowerCase();
    this.answers.large_models = pluralize(this.options.model.toUpperCase());
    this.answers.large_model = this.options.model.toUpperCase();
    this.log("delete model", this.answers.model);

  }

  writing() {

    this.fs.delete(this.destinationPath(`src/queries/${this.answers.small_models}.js`));
    this.fs.delete(this.destinationPath(`src/locale/ru/${this.answers.small_model}.js`));
    this.fs.delete(this.destinationPath(`src/pages/${this.answers.small_models}`));


    // App.js
    var AppFile = this.fs.read(this.destinationPath('src/App.js'));
    var appTextTop = `import ${this.answers.models} from './pages/${this.answers.small_models}';\n`;
    var appText = `\n\t\t\t\t\t<PublicMainLayout path="/${this.answers.small_models}" component={${this.answers.models}} />`;
    AppFile = AppFile.toString().replace( new RegExp(appTextTop, 'g'), '');
    AppFile = AppFile.toString().replace( appText, '');
    this.fs.write(this.destinationPath('src/App.js'), AppFile );

    // LOCALE FOLDER
    var LocaleFile = this.fs.read(this.destinationPath(`src/locale/ru/index.js`));
    var localeTextTop = `import ${this.answers.small_model} from './${this.answers.small_model}';\n`;
    var localeText = `\t\t\t${this.answers.small_model} : { ...${this.answers.small_model} },\n`;
    LocaleFile = LocaleFile.toString().replace( new RegExp(localeTextTop, 'g'), '');
    LocaleFile = LocaleFile.toString().replace( new RegExp(localeText, 'g'), '');
    this.fs.write(this.destinationPath('src/locale/ru/index.js'), LocaleFile );

  }

};
