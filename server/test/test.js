import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

const should = chai.should();

chai.use(chaiHttp);

describe('/GET /api/v1/entries', () => {
  it('it should GET all diary entries', (done) => {
    chai.request(server)
      .get('/api/v1/entries')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('success');
        res.body.should.have.property('entries');
        res.body.should.not.have.property('error');
        res.body.entries.should.be.a('array');
        done();
      });
  });
});
describe('/GET /api/v1/entries/:id', () => {
  it('it should GET one diary entries with known id', (done) => {
    const id1 = 2;
    chai.request(server)
      .get(`/api/v1/entries/${id1}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('success');
        res.body.should.have.property('entry');
        res.body.entry.should.have.property('id').eql(id1);
        res.body.should.not.have.property('error');
        done();
      });
  });
  it('it should GET one diary entries with unknown id', (done) => {
    const id2 = 10;
    chai.request(server)
      .get(`/api/v1/entries/${id2}`)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        done();
      });
  });
});
