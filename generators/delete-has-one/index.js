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
    this.log("delete population", this.answers.population);

  }

  async prompting() {
  }

  writing() {

    var text = this.fs.read(this.destinationPath(`src/queries/${this.answers.small_models}.js`));
    var form = this.fs.read(this.destinationPath(`src/pages/${this.answers.small_models}/_form.js`));
    
    var regEx1 = new RegExp(`${this.answers.small_population}: \\$${this.answers.small_population}, `, 'g');
    var regEx2 = new RegExp(`\\$${this.answers.small_population}: ID, `, 'g');
    var regEx3 = new RegExp(`\t\t${this.answers.small_population}\\{[\\S\\s]*?\\}\n`, 'g');
    text = text.toString().replace(regEx1, '');
    text = text.toString().replace(regEx2, '');
    text = text.toString().replace(regEx3, '');

    var regEx21 = new RegExp(`${this.answers.small_population}: { id: '' }, `, 'g');
    var regEx22 =  new RegExp(`${this.answers.small_population}: item.${this.answers.small_population}.id, `, 'g');
    form = form.toString().replace(regEx21, '');
    form = form.toString().replace(regEx22, '');

    this.fs.write(this.destinationPath(`src/queries/${this.answers.small_models}.js`), text);
    this.fs.write(this.destinationPath(`src/pages/${this.answers.small_models}/_form.js`), form);


    //helpers
    var all = this.fs.read(this.destinationPath(`src/pages/${this.answers.small_models}/all.js`));
    var single = this.fs.read(this.destinationPath(`src/pages/${this.answers.small_models}/single.js`));
    var wizard = this.fs.read(this.destinationPath(`src/pages/${this.answers.small_models}/wizard.js`));
    var edit = this.fs.read(this.destinationPath(`src/pages/${this.answers.small_models}/_edit.js`));
    var show = this.fs.read(this.destinationPath(`src/pages/${this.answers.small_models}/_show.js`));
    var impComponents = [
      new RegExp(`//import PickOneGrid from '../../components/PickOneGrid';\n`, 'g'),
      new RegExp(`//import PickOneGridDialod from '../../components/PickOneGridDialod';\n`, 'g'),
    ];
    var impQueries = [
      new RegExp(`//import { GET_${this.answers.large_populations} } from '../../queries/${this.answers.small_populations}';\n`, 'g'),
    ];
    var impHelpers = [
      new RegExp(`//import ${this.answers.population}Show from '../${this.answers.small_populations}/_show';\n`, 'g'),
      new RegExp(`//import ${this.answers.population}Edit from '../${this.answers.small_populations}/_edit';\n`, 'g'),
    ];

    impComponents.forEach(item => {
      all = all.toString().replace(item, '' );
      single = single.toString().replace(item, '' );
      wizard = wizard.toString().replace(item, '' );
      edit = edit.toString().replace(item, '' );
      show = show.toString().replace(item, '' );
    });
    impQueries.forEach(item => {
      all = all.toString().replace(item, '' );
      single = single.toString().replace(item, '' );
      wizard = wizard.toString().replace(item, '' );
      edit = edit.toString().replace(item, '' );
      show = show.toString().replace(item, '' );
    });
    impHelpers.forEach(item => {
      all = all.toString().replace(item, '' );
      single = single.toString().replace(item, '' );
      wizard = wizard.toString().replace(item, '' );
      edit = edit.toString().replace(item, '' );
      show = show.toString().replace(item, '' );
    });

    this.fs.write(this.destinationPath(`src/pages/${this.answers.small_models}/all.js`), all);
    this.fs.write(this.destinationPath(`src/pages/${this.answers.small_models}/single.js`), single);
    this.fs.write(this.destinationPath(`src/pages/${this.answers.small_models}/wizard.js`), wizard);
    this.fs.write(this.destinationPath(`src/pages/${this.answers.small_models}/_edit.js`), edit);
    this.fs.write(this.destinationPath(`src/pages/${this.answers.small_models}/_show.js`), show);

  }

  install() {
    //this.installDependencies();
  }
};
