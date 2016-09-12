var RunMan = {};

var merge = require('merge');


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

  var _settings = merge(defaults, settings);

  if(!_settings.parent){
    cb("NO_PARENT");
    return;
  }

  var requirePath = name;
  if(_settings.isLocal){
    requirePath = _settings.localPath + name + ".js";
  }
  var npmPack = require(requirePath);

  if(!npmPack){
    cb("REQUIRE_FAILED");
    return;
  }

  var manInstance = new npmPack();
  if(!manInstance){
    cb("INSTANCE_FAILED");
    return;
  }

  if(_settings.array){
    _settings.parent.managers = [];
    manInstance.name = name;
    _settings.parent.managers.push(manInstance);
  }else{
    _settings.parent[name] = manInstance;
  }


}

module.exports = RunMan;
