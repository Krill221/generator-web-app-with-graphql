'use strict';
const Generator = require('yeoman-generator');
const pluralize = require('pluralize');

module.exports = class extends Generator {

  constructor(args, opts) {
    super(args, opts);
    this.conflicter.force = true;
    this.argument("model", { type: String, required: true });
    this.argument("population", { type: String, required: true });

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


    this.log("model", this.answers.model);
    this.log("population", this.answers.population);
  }

  async prompting() {
  }

  writing() {
    
    var queryFile = this.fs.read(this.destinationPath(`src/queries/${this.answers.small_populations}.js`));
    var fieldsQuery = `const FIELDS = \\[`;
    var fieldsQueryNew = `const FIELDS = [[\'${this.answers.small_model}Id'\, \'ID\'], `;
    queryFile = queryFile.toString().replace(new RegExp(fieldsQuery, 'g'), fieldsQueryNew);
    var parentIdQuery = `const parent = null`;
    var parentIdQueryNew = `const parent = \'${this.answers.small_model}Id\'`;
    queryFile = queryFile.toString().replace(new RegExp(parentIdQuery, 'g'), parentIdQueryNew);
    this.fs.write(this.destinationPath(`src/queries/${this.answers.small_populations}.js`), queryFile);
    
  }

  install() {
    //this.installDependencies();
  }
};
