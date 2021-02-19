var Generator = require('yeoman-generator');

module.exports = class extends Generator {
  async prompting() {
    this.answers = await this.prompt([
      {
        type: "input",
        name: "name",
        message: "Your project name:",
        default: this.appname.replace(' ', '-')
      },
      {
        type: "input",
        name: "projectAuthor",
        message: "Author names:",
        default: 'krill221'
      },
      {
        type: "input",
        name: "server_address_dev",
        message: "server_address_dev:",
        default: 'http://localhost:4000'
      },
      {
        type: "input",
        name: "server_address_prod",
        message: "server_address_prod:",
        default: 'http://localhost:4000'
      },
      /*{
        type: "confirm",
        name: "confirmed",
        message: "Would you like to create the new web-app?"
      }
      */
    ]);

    this.log("app name", this.answers.name);
    this.log("server_address_dev: ", this.answers.server_address_dev);
  }

  writing() {
    this.fs.copyTpl(
      `${this.templatePath()}/**/!(_)`,
      this.destinationPath('./'),
      this.answers,
    );
    this.fs.copyTpl(
      `${this.templatePath()}/**/.*`,
      this.destinationPath('./'),
      this.answers,
    );
    this.log(`App created in ${this.destinationPath()}`)
  }

  install() {
    this.npmInstall()
  }
};