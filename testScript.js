
  var runman = require("./runman.js");
  var _parent = {};
  runman.load("TestMan","runman-testman",{parent: _parent, array: false, installNPM: true, isLocal: false, localPath: "./managers/"},function(err){
    if(err){
      console.log(err);
    }
  });
