import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';
const should = chai.should();

chai.use(chaiHttp);
describe('User Route Controller', () => {
  it('should Create New User', (done) => {
    const values = {
      email: 'me2@gmail.com',
      password: 'password',
     name: 'mr john doe',
    };
    chai.request(server)
      .post('/auth/signup')
      .send(values)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('success');
        res.body.should.have.property('user');
        res.body.should.have.property('token');
        done();
      });
  });
  it('should Return 400 for incomplete user info', (done) => {
    const values = {
      email: 'mi@gmail.com',
      password: '',
      name: 'mr john doe',
    };
    chai.request(server)
      .post('/auth/signup')
      .send(values)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('Login an existing user', (done) => {
    const values = {
      email: 'me2@gmail.com',
      password: 'password',
    };
    chai.request(server)
      .post('/auth/login')
      .send(values)
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        done();
      });
  });
  it('Return 401 for invalid email during login', (done) => {
    const values = {
      email: 'g@gmail.com',
      password: 'password',
    };
    chai.request(server)
      .post('/auth/login')
      .send(values)
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('error');
        res.body.should.not.have.property('user');
        res.body.should.not.have.property('token');
        done();
      });
  });
  it('Return 401 for invalid password', (done) => {
    const values = {
      email: 'me@gmail.com',
      password: 'hhhhhh',
    };
    chai.request(server)
      .post('/auth/login')
      .send(values)
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('error');
        res.body.should.not.have.property('user');
        res.body.should.not.have.property('token');
        done();
      });
  });
});
describe('Entry Route Controller', () => {
  it('should return 401 without a token', (done) => {
    chai.request(server)
      .get('/entries')
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.should.not.have.property('entries');
        done();
      });
  });
  it('should return 500 for invalid token', (done) => {
    const myToken = 'nfdbjnbgjfnbgjfnbgjnbgjnjgngjngjngnmg';
    chai.request(server)
      .get('/entries')
      // Reference => https://github.com/visionmedia/supertest/issues/250
      .set('x-access-token', myToken)
      .end((err, res) => {
        res.should.have.status(500);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.should.not.have.property('entries');
        done();
      });
  });
//   it('should GET one diary entries with known id', (done) => {
//     const id1 = 2;
//     chai.request(server)
//       .get(`/entries/${id1}`)
//       .end((err, res) => {
//         res.should.have.status(200);
//         res.body.should.be.a('object');
//         res.body.should.have.property('success');
//         res.body.should.have.property('entry');
//         res.body.entry.should.have.property('id').eql(id1);
//         res.body.should.not.have.property('error');
//         done();
//       });
// });
//   it('should FAIL in getting one diary entry with unknown id', (done) => {
//     const id1 = 10;
//     chai.request(server)
//       .get(`/entries/${id1}`)
//       .end((err, res) => {
//         res.should.have.status(404);
//         res.body.should.be.a('object');
//         res.body.should.have.property('error');
//         res.body.should.not.have.property('entry');
//         res.body.should.not.have.property('id');
//         done();
//       });
// });
//   it('should FAIL in modifying one diary entry with unknown id', (done) => {
//     const id1 = 10;
//     chai.request(server)
//       .put(`/entries/${id1}`)
//       .end((err, res) => {
//         res.should.have.status(404);
//         res.body.should.be.a('object');
//         res.body.should.have.property('error');
//         res.body.should.not.have.property('entry');
//         res.body.should.not.have.property('id');
//         done();
//       });
// });
//   it('should  FAIL in deleting one diary entry with unknown id', (done) => {
//     const id1 = 10;
//     chai.request(server)
//       .delete(`/entries/${id1}`)
//       .end((err, res) => {
//         res.should.have.status(404);
//         res.body.should.be.a('object');
//         res.body.should.have.property('error');
//         res.body.should.not.have.property('entry');
//         res.body.should.not.have.property('id');
//         done();
//       });
// });
//   // it('should DELETE one diary entries with known id', (done) => {
//   //   const id = 2;
//   //   chai.request(server)
//   //     .delete(`/entries/${id}`)
//   //     .end((err, res) => {
//   //       res.should.have.status(200);
//   //       res.body.should.have.property('success');
//   //       res.body.should.not.have.property('error');
//   //       done();
//   //     });
//   // });
//   it('should Modify one diary entry with known id', (done) => {
//     const entryAdded = new CreateEntry(1, 'One Beautiful Morning', 'Transportation', 'Brt', 'Someone paid my t-fare to work');
//     const EntryToModify = {
//       title: 'My worst day',
//       category: 'Transportation',
//       sub_category: 'Yellow Bus',
//       content: 'Lagos conductors can be rude..',
//     };
//     chai.request(server)
//       .put(`/entries/${entryAdded.id}`)
//       .send(EntryToModify)
//       .end((err, res) => {
//         res.should.have.status(200);
//         res.body.should.be.a('object');
//         res.body.should.have.property('success');
//         res.body.should.have.property('entry');
//         res.body.entry.should.have.property('id').eql(entryAdded.id);
//         res.body.entry.should.have.property('title');
//         res.body.entry.should.have.property('category');
//         res.body.entry.should.have.property('sub_category');
//         res.body.entry.should.have.property('content');
//         res.body.should.not.have.property('error');
//         done();
//       });
//   });
//   it('should Create a new entry', (done) => {
//     const values = {
//       title: 'The Day i ate afang soup',
//       category: 'Food',
//       sub_category: 'Calabar carnival',
//       content: 'I ate a lot of afang soup to my taste. It was fun..',
//     };
//     chai.request(server)
//       .post('/entries')
//       .send(values)
//       .end((err, res) => {
//         res.should.have.status(201);
//         res.body.should.be.a('object');
//         res.body.should.have.property('success');
//         res.body.should.have.property('entry');
//         res.body.entry.should.have.property('id');
//         res.body.entry.should.have.property('date');
//         res.body.entry.should.have.property('title');
//         res.body.entry.should.have.property('category');
//         res.body.entry.should.have.property('sub_category');
//         res.body.entry.should.have.property('content');
//         res.body.should.not.have.property('error');
//         done();
//       });
//   });
});


