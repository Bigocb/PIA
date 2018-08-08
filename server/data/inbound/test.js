var loadPortfolio = require('../fileprocessing');

var answer = loadPortfolio.fileAnswer;

  function func(data) {
    console.log('Line: ' + answer);
  };

  module.exports = {
    func: func
  };