var
  path = require('path'),
  es = require('event-stream'),
  recast = require('recast'),
  gutil = require('gulp-util'),
  transpiler = require('es6-module-transpiler'),
  ModuleResolver = require('./lib/module_resolver'),
  PluginError = gutil.PluginError
;

var PLUGIN_NAME = 'es6-module-bundler';

module.exports = function (modules) {

  var collected = collectModuleFilesFromStream(modules);

  return es.map(function (target, cb) {

    if (target.isStream()) {
      return cb(error('Streams not supported for target templates!'));
    }

    collected(function (resolver) {
      var container = new transpiler.Container({
        resolvers: [resolver],
        formatter: transpiler.formatters.bundle
      });

      // resolve module
      container.getModule(target.relative);
      container.convert().forEach(function (converted) {
        var rendered = recast.print(converted, {
          sourceMapName: path.basename(target.path)
        });
        target.contents = new Buffer(rendered.code);

        cb(null, target);
      });
    });
  });
};

function collectModuleFilesFromStream(stream) {

  var resolver = new ModuleResolver(), done = false, queue = [];

  stream.pipe(es.through(collector(resolver), function () {
    done = true;
    while (queue.length) {
      resolve(queue.shift());
    }
  }));

  function resolve(cb) {
    process.nextTick(function () {
      cb(resolver);
    });
  }

  return function (cb) {
      if (!done) {
        queue.push(cb);
      } else {
        resolve(cb);
      }
  };
}

function collector(resolver) {

  return function (file) {
    if (!file.isBuffer()) {
      throw "Only buffered files supported :(";
    }

    resolver.registerFile(file);
  }
}

function error (message) {
  return new PluginError(PLUGIN_NAME, message);
}
