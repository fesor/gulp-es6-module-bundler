var Module = require('../lib/module');
var should = require('should');

describe('Module', function () {

  it('should provide correct module source', function () {
      var foo = new Module('', {
        relative: 'foo.js',
        contents: {
          toString: function () {
            return 'module source';
          }
        }
      }, {});

      foo.src.should.equal('module source');
  })
});
