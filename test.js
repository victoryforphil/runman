const chai = require('chai');

var expect = chai.expect;

describe('moduel', function(){
  it('should import RunMan',function(){
    var runman = require("./runman.js");
    expect(runman).to.not.be.undefined;
  });

  it('should export Load',function(){
    var runman = require("./runman.js");
    expect(runman.load).to.not.be.undefined;
  });
});

describe('load', function(){
  it('should throw error if name is null',function(){
    var runman = require("./runman.js");
    runman.load("",{},function(err){
      expect(err).to.equal("NO_NAME");
    })
  });

  it('should throw no error is name is passed',function(){
    var runman = require("./runman.js");
    runman.load("TestMan",{},function(err){
      expect(err).to.be.undefined;
    })
  });

});
