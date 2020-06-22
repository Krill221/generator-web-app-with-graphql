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

    var text = this.fs.read(this.destinationPath(`src/queries/${this.answers.small_models}.js`));
    var regExQuerys = new RegExp(`${this.answers.small_models} {`, 'g');
    var regExQueryWhere =  new RegExp(`${this.answers.small_models}_where \\(ids: \\$ids\\) {`, 'g');
    var regExQuery =  new RegExp(`${this.answers.small_model} \\(id: \\$id\\) {`, 'g');
    var regExUpdate = new RegExp(`mutation update${this.answers.model}\\(\\$`, 'g');
    var regExUpdate2 = new RegExp(`update${this.answers.model}\\( `, 'g');
    text = text.toString().replace(regExQuerys, `${this.answers.small_models} {\n\t\t${this.answers.fields.map(f => `${f[0]} {\n\t\t\towner\n\t\t\tvalue\n\t\t}`).join('\n\t\t')}` );
    text = text.toString().replace(regExQueryWhere, `${this.answers.small_models}_where (ids: $ids) {\n\t\t${this.answers.fields.map(f => `${f[0]} {\n\t\t\towner\n\t\t\tvalue\n\t\t}`).join('\n\t\t')}` );
    text = text.toString().replace(regExQuery, `${this.answers.small_model} (id: $id) {\n\t\t${this.answers.fields.map(f => `${f[0]} {\n\t\t\towner\n\t\t\tvalue\n\t\t}`).join('\n\t\t')}` );
    text = text.toString().replace(regExUpdate, `mutation update${this.answers.model}(${this.answers.fields.map(f => '$'+f[0]+': Float').join(', ')}, $` );
    text = text.toString().replace(regExUpdate2, `update${this.answers.model}( ${this.answers.fields.map(f => f[0]+': $'+f[0]).join(', ')}, ` );
    this.fs.write(this.destinationPath(`src/queries/${this.answers.small_models}.js`), text);

    //helpers
    var all = this.fs.read(this.destinationPath(`src/pages/${this.answers.small_models}/all.js`));
    var single = this.fs.read(this.destinationPath(`src/pages/${this.answers.small_models}/single.js`));
    var wizard = this.fs.read(this.destinationPath(`src/pages/${this.answers.small_models}/wizard.js`));
    var edit = this.fs.read(this.destinationPath(`src/pages/${this.answers.small_models}/_edit.js`));
    var show = this.fs.read(this.destinationPath(`src/pages/${this.answers.small_models}/_show.js`));
    var regExImpComponents =  new RegExp(`////g-key import components`, 'g');
    var impComponents = [
      `////g-key import components\n//import EstimateLike from '../../components/estimateLike';`,
      `////g-key import components\n//import EstimateStar from '../../components/estimateStar';`,
      `////g-key import components\n//import EstimateCondition from '../../components/estimateCondition';`,
    ];
    impComponents.forEach(item => {
      all = all.toString().replace(regExImpComponents, item );
      single = single.toString().replace(regExImpComponents, item );
      wizard = wizard.toString().replace(regExImpComponents, item );
      edit = edit.toString().replace(regExImpComponents, item );
      show = show.toString().replace(regExImpComponents, item );
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
