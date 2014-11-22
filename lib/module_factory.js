var Module = require('./module');

function create (file, fromModule, container) {
  return new Module(file.path, file, container);
}

function createGlobalModule (name, container) {
  // we need something like empty module here...
  throw "Global modules not supported yet";
}

module.exports = {
  create: create,
  createGlobalModule: createGlobalModule
};

