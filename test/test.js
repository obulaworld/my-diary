import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';
const should = chai.should();

chai.use(chaiHttp);
let token = '';
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
        token = res.body.token;
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
        res.body.should.have.property('error');
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
  it('should return 200 for POST /entries with a valid token', (done) => {
    const values = {
      title: 'me and teacher',
      category: 'education',
      subCategory: 'jss1',
      content: 'i was flogged',
    };
    chai.request(server)
      .post('/entries')
      .set('x-access-token', token)
      .send(values)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('success');
        res.body.should.have.property('entry');
        done();
      });
  });
  it('should return 500 for Any entry endpoint with an invalid token', (done) => {
    const values = {
      title: 'me and teacher',
      category: 'education',
      subCategory: 'jss1',
      content: 'i was flogged',
    };
    chai.request(server)
      .post('/entries')
      .set('x-access-token', 'bhbhbdvhfvhfvbfhbvfvbhvbfh')
      .send(values)
      .end((err, res) => {
        res.should.have.status(500);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.should.not.have.property('entry');
        done();
      });
  });
  it('should return 400 for POST /entries with incomplete parameters', (done) => {
    const values = {
      category: 'education',
      subCategory: 'jss1',
      content: 'i was flogged',
    };
    chai.request(server)
      .post('/entries')
      .set('x-access-token', token)
      .send(values)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.should.not.have.property('entry');
        done();
      });
  });
  it('should return 400 for PUT /entries with incomplete parameters', (done) => {
    const values = {
      category: 'education',
      subCategory: 'jss1',
      content: 'i was flogged',
    };
    chai.request(server)
      .put('/entries/1')
      .set('x-access-token', token)
      .send(values)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.should.not.have.property('entry');
        done();
      });
  });
  it('should return 200 for PUT /entries with complete parameters', (done) => {
    const values = {
      title: 'new teacher',
      category: 'education',
      subCategory: 'jss1',
      content: 'i was flogged',
    };
    chai.request(server)
      .put('/entries/1')
      .set('x-access-token', token)
      .send(values)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('success');
        res.body.should.have.property('entry');
        done();
      });
  });
  it('should return 401 for any entry endpoint without a token', (done) => {
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
  it('should return 200 for GET /entries/:id with a valid token', (done) => {
    chai.request(server)
      .get('/entries/1')
      .set('x-access-token', token)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('success');
        res.body.should.have.property('entry');
        res.body.should.not.have.property('error');
        done();
      });
  });
  it('should return 200 for GET /entries with a valid token', (done) => {
    chai.request(server)
      .get('/entries')
      .set('x-access-token', token)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('success');
        res.body.should.have.property('entries');
        res.body.should.not.have.property('error');
        done();
      });
  });
  it('should return 404 for GET /entries/:id with a valid token and unknown id', (done) => {
    chai.request(server)
      .get('/entries/100')
      .set('x-access-token', token)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.should.not.have.property('success');
        done();
      });
  });
  it('should return 404 for DELETE /entries/:id with a valid token and unknown id', (done) => {
    chai.request(server)
      .delete('/entries/4')
      .set('x-access-token', token)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.should.not.have.property('success');
        done();
      });
  });
  it('should return 200 for DELETE /entries/:id with a valid token and known id', (done) => {
    chai.request(server)
      .delete('/entries/1')
      .set('x-access-token', token)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('success');
        res.body.should.not.have.property('error');
        done();
      });
  });
});


