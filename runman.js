var RunMan = {};

var defaults = {
  array: false,
  npmInstall: false,
  localPath: "./",
  isLocal: true
};

RunMan.load = function(name, settings, cb){
  if(!name){
    cb("NO_NAME");
    return;
  }

  if(!settings){
    settings = defaults;
  }

  var requirePath = name;
  if(!settings.isLocal){
    requirePath = settings.localPath + name + ".js";
  }

  var npmPack = require(requirePath);

  if(!npmPack){
    cb("REQUIRE_FAILED");
    return;
  }

}

module.exports = RunMan;
