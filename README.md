# RunMan
Runtime, external, managers for NodeJS.
#[Discord](https://discord.gg/0prrdN1joHCrVhdw)
##Getting Started
`npm install runman --save`

```js

  var runman = require("./runman.js");
  var parentObject = {};

  var options = {
    parent: parentObject, // Object to which the manager will be loaded into. [required]
    array: false, // Wheter to store the manager in a array, or as its own object [default: false]
    arrayName: "Managers", // Name of the array Object [default: managers]
    installNPM: true, // Wheter to download from NPM if the file is not found. [default: false]
    isLocal: false, // Is the manager a normal class (true), or from npm (inside node_moduels) [default: true]
    localPathL: "./managers/" // Path of local managers [default: ./managers/]
  }

  // Param1: Name- What to name the manager object.
  // Param2: Filename- Name of the file (without .js) or npm package
  // Param3: options (see above)
  // Param3: callback (Calls when done or error).
  runman.load("TestMan","runman-testman",options,function(err){
    if(err){
      console.log(err);
    }
    console.log(parentObject.TestMan.TestFunction());
  });
```

##Example Manager (see here as TestMan, also on NPM (runman-testman))
```js
class TestMan{
  constructor(){
    console.log("constructor!");
  }

  TestFunction(){
    return("Test!");
  }
}

module.exports = TestMan;

```

##Errors
`NO_NAME` - No Name Defined
`NO_FILE_NAME` - No Filename Defined
`NO_PARENT` - No Parent Object Defined
`INSTANCE_FAILED` - Failed to create class
`REQUIRE_FAILED` - Failed to load manager
