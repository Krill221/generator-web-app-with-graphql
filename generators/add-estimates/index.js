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

  writing() {

    var queryFile = this.fs.read(this.destinationPath(`src/queries/${this.answers.small_models}.js`));
    var fieldsQuery = `const fieldsArray = \\[`;
    var fieldsQueryNew = `const fieldsArray = [${this.answers.fields.map(f => `[\'${f[0]} {owner value}\', \'[Estimate]\']` ).join(', ')}, `;
    queryFile = queryFile.toString().replace(new RegExp(fieldsQuery, 'g'), fieldsQueryNew);
    this.fs.write(this.destinationPath(`src/queries/${this.answers.small_models}.js`), queryFile);

    var form = this.fs.read(this.destinationPath(`src/pages/${this.answers.small_models}/_form.js`));
    var regEx = `item : { `;
    var regExNew = `item : { ${this.answers.fields.map(f => `${f[0]}: { owner: '', value: 0 }`).join(', ')}, `;

    var regEx2 = `// items gen`;
    var regExNew2 = `// items gen\n${this.answers.fields.map(f => `\tif(Array.isArray(item.${f[0]})) item.${f[0]}.forEach(f => delete f.__typename);`).join('\n')}`;

    form = form.toString().replace(new RegExp(regEx, 'g'), regExNew);
    form = form.toString().replace(new RegExp(regEx2, 'g'), regExNew2);
    this.fs.write(this.destinationPath(`src/pages/${this.answers.small_models}/_form.js`), form);


  }

  install() {
    //this.installDependencies();
  }
};
