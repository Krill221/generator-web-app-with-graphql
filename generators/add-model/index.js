'use strict';
const Generator = require('yeoman-generator');
const pluralize = require('pluralize');


module.exports = class extends Generator {

  constructor(args, opts) {
    super(args, opts);
    this.conflicter.force = true;
    this.argument("model", { type: String, required: true });
    this.argument("fields", { type: Array, required: true });

    this.answers = {};
    this.answers.model = this.options.model.charAt(0).toUpperCase() + this.options.model.slice(1).toLowerCase();
    this.answers.models = pluralize(this.options.model.charAt(0).toUpperCase() + this.options.model.slice(1).toLowerCase());
    this.answers.small_models = pluralize(this.options.model.toLowerCase());
    this.answers.small_model = this.options.model.toLowerCase();
    this.answers.large_models = pluralize(this.options.model.toUpperCase());
    this.answers.large_model = this.options.model.toUpperCase();
    this.answers.fields = [];
    this.options.fields.map(field => this.answers.fields.push(field.split(':')));
    this.log("new model", this.answers.model);
    this.log("with fields", this.answers.fields);

  }

  writing() {

    // PAGE FOLDER
    this.fs.copyTpl(
      this.templatePath('src/pages/page/index.js'),
      this.destinationPath(`src/pages/${this.answers.small_models}/index.js`),
      this.answers,
    );
    this.fs.copyTpl(
      this.templatePath('src/pages/page/__createForm.js'),
      this.destinationPath(`src/pages/${this.answers.small_models}/__createForm.js`),
      this.answers,
    );
    this.fs.copyTpl(
      this.templatePath('src/pages/page/__deleteForm.js'),
      this.destinationPath(`src/pages/${this.answers.small_models}/__deleteForm.js`),
      this.answers,
    );
    this.fs.copyTpl(
      this.templatePath('src/pages/page/__editForm.js'),
      this.destinationPath(`src/pages/${this.answers.small_models}/__editForm.js`),
      this.answers,
    );
    this.fs.copyTpl(
      this.templatePath('src/pages/page/__inlineForm.js'),
      this.destinationPath(`src/pages/${this.answers.small_models}/__inlineForm.js`),
      this.answers,
    );
    this.fs.copyTpl(
      this.templatePath('src/pages/page/__inlineForm2.js'),
      this.destinationPath(`src/pages/${this.answers.small_models}/__inlineForm2.js`),
      this.answers,
    );
    this.fs.copyTpl(
      this.templatePath('src/pages/page/__tableForm.js'),
      this.destinationPath(`src/pages/${this.answers.small_models}/__tableForm.js`),
      this.answers,
    );
    this.fs.copyTpl(
      this.templatePath('src/pages/page/schema.js'),
      this.destinationPath(`src/pages/${this.answers.small_models}/schema.js`),
      this.answers,
    );

    // QUERY FOLDER
    this.fs.copyTpl(
      this.templatePath('src/queries/query.js'),
      this.destinationPath(`src/queries/${this.answers.small_models}.js`),
      this.answers,
    );

    // LOCALE FOLDER
    this.fs.copyTpl(
      this.templatePath('src/locale/ru/model.js'),
      this.destinationPath(`src/locale/ru/${this.answers.small_model}.js`),
      this.answers,
    );

    // Locale/ru
    var regExTop = new RegExp('//top for generator', 'g');
    var regExTopLocaleFile = `//top for generator\nimport ${this.answers.small_model} from './${this.answers.small_model}';`;
    var regExModels = new RegExp('// models for generator', 'g');
    var regExModelsNew = `// models for generator\n\t\t\t${this.answers.small_model} : { ...${this.answers.small_model} },`;
    var LocaleFile = this.fs.read(this.destinationPath('src/locale/ru/index.js'));
    LocaleFile = LocaleFile.toString().replace( new RegExp(regExTop, 'g'), regExTopLocaleFile);
    LocaleFile = LocaleFile.toString().replace( new RegExp(regExModels, 'g'), regExModelsNew);
    this.fs.write(this.destinationPath('src/locale/ru/index.js'), LocaleFile );

    // App.js
    var regExTopAppFile = `//top for generator\nimport ${this.answers.models} from './pages/${this.answers.small_models}';`;
    var regExList = /list for generator\*\/}/;
    var regExListNew = `list for generator*/}\n\t\t\t\t\t<PublicMainLayout path="/${this.answers.small_models}" component={${this.answers.models}} /> `;
    var AppFile = this.fs.read(this.destinationPath('src/App.js'));
    AppFile = AppFile.toString().replace(new RegExp(regExTop, 'g'), regExTopAppFile);
    AppFile = AppFile.toString().replace(new RegExp(regExList, 'g'), regExListNew);
    this.fs.write(this.destinationPath('src/App.js'), AppFile );

  }

};
