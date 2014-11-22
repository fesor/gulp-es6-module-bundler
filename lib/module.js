var BaseModule = require("es6-module-transpiler/lib/module");
var memo = require("es6-module-transpiler/lib/utils").memo;

function Module (file, container) {
  Object.defineProperties(this, {

    /**
     * @type {File}
     * @name Module#file
     */
    file: readOnly(file),

    /**
     * @type {string}
     * @name Module#path
     */
    path: readOnly(file.relative),

    /**
     * @type {string}
     * @name Module#relativePath
     */
    relativePath: readOnly(file.relative),

    /**
     * @type {string}
     * @name Module#sourceFileName
     */
    sourceFileName: readOnly(file.relative),

    /**
     * @type {Container}
     * @name Module#container
     */
    container: readOnly(container)
  });
}

Module.prototype = Object.create(BaseModule.prototype);

memo(Module.prototype, "src", /** @this Module */function() {
  return this.file.contents.toString();
});

module.exports = Module;

function readOnly(value) {
  return {
    value: value,
    enumerable: true,
    writable: false
  };
}
