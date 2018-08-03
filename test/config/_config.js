var config = {};

config.mongoURI = {
  development: 'mongodb://localhost/node-testing',
  test: 'mongodb://localhost/node-test'
};

module.exports = config;

var assert = require('assert');
describe('Array', function() {
  it('should list ALL weather on /out/weather ', function(done) {
    chai.request(server)
      .get('/out/weather ')
      .end(function(err, res){
        res.should.have.status(200);
        done();
      });
  });
});