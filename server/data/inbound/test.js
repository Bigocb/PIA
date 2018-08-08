var healthFile = require('../fileprocessing');

var healthData = healthFile.myFile;

  function func(data) {
    console.log('Line: ' + healthData);
    return healthData;
  };

  module.exports = {
    func: func
  };