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

  it('should throw error if parent is null',function(){
    var runman = require("./runman.js");

    runman.load("TestMan",{},function(err){
      expect(err).to.equal("NO_PARENT");
    })
  });
  it('should throw no error',function(){
    var runman = require("./runman.js");
    var _parent = {};
    runman.load("TestMan",{parent: _parent},function(err){
      expect(err).to.be.undefined;
    })
  });

  it('should load the manager into parent',function(){
    var runman = require("./runman.js");
    var _parent = {};
    runman.load("TestMan",{parent: _parent},function(err){

    });
    expect(_parent.TestMan).to.not.be.undefined;
  });

  it('should load the manager into array',function(){
    var runman = require("./runman.js");
    var _parent = {};
    runman.load("TestMan",{parent: _parent, array: true},function(err){

    });
    console.log("Parent:" + _parent.managers);
    expect(_parent.managers[0]).to.have.any.keys('name', 'TestMan');
  });


});

describe('load', function(){
  it('should be able to call function',function(){
    var runman = require("./runman.js");
    var _parent = {};
    runman.load("TestMan",{parent: _parent, array: false},function(err){

    });
    expect(_parent.TestMan.TestFunction()).to.equal("Test!");

  });
});
