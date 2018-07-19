import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';
import CreateEntry from '../backend-model/diary_entry_model';

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
});
describe('/DELETE /api/v1/entries/:id', () => {
  it('it should DELETE one diary entries with known id', (done) => {
    const id = 2;
    chai.request(server)
      .delete(`/api/v1/entries/${id}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('success');
        res.body.should.not.have.property('error');
        done();
      });
  });
});
describe('/PUT /api/v1/entries/:id', () => {
  it('it should Modify one diary entries with known id', (done) => {
    const entryAdded = new CreateEntry(1, 'One Beautiful Morning', 'Transportation', 'Brt', 'Someone paid my t-fare to work');
    chai.request(server)
      .put(`/api/v1/entries/${entryAdded.id}`)
      .send({ title: 'My worst day', category: 'Transportation', sub_category: 'Yello Bus',content: 'Lagos conductors can be rude..' })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('success');
        res.body.should.have.property('entry');
        res.body.entry.should.have.property('id').eql(entryAdded.id);
        res.body.entry.should.have.property('title');
        res.body.entry.should.have.property('category');
        res.body.entry.should.have.property('sub_category');
        res.body.entry.should.have.property('content');
        res.body.should.not.have.property('error');
        done();
      });
  });
});
