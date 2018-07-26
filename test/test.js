import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';
import CreateEntry from '../backend-model/diary_entry_model';

const should = chai.should();

chai.use(chaiHttp);

describe('Entry Route Controller', () => {
  it('should GET all diary entries', (done) => {
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
  it('should GET one diary entries with known id', (done) => {
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
  it('should FAIL in getting one diary entry with unknown id', (done) => {
    const id1 = 10;
    chai.request(server)
      .get(`/api/v1/entries/${id1}`)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.should.not.have.property('entry');
        res.body.should.not.have.property('id');
        done();
      });
});
  it('should FAIL in modifying one diary entry with unknown id', (done) => {
    const id1 = 10;
    chai.request(server)
      .put(`/api/v1/entries/${id1}`)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.should.not.have.property('entry');
        res.body.should.not.have.property('id');
        done();
      });
});
  it('should  FAIL in deleting one diary entry with unknown id', (done) => {
    const id1 = 10;
    chai.request(server)
      .delete(`/api/v1/entries/${id1}`)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.should.not.have.property('entry');
        res.body.should.not.have.property('id');
        done();
      });
});
  it('should DELETE one diary entries with known id', (done) => {
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
  it('should Modify one diary entry with known id', (done) => {
    const entryAdded = new CreateEntry(1, 'One Beautiful Morning', 'Transportation', 'Brt', 'Someone paid my t-fare to work');
    const EntryToModify = {
      title: 'My worst day',
      category: 'Transportation',
      sub_category: 'Yellow Bus',
      content: 'Lagos conductors can be rude..',
    };
    chai.request(server)
      .put(`/api/v1/entries/${entryAdded.id}`)
      .send(EntryToModify)
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
  it('should Create a new entry', (done) => {
    const values = {
      title: 'The Day i ate afang soup',
      category: 'Food',
      sub_category: 'Calabar carnival',
      content: 'I ate a lot of afang soup to my taste. It was fun..',
    };
    chai.request(server)
      .post('/api/v1/entries')
      .send(values)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('success');
        res.body.should.have.property('entry');
        res.body.entry.should.have.property('id');
        res.body.entry.should.have.property('date');
        res.body.entry.should.have.property('title');
        res.body.entry.should.have.property('category');
        res.body.entry.should.have.property('sub_category');
        res.body.entry.should.have.property('content');
        res.body.should.not.have.property('error');
        done();
      });
  });
});

// describe('User Route Controller', () => {
//   it('should Create New User', (done) => {
//     const values = {
//       register_email: 'me2@gmail.com',
//       register_password: 'password',
//       register_full_name: 'mr john doe',
//     };
//     chai.request(server)
//       .post('/api/v1/auth/signup')
//       .send(values)
//       .end((err, res) => {
//         res.should.have.status(201);
//         res.body.should.be.a('object');
//         res.body.should.have.property('success');
//         res.body.should.have.property('user');
//         res.body.should.have.property('token');
//         done();
//       });
//   });
//   it('should Return 400 for incomplete user info', (done) => {
//     const values = {
//       register_email: 'mi@gmail.com',
//       register_password: '',
//       register_full_name: 'mr john doe',
//     };
//     chai.request(server)
//       .post('/api/v1/auth/signup')
//       .send(values)
//       .end((err, res) => {
//         res.should.have.status(400);
//         done();
//       });
//   });
//   it('Login an existing user', (done) => {
//     const values = {
//       login_email: 'me@gmail.com',
//       login_password: 'password',
//     };
//     chai.request(server)
//       .post('/api/v1/auth/login')
//       .send(values)
//       .end((err, res) => {
//         res.should.have.status(200);
//         res.body.should.have.property('success');
//         res.body.should.have.property('user');
//         res.body.should.have.property('token');
//         done();
//       });
//   });
//   it('Return 401 for invalid email', (done) => {
//     const values = {
//       login_email: 'g@gmail.com',
//       login_password: 'password',
//     };
//     chai.request(server)
//       .post('/api/v1/auth/login')
//       .send(values)
//       .end((err, res) => {
//         res.should.have.status(401);
//         res.body.should.have.property('error');
//         res.body.should.not.have.property('user');
//         res.body.should.not.have.property('token');
//         done();
//       });
//   });
//   it('Return 401 for invalid password', (done) => {
//     const values = {
//       login_email: 'me@gmail.com',
//       login_password: 'hhhhhh',
//     };
//     chai.request(server)
//       .post('/api/v1/auth/login')
//       .send(values)
//       .end((err, res) => {
//         res.should.have.status(401);
//         res.body.should.have.property('error');
//         res.body.should.not.have.property('user');
//         res.body.should.not.have.property('token');
//         done();
//       });
//   });
// });
