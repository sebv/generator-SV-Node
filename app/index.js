'use strict';
var util = require('util');
var path = require('path');
var _ = require('underscore');
_.str = require('underscore.string');
_.mixin(_.str.exports());


var yeoman = require('yeoman-generator');

var GitHubApi = require('github');
var github = new GitHubApi({
  version: '3.0.0'
});

var githubUserInfo = function (name, cb) {
  github.user.getFrom({
    user: name
  }, function (err, res) {
    if (err) { return cb(err); }
    cb(null, JSON.parse(JSON.stringify(res)));
  });    
};

var SvNodeGenerator = module.exports = function SvNodeGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));

  this.currentYear = (new Date()).getFullYear();

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });
};

util.inherits(SvNodeGenerator, yeoman.generators.Base);

SvNodeGenerator.prototype.askFor = function askFor() {
  var done = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [{
      name: 'githubUser',
      message: 'Would you mind telling me your username on Github?',
      default: 'someuser'
    }, {
      name: 'appName',
      message: 'What\'s the app name?',
      default: this.appname
    }
  ];

  this.prompt(prompts, function (props) {
    this.githubUser = props.githubUser;
    this.appName = props.appName;
    done();
  }.bind(this));
};

SvNodeGenerator.prototype.userInfo = function userInfo() {
  var done = this.async();
  githubUserInfo(this.githubUser, function (err, res) {
    if(err) { throw new Error(err); }
    /*jshint camelcase:false */
    this.realname = res.name;
    this.email = res.email;
    this.githubUrl = res.html_url;
    done();
  }.bind(this));
};

SvNodeGenerator.prototype.gruntfile = function gruntfile() {
  this.template('_Gruntfile.js', 'Gruntfile.js');
};

SvNodeGenerator.prototype.packageJSON = function packageJSON() {
  this.template('_package.json', 'package.json');
};

SvNodeGenerator.prototype.git = function git() {
  this.copy('_gitignore', '.gitignore');
  this.copy('_gitattributes', '.gitattributes');
};

SvNodeGenerator.prototype.jshint = function jshint() {
  this.copy('_jshintrc', '.jshintrc');
};

SvNodeGenerator.prototype.editorConfig = function editorConfig() {
  this.copy('_editorconfig', '.editorconfig');
};

SvNodeGenerator.prototype.Readme = function Readme() {
  this.copy('_README.md', 'README.md');
};

SvNodeGenerator.prototype.Travis = function Readme() {
  this.copy('_travis.yml', 'travis.yml');
};

SvNodeGenerator.prototype.License = function Readme() {
  this.template('_LICENSE', 'LICENSE');
};

SvNodeGenerator.prototype.Lib = function lib() {
  this.mkdir('lib');
  this.copy('lib/app.js', 'lib/' + _.slugify(this.appName) + '.js');
};


SvNodeGenerator.prototype.Test = function test() {
  this.mkdir('test');
  this.mkdir('test/specs');
  this.mkdir('test/specs/fixtures');
  this.copy('test/_jshintrc', 'test/.jshintrc');
  this.copy('test/_mocha.opts', 'test/mocha.opts');
  this.copy('test/specs/app-tests.js', 'test/specs/' + _.slugify(this.appName) + '-tests.js');
};
