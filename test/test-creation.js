/*global describe, beforeEach, it*/
'use strict';

var path    = require('path');
var helpers = require('yeoman-generator').test;

describe('sv-node generator', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('sv-node:app', [
        '../../app'
      ]);
      done();
    }.bind(this));
  });

  it('creates expected files', function (done) {
    var expected = [
      // add files you expect to exist here.
      'Gruntfile.js',
      'package.json',
      '.gitignore',
      '.gitattributes',
      '.jshintrc',
      '.editorconfig',
      'README.md',
      'travis.yml',
      'LICENSE',
      'lib/superapp.js',
      'test/.jshintrc',
      'test/mocha.opts',
      'test/specs/superapp-tests.js',
      'test/specs/fixtures',
    ];

    helpers.stub(this.app, 'userInfo', function() {
      this.realname = 'a_test_user';
      this.email = 'a_test_user@mail.me';
      this.githubUrl = 'https://github.com/yeoman/a_project';
    });

    helpers.mockPrompt(this.app, {
      'githubUser': 'a_test_user',
      'appName': 'superApp'
    });
    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFiles(expected);
      done();
    });
  });
});
