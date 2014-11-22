var ModuleResolver = require('../lib/module_resolver');
  var should = require('should');
  var file = require('./utils').file;

describe('Module Resolver', function () {

  var resolver;
  beforeEach(function () {
    resolver = new ModuleResolver();
  });

  describe('Resolve path by module name', function () {

    it('should resolve module path', function () {
      resolver.registerFile(file('a/b.js'));

      resolver.resolvePath('a/b.js').should.equal('a/b.js');
    });

    it('should handle optional \'.js\' ending', function () {
      resolver.registerFile(file('a/b.js'));

      resolver.resolvePath('a/b').should.equal('a/b.js');
    });

    it('should resolve module relative to another', function () {
      resolver.registerFile(file('a/sub/m.js'));
      resolver.registerFile(file('a/b.js'));
      resolver.registerFile(file('a/c.js'));

      resolver.resolvePath('./b', {path: 'a/c.js'}).should.equal('a/b.js');
      resolver.resolvePath('../b', {path: 'a/sub/m.js'}).should.equal('a/b.js');
    });

  });

});

