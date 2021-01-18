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

    var queriesFile = this.fs.read(this.destinationPath(`src/queries/${this.answers.small_models}.js`));
    var queriesText = `\\[\'${this.answers.small_populations}'\, \'\\[ID\\]\'\\], `;
    queriesFile = queriesFile.toString().replace(new RegExp(queriesText, 'g'), '');
    this.fs.write(this.destinationPath(`src/queries/${this.answers.small_models}.js`), queriesFile);

    var formFile = this.fs.read(this.destinationPath(`src/pages/${this.answers.small_models}/_form.js`));
    var formText = `${this.answers.small_populations}: \\[\\], `;
    formFile = formFile.toString().replace(new RegExp(formText, 'g'), '');
    this.fs.write(this.destinationPath(`src/pages/${this.answers.small_models}/_form.js`), formFile);

  }

  install() {
    //this.installDependencies();
  }
};
