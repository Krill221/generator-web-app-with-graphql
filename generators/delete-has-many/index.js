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

  writing() {

    var queryFile = this.fs.read(this.destinationPath(`src/queries/${this.answers.small_populations}.js`));

    var importQ = `\nimport \\{ fieldsArray as ${this.answers.small_model}Fields \\} from \'.\\/${this.answers.small_models}\'`;
    queryFile = queryFile.toString().replace(new RegExp(importQ, 'g'), '');

    var fieldsArray = `\n\t\\[\'${this.answers.small_model}Id \\{ id \' \\+ ${this.answers.small_model}Fields.map\\(f \=\> f\\[0\\]\\).join\\(\' \'\\) \\+ \'\\}\'\\],`;
    queryFile = queryFile.toString().replace(new RegExp(fieldsArray, 'g'), '');

    var fieldsInput = `\n\t\\[\'${this.answers.small_model}Id'\, \'ID\'\\],`;
    queryFile = queryFile.toString().replace(new RegExp(fieldsInput, 'g'), '');


    var parentIdQuery = `const parent = \'${this.answers.small_model}Id\'`;
    var parentIdQueryNew = `const parent = null`;
    queryFile = queryFile.toString().replace(new RegExp(parentIdQuery, 'g'), parentIdQueryNew);

    
    this.fs.write(this.destinationPath(`src/queries/${this.answers.small_populations}.js`), queryFile);

  }

  install() {
    //this.installDependencies();
  }
};
