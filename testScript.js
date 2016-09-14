
  var runman = require("./runman.js");
  var parentObject = {};

  var options = {
    parent: parentObject, // Object to which the manager will be loaded into. [required]
    array: false, // Wheter to store the manager in a array, or as its own object [default: false]
    arrayName: "Managers", // Name of the array Object [default: managers]
    tryNpm: true, // Wheter to download from NPM if the file is not found. [default: true]
    localPath: "./managers/" // Path of local managers [default: ./managers/]
  }

  // Param1: Name- What to name the manager object.
  // Param2: Filename- Name of the file (without .js) or npm package
  // Param3: options (see above)
  // Param3: callback (Calls when done or error).
  runman.load("TestMan","runman-testman",options,function(err, isnt){
    if(err){
      console.log(err);
      return;
    }
    console.log(parentObject.TestMan.TestFunction());
  });
