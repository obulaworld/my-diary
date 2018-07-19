import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

const should = chai.should();

chai.use(chaiHttp);

describe('/GET all-entries', () => {
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