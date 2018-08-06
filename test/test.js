var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');  
var should = chai.should();

chai.use(chaiHttp);

var assert = require('assert');
describe('Array', function() {
  it('should list ALL blobs on /out/events GET', function(done) {
    chai.request(server)
      .get('/out/events ')
      .end(function(err, res){
        res.should.have.status(200);
        done();
      });
  });
  it('should list ALL blobs on /out/avgcondition GET', function(done) {
    chai.request(server)
      .get('/out/avgcondition ')
      .end(function(err, res){
        res.should.have.status(200);
        done();
      });
  });

});

