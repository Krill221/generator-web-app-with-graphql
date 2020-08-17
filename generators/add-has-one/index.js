'use strict';
const Generator = require('yeoman-generator');
const pluralize = require('pluralize');

module.exports = class extends Generator {

  constructor(args, opts) {
    super(args, opts);
    this.conflicter.force = true;
    this.argument("model", { type: String, required: true });
    this.argument("population", { type: String, required: true });
    this.argument("fields", { type: Array, required: true });

    this.answers = {};
    this.answers.model = this.options.model.charAt(0).toUpperCase() + this.options.model.slice(1).toLowerCase();
    this.answers.models = pluralize(this.options.model.charAt(0).toUpperCase() + this.options.model.slice(1).toLowerCase());
    this.answers.small_models = pluralize(this.options.model.toLowerCase());
    this.answers.small_model = this.options.model.toLowerCase();
    this.answers.large_models = pluralize(this.options.model.toUpperCase());
    this.answers.large_model = this.options.model.toUpperCase();
    
    this.answers.population = this.options.population.charAt(0).toUpperCase() + this.options.population.slice(1).toLowerCase();
    this.answers.populations = pluralize(this.options.population.charAt(0).toUpperCase() + this.options.population.slice(1).toLowerCase());
    this.answers.small_populations = pluralize(this.options.population.toLowerCase());
    this.answers.small_population = this.options.population.toLowerCase();
    this.answers.large_populations = pluralize(this.options.population.toUpperCase());
    this.answers.large_population = this.options.population.toUpperCase();

    this.answers.fields = [];
    this.options.fields.map(field => this.answers.fields.push(field.split(':')));
    this.log("model", this.answers.model);
    this.log("population", this.answers.population);
    this.log("population fields", this.answers.fields);

  }

  async prompting() {
  }

  writing() {
    
    var text = this.fs.read(this.destinationPath(`src/queries/${this.answers.small_models}.js`));
    var regExQuerys = new RegExp(`${this.answers.small_models} {`, 'g');
    var regExQueryWhere =  new RegExp(`${this.answers.small_models}_where \\(ids: \\$ids\\) {`, 'g');
    var regExQuery =  new RegExp(`${this.answers.small_model} \\(id: \\$id\\) {`, 'g');
    var regExUpdate = new RegExp(`mutation update${this.answers.model}\\(\\$`, 'g');
    var regExUpdate2 = new RegExp(`update${this.answers.model}\\( `, 'g');
    text = text.toString().replace(regExQuerys, `${this.answers.small_models} {\n\t\t${this.answers.small_population}{\n\t\t\tid\n\t\t\t${this.answers.fields.map(f => f[0]).join('\n\t\t\t')}\n\t\t}` );
    text = text.toString().replace(regExQueryWhere, `${this.answers.small_models}_where (ids: $ids) {\n\t\t${this.answers.small_population}{\n\t\t\tid\n\t\t\t${this.answers.fields.map(f => f[0]).join('\n\t\t\t')}\n\t\t}` );
    text = text.toString().replace(regExQuery, `${this.answers.small_model} (id: $id) {\n\t\t${this.answers.small_population}{\n\t\t\tid\n\t\t\t${this.answers.fields.map(f => f[0]).join('\n\t\t\t')}\n\t\t}` );
    text = text.toString().replace(regExUpdate, `mutation update${this.answers.model}($${this.answers.small_population}: ID, $` );
    text = text.toString().replace(regExUpdate2, `update${this.answers.model}( ${this.answers.small_population}: $${this.answers.small_population}, ` );
    this.fs.write(this.destinationPath(`src/queries/${this.answers.small_models}.js`), text);

    var form = this.fs.read(this.destinationPath(`src/pages/${this.answers.small_models}/_form.js`));
    var regEx1 = new RegExp(`let item = data \\? data\\[model\\] : { `, 'g');
    var regEx2 =  new RegExp(`initialValues={{ `, 'g');
    form = form.toString().replace(regEx1, `let item = data ? data[model] : { ${this.answers.small_population}: { id: '' }, ` );
    form = form.toString().replace(regEx2, `initialValues={{ ${this.answers.small_population}: item.${this.answers.small_population}.id, ` );
    this.fs.write(this.destinationPath(`src/pages/${this.answers.small_models}/_form.js`), form);
    
  }

  install() {
    //this.installDependencies();
  }
};
