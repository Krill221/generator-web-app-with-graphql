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
    this.log("model", this.answers.model);
    this.log("delete fields", this.answers.fields);

  }

  async prompting() {
  }

  writing() {

    var text = this.fs.read(this.destinationPath(`src/queries/${this.answers.small_models}.js`));
    var form = this.fs.read(this.destinationPath(`src/pages/${this.answers.small_models}/_form.js`));
    var show = this.fs.read(this.destinationPath(`src/pages/${this.answers.small_models}/_show.js`));

    this.answers.fields.forEach(f => {
      var regEx1 = new RegExp(`${f[0]}: \\$${f[0]}, `, 'g');
      var regEx2 = new RegExp(`\\$${f[0]}: ${f[1]}, `, 'g');
      var regEx3 = new RegExp(`\t\t${f[0]}\n`, 'g');
      text = text.toString().replace(regEx1, '');
      text = text.toString().replace(regEx2, '');
      text = text.toString().replace(regEx3, '');

      var regEx21 = new RegExp(`${f[0]}: '', `, 'g');
      var regEx22 = new RegExp(`${f[0]}: false, `, 'g');
      var regEx23 = new RegExp(`${f[0]}: true, `, 'g');
      var regEx24 =  new RegExp(`${f[0]}: item.${f[0]}, `, 'g');
      form = form.toString().replace(regEx21, '');
      form = form.toString().replace(regEx22, '');
      form = form.toString().replace(regEx23, '');
      form = form.toString().replace(regEx24, '');

      show = show.toString().replace(regEx21, '');
      show = show.toString().replace(regEx22, '');
      show = show.toString().replace(regEx23, '');
      show = show.toString().replace(regEx24, '');

    });
    this.fs.write(this.destinationPath(`src/queries/${this.answers.small_models}.js`), text);
    this.fs.write(this.destinationPath(`src/pages/${this.answers.small_models}/_form.js`), form);
    this.fs.write(this.destinationPath(`src/pages/${this.answers.small_models}/_show.js`), show);



  }

  install() {
    //this.installDependencies();
  }
};
