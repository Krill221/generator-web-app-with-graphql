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

    var queries = this.fs.read(this.destinationPath(`src/queries/${this.answers.small_models}.js`));

    this.answers.fields.forEach(f => {
      var regEx1 = new RegExp(`\t\t${f[0]} {\n\t\t\ttype\n\t\t\tcoordinates\n\t\t}\n`, 'g');
      var regEx21 = new RegExp(`\\$${f[0]}_lat: String, `, 'g');
      var regEx22 = new RegExp(`\\$${f[0]}_lng: String, `, 'g');
      var regEx31 = new RegExp(`${f[0]}_lat: \\$${f[0]}_lat, `, 'g');
      var regEx32 = new RegExp(`${f[0]}_lng: \\$${f[0]}_lng, `, 'g');
      queries = queries.toString().replace(regEx1, '');
      queries = queries.toString().replace(regEx21, '');
      queries = queries.toString().replace(regEx22, '');
      queries = queries.toString().replace(regEx31, '');
      queries = queries.toString().replace(regEx32, '');
    });
    this.fs.write(this.destinationPath(`src/queries/${this.answers.small_models}.js`), queries);

    //helpers
    var all = this.fs.read(this.destinationPath(`src/pages/${this.answers.small_models}/all.js`));
    var single = this.fs.read(this.destinationPath(`src/pages/${this.answers.small_models}/single.js`));
    var wizard = this.fs.read(this.destinationPath(`src/pages/${this.answers.small_models}/wizard.js`));
    var edit = this.fs.read(this.destinationPath(`src/pages/${this.answers.small_models}/_edit.js`));
    var show = this.fs.read(this.destinationPath(`src/pages/${this.answers.small_models}/_show.js`));
    var impComponents = [     
      new RegExp(`//import FieldLocationMap from '../../components/fieldLocationMap';\n`, 'g'),
    ];
    impComponents.forEach(item => {
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
