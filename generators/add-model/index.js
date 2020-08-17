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

  async prompting() {
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('src/pages/page/all.js'),
      this.destinationPath(`src/pages/${this.answers.small_models}/all.js`),
      this.answers,
    );
    this.fs.copyTpl(
      this.templatePath('src/pages/page/index.js'),
      this.destinationPath(`src/pages/${this.answers.small_models}/index.js`),
      this.answers,
    );
    this.fs.copyTpl(
      this.templatePath('src/pages/page/_form.js'),
      this.destinationPath(`src/pages/${this.answers.small_models}/_form.js`),
      this.answers,
    );
    this.fs.copyTpl(
      this.templatePath('src/pages/page/edit.js'),
      this.destinationPath(`src/pages/${this.answers.small_models}/edit.js`),
      this.answers,
    );
    this.fs.copyTpl(
      this.templatePath('src/pages/page/create.js'),
      this.destinationPath(`src/pages/${this.answers.small_models}/create.js`),
      this.answers,
    );
    this.fs.copyTpl(
      this.templatePath('src/pages/page/_create_view_1.js'),
      this.destinationPath(`src/pages/${this.answers.small_models}/_create_view_1.js`),
      this.answers,
    );
    this.fs.copyTpl(
      this.templatePath('src/pages/page/_edit_view_1.js'),
      this.destinationPath(`src/pages/${this.answers.small_models}/_edit_view_1.js`),
      this.answers,
    );
    this.fs.copyTpl(
      this.templatePath('src/queries/query.js'),
      this.destinationPath(`src/queries/${this.answers.small_models}.js`),
      this.answers,
    );


    
    var index = this.fs.read(this.destinationPath('src/App.js'));
    var regExTop = new RegExp('//top for generator', 'g');
    var regExList = new RegExp(/list for generator\*\/}/, 'g');
    
    index = index.toString().replace(regExTop, `//top for generator\nimport {${this.answers.models} } from './pages/${this.answers.small_models}';`);
    index = index.toString().replace(regExList, `list for generator*/}\n\t\t\t<PublicMainLayout path="/${this.answers.small_models}" component={${this.answers.models}} /> `);

    this.fs.write(this.destinationPath('src/App.js'), index );

  }

  install() {
    //this.installDependencies();
  }
};
