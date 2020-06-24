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
      this.templatePath('src/pages/page/_edit.js'),
      this.destinationPath(`src/pages/${this.answers.small_models}/_edit.js`),
      this.answers,
    );
    this.fs.copyTpl(
      this.templatePath('src/pages/page/_show.js'),
      this.destinationPath(`src/pages/${this.answers.small_models}/_show.js`),
      this.answers,
    );
    this.fs.copyTpl(
      this.templatePath('src/pages/page/single.js'),
      this.destinationPath(`src/pages/${this.answers.small_models}/single.js`),
      this.answers,
    );
    this.fs.copyTpl(
      this.templatePath('src/pages/page/wizard.js'),
      this.destinationPath(`src/pages/${this.answers.small_models}/wizard.js`),
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
    var regExSingle = new RegExp(/single for generator\*\/}/, 'g');
    
    index = index.toString().replace(regExTop, `//top for generator\nimport {${this.answers.models}, Single${this.answers.model}, Wizard${this.answers.model} } from './pages/${this.answers.small_models}';`);
    index = index.toString().replace(regExList, `list for generator*/}\n\t\t\t<MainLayout exact path="/${this.answers.small_models}" component={${this.answers.models}} /> `);
    index = index.toString().replace(regExSingle, `single for generator*/}\n\t\t\t<EmptyLayout exact path="/${this.answers.small_models}/new" component={Wizard${this.answers.model}} /> `);
    index = index.toString().replace(regExSingle, `single for generator*/}\n\t\t\t<MainLayout exact path="/${this.answers.small_models}/:itemId([\\S\\s]{24})" component={Single${this.answers.model}} /> `);

    this.fs.write(this.destinationPath('src/App.js'), index );

  }

  install() {
    //this.installDependencies();
  }
};