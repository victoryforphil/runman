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
    arrayName: "managers",
    tryNpm: true,
    localPath: "./",
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

    // Creates Local Path
    var requirePath = _settings.localPath + filename + ".js";

    var npmPack;
    try {
        npmPack = require(requirePath)
        console.log("[RunMan] Found Local. (" + requirePath + ")");
    } catch (e) {
        console.log("[RunMan] Failed to find locally. (" + requirePath + ")");
    }

    try {
        npmPack = require(filename)
        console.log("[RunMan] Found Npm. (" + filename + ")");
    } catch (e) {
        console.log("[RunMan] Failed to find NPM. (" + filename + ")");
    }

    if(!npmPack){
      if (_settings.tryNpm) {
          InstallNPM(npmInstallOptions, filename, function(pack){
            CreateInstance(name,pack, _settings, cb);
            return;
          });
      }else{
          cb("NOT_FOUND");
      }
    }else{
        CreateInstance(name, npmPack, _settings, cb);
        return;
    }



}

function CreateInstance(name, npmPack, settings, callback) {
    if (!npmPack) {
        callback("REQUIRE_FAILED");
        return;
    }
    console.log("[RunMan] Creating Instance");
    //Creates Instance
    var manInstance = new npmPack(settings.params);
    if (!manInstance) {
        callback("INSTANCE_FAILED");
        return;
    }

    // Loads Instance into Array or Object
    if (settings.array) {
        if(!settings.parent[settings.arrayName]){
          settings.parent[settings.arrayName] = [];
        }
        manInstance.name = name;
        settings.parent[settings.arrayName].push(manInstance);
    } else {
        settings.parent[name] = manInstance;
    }

    console.log("[RunMan] Instance Created.");
    callback(null, manInstance);
}

function InstallNPM(options, filename, callback) {
    console.log("[RunMan] Installing via NPM.");
    options.name = filename;

    npmi(options, function(err, result) {
        if (err) {
            if (err.code === npmi.LOAD_ERR) console.log('[RunMan] NPM Load Error.');
            else if (err.code === npmi.INSTALL_ERR) console.log(' [RunMan] NPM install error');
            callback(err.msg);
        }
        // installed
        console.log("[RunMan] Downloaded NPM Package. Creating...");

        var npmPack = require(filename);

        callback(npmPack);
    });
    return;
}

module.exports = RunMan;
