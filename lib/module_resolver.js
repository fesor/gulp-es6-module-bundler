var
  path = require('path'),
  moduleFactory = require('./module_factory')
;

function ModuleResolver () {
  this.files = {};
}

ModuleResolver.prototype.registerFile = function (file) {
  this.files[file.relative] = file;
};

ModuleResolver.prototype.resolveModule = function (importedPath, fromModule, container) {
  var resolvedPath = this.resolvePath(importedPath, fromModule);
  if (resolvedPath) {
    var cachedModule = container.getCachedModule(resolvedPath);
    if (cachedModule) {

      return cachedModule;
    }

    if (!path.extname(importedPath)) {
      importedPath += path.extname(resolvedPath);
    }

    return moduleFactory.create(this.files[resolvedPath], container);
  }

  return null;
};

ModuleResolver.prototype.resolvePath = function (importedPath, fromModule) {
  var includePath = '';
  if (importedPath[0] === "." && fromModule) {
    includePath = path.dirname(fromModule.path);
  }

  var resolved =  path.join(includePath, importedPath);
  if (resolved.slice(-3).toLowerCase() !== ".js") {
    resolved += ".js";
  }

  if (resolved in this.files) {
    return resolved;
  }

  return false;
};

module.exports = ModuleResolver;

