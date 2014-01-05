'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var SkellingtonGenerator = module.exports = function SkellingtonGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(SkellingtonGenerator, yeoman.generators.Base);

SkellingtonGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [{
    type: 'input',
    name: 'host',
    message: 'What is the FTP host?',
    default: 'example.com'
  }, {
    type: 'input',
    name: 'port',
    message: 'What port should we connect to via FTP?',
    default: 21
  }, {
    type: 'input',
    name: 'username',
    message: 'What username should we use for FTP transfers?',
    default: 'user'
  }, {
    type: 'input',
    name: 'password',
    message: 'What password should we use for FTP transfers?',
    default: 'password'
  }, {
    type: 'input',
    name: 'destination_folder',
    message: 'What is the path to the destination folder on the server?',
    default: 'public_html/'
  }];

  this.prompt(prompts, function (props) {
    this.host = props.host;
    this.port = props.port;
    this.username = props.username;
    this.password = props.password;
    this.destination_folder = props.destination_folder;

    cb();
  }.bind(this));
};

SkellingtonGenerator.prototype.app = function app() {
  this.mkdir('app');
  this.mkdir('app/static');
  this.mkdir('app/static/scripts');

  this.copy('_package.json', 'package.json');
  this.copy('_bower.json', 'bower.json');
  this.copy('_gitignore', '.gitignore');
  this.copy('_style.css', 'app/static/css/style.css');
  this.template('_Gruntfile.js', 'Gruntfile.js');
  this.template('_ftppass', '.ftppass');

  // Copy entire app directory across
  this.directory('app', 'app', true);
};

SkellingtonGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
  this.copy('bowerrc', '.bowerrc');
};
