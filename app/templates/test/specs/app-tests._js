'use strict';

var should = require('should');

var app = require('../../index');

describe( '<%= appname %> tests', function () {

  it('should work', function (done) {
    app.doSomething(function (err) {
      should.not.exist(err);
      done();
    });
  });

});
