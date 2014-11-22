function file(relative, content) {

  return {
    relative: relative,
    contents: {
      toString: function () {
        return content;
      }
    }
  };
}

module.exports = {
  file: file
};
