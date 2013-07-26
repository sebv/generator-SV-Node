'use strict';

var should = require('should');

var zip = require('../../lib/zip.js'); 
var unzip = require('zip');

function test(filename, done){
  zip.zipFileToBuffer( __dirname + '/fixtures/' + filename, function(err, data) {
    should.not.exist(err);
    data.length.should.be.above(0);    
    // unzipping attempt
    var reader = null;
    try{
      reader = unzip.Reader(data);
    } catch(err){
      should.not.exist(err);
    }
    done();
  });
}

describe('zip tests', function() {

  it('should zip small text file', function(done) {
    test('helloworld.txt', done);
  });

  it('should zip bigger jpg file', function(done) {
    test('tux.jpg', done);
  });

});
