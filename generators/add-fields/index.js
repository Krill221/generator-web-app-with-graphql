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
    this.log("add new fields", this.answers.fields);

  }

  async prompting() {
  }

  writing() {

    var queryFile = this.fs.read(this.destinationPath(`src/queries/${this.answers.small_models}.js`));
    var regExQuerys = new RegExp(`${this.answers.small_models} {`, 'g');
    var regExQueryWhere =  new RegExp(`${this.answers.small_models}_where \\(ids: \\$ids\\) {`, 'g');
    var regExQuery =  new RegExp(`${this.answers.small_model} \\(id: \\$id\\) {`, 'g');
    var regExUpdate = new RegExp(`mutation update${this.answers.model}\\(\\$`, 'g');
    var regExUpdate2 = new RegExp(`update${this.answers.model}\\( `, 'g');
    queryFile = queryFile.toString().replace(regExQuerys, `${this.answers.small_models} {\n\t\t${this.answers.fields.map(f => f[0]).join('\n\t\t')}` );
    queryFile = queryFile.toString().replace(regExQueryWhere, `${this.answers.small_models}_where (ids: $ids) {\n\t\t${this.answers.fields.map(f => f[0]).join('\n\t\t')}` );
    queryFile = queryFile.toString().replace(regExQuery, `${this.answers.small_model} (id: $id) {\n\t\t${this.answers.fields.map(f => f[0]).join('\n\t\t')}` );
    queryFile = queryFile.toString().replace(regExUpdate, `mutation update${this.answers.model}(${this.answers.fields.map(f => '$'+f[0]+': '+f[1]).join(', ')}, $` );
    queryFile = queryFile.toString().replace(regExUpdate2, `update${this.answers.model}( ${this.answers.fields.map(f => f[0]+': $'+f[0]).join(', ')}, ` );
    this.fs.write(this.destinationPath(`src/queries/${this.answers.small_models}.js`), queryFile);

    var form = this.fs.read(this.destinationPath(`src/pages/${this.answers.small_models}/_form.js`));
    var regEx1 = new RegExp(`let item = data \\? data\\[model\\] : { `, 'g');
    var regEx2 =  new RegExp(`initialValues={{ `, 'g');
    form = form.toString().replace(regEx1, `let item = data ? data[model] : { ${this.answers.fields.map(f => ( (f[1] === 'String') ? `${f[0]}: ''` : ((f[1] === 'Boolean') ? `${f[0]}: false` : `${f[0]}: ''`) ) ).join(', ')}, ` );
    form = form.toString().replace(regEx2, `initialValues={{ ${this.answers.fields.map(f => `${f[0]}: item.${f[0]}`).join(', ')}, ` );
    this.fs.write(this.destinationPath(`src/pages/${this.answers.small_models}/_form.js`), form);
    
  }

  install() {
    //this.installDependencies();
  }
};
