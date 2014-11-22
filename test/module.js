var Module = require('../lib/module');
var should = require('should');
var file = require('./utils').file;

describe('Module', function () {

  it('should provide correct module source', function () {
      var foo = new Module(file('foo.js', 'module source'), {});

      foo.src.should.equal('module source');
      foo.relativePath.should.equal('foo.js');
      foo.name.should.equal('foo');
  });
});
