var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');  
var should = chai.should();

chai.use(chaiHttp);

var assert = require('assert');
describe('Array', function() {
  // outbound
  it('should retrieve events on /out/events GET', function(done) {
    chai.request(server)
      .get('/out/events ')
      .end(function(err, res){
        res.should.have.status(200);
        done();
      });
  });
  it('should retrieve conditions on /out/avgcondition GET', function(done) {
    chai.request(server)
      .get('/out/avgcondition ')
      .end(function(err, res){
        res.should.have.status(200);
        done();
      });
  });
  it('should retrieve temps on /out/avgtemp GET', function(done) {
    chai.request(server)
      .get('/out/avgtemp ')
      .end(function(err, res){
        res.should.have.status(200);
        done();
      });
  });
  it('should retrieve avghumidity on /out/avghumidity GET', function(done) {
    chai.request(server)
      .get('/out/avghumidity ')
      .end(function(err, res){
        res.should.have.status(200);
        done();
      });
  });
  it('should retrieve avghumidity on /out/avghumidity GET', function(done) {
    chai.request(server)
      .get('/out/avghumidity ')
      .end(function(err, res){
        res.should.have.status(200);
        done();
      });
  });
  it('should retrieve topnews on /out/topnews GET', function(done) {
    chai.request(server)
      .get('/out/topnews ')
      .end(function(err, res){
        res.should.have.status(200);
        done();
      });
  });
  it('should retrieve health on /out/health GET', function(done) {
    chai.request(server)
      .get('/out/health ')
      .end(function(err, res){
        res.should.have.status(200);
        done();
      });
  });
  it('should retrieve data on /out/data GET', function(done) {
    chai.request(server)
      .get('/out/data ')
      .end(function(err, res){
        res.should.have.status(200);
        done();
      });
  });
    //inbound
  it('should retrieve and insert weather on /weather GET', function(done) {
    chai.request(server)
      .get('/weather ')
      .end(function(err, res){
        res.should.have.status(200);
        done();
      });
  });

});

