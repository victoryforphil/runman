var RunMan = {};

var  merge  =  require('merge');
var npmi = require('npmi');
var path = require('path');


var npmInstallOptions = {
    version: 'latest', // expected version [default: 'latest']
    forceInstall: false,
    path: ".", // force install if set to true (even if already installed, it will do a reinstall) [default: false]
    npmLoad: { // npm.load(options, callback): this is the "options" given to npm.load()
        loglevel: 'silent' // [default: {loglevel: 'silent'}]
    }
};
var defaults = {
    array: false,
    arrayName: "managers".
    npmInstall: false,
    localPath: "./",
    isLocal: true
};

RunMan.load = function(name, filename, settings, cb) {
  console.log("[RunMan] Loading Manager: " + name);
    if (!name) {
        cb("NO_NAME");
        return;
    }

    if (!filename) {
        cb("NO_FILE_NAME");
        return;
    }


    // Merges Settings with Defaults
    var _settings = merge(defaults, settings);

    if (!_settings.parent) {
        cb("NO_PARENT");
        return;
    }

    // Creates Path
    var requirePath = filename;
    if (_settings.isLocal) {
        requirePath = _settings.localPath + filename + ".js";
    }
    var npmPack;
    try {

        // a path we KNOW is totally bogus and not a module
        npmPack = require(requirePath)
        console.log("[RunMan] Found NPM. Creating Instance");
        //Creates Instance
        var manInstance = new npmPack();
        if (!manInstance) {
            cb("INSTANCE_FAILED");
            return;
        }

        // Loads Instance into Array or Object
        if (_settings.array) {
            _settings.parent.managers = [];
            manInstance.name = name;
            _settings.parent.managers.push(manInstance);
        } else {
            _settings.parent[name] = manInstance;
        }

        console.log("[RunMan] Instance Created.");
        cb();

    } catch (e) {
      console.log("[RunMan] Failed to require NPM Package. ("+requirePath+")");
      if (_settings.installNPM) {
          console.log("[RunMan] Installing via NPM.");
          npmInstallOptions.name = filename;

          npmi(npmInstallOptions, function(err, result) {
              if (err) {
                  if (err.code === npmi.LOAD_ERR) console.log('[RunMan] NPM Load Error.');
                  else if (err.code === npmi.INSTALL_ERR) console.log(' [RunMan] NPM install error');
                  return console.log(err.message);
              }

              // installed
              console.log("[RunMan] Downloaded NPM Package. Creating...");

              var npmPack = require(filename);

              if (!npmPack) {
                  cb("REQUIRE_FAILED");
                  return;
              }

              // Creates Instance
              var manInstance = new npmPack();
              if (!manInstance) {
                  cb("INSTANCE_FAILED");
                  return;
              }

              // Loads Instance into Array or Object
              if (_settings.array) {
                  _settings.parent[_settings.arrayName] = [];
                  manInstance.name = name;
                  _settings.parent[_settings.arrayName].push(manInstance);
              } else {
                  _settings.parent[name] = manInstance;
              }
              console.log("[RunMan] Created Manager");
              cb();

          });
      } else {
          //If it failed to import, and installNPM = false, throw error;
          cb("REQUIRE_FAILED");
          return;
      }
    }





}



module.exports = RunMan;
