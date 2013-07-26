'use strict';

var should = require('should');

var app = require('../../index');

describe('<%= appName %> tests', function () {

  it('should work', function (done) {
    app.doSomething(function (err) {
      should.not.exist(err);
      done();
    });
  });

});
