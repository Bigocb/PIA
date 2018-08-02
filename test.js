var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('./app');  
var should = chai.should();

chai.use(chaiHttp);

var assert = require('assert');
describe('Array', function() {
  it('should list ALL blobs on /blobs GET', function(done) {
    chai.request(server)
      .get('/api/weather')
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        done();
      });
  });
});