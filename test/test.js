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
      .post('/api/v1/auth/signup')
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
      .post('/api/v1/auth/signup')
      .send(values)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('message');
        done();
      });
  });
    it('should Return 400 for invalid email format', (done) => {
        const values = {
            email: 'migmail.com',
            password: 'georgina1',
            name: 'mr john doe',
        };
        chai.request(server)
            .post('/api/v1/auth/signup')
            .send(values)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.have.property('message');
                done();
            });
    });
  it('Login an existing user', (done) => {
    const values = {
      email: 'me2@gmail.com',
      password: 'password',
    };
    chai.request(server)
      .post('/api/v1/auth/login')
      .send(values)
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        res.body.should.have.property('user');
        res.body.should.have.property('token');
        done();
      });
  });
  it('Return 401 for invalid email during login', (done) => {
    const values = {
      email: 'g@gmail.com',
      password: 'password',
    };
    chai.request(server)
      .post('/api/v1/auth/login')
      .send(values)
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('message');
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
      .post('/api/v1/auth/login')
      .send(values)
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('message');
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
      .post('/api/v1/entries')
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
  it('should return 400 for create entry endpoint with an invalid token', (done) => {
    const values = {
      title: 'me and teacher',
      category: 'education',
      subCategory: 'jss1',
      content: 'i was flogged',
    };
    chai.request(server)
      .post('/api/v1/entries')
      .set('x-access-token', 'bhbhbdvhfvhfvbfhbvfvbhvbfh')
      .send(values)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.not.have.property('entry');
        done();
      });
  });
  it('should return 400 for put entry endpoint with an invalid token', (done) => {
    const values = {
      title: 'me and teacher',
      category: 'education',
      subCategory: 'jss1',
      content: 'i was flogged',
    };
    chai.request(server)
      .put('/api/v1/entries/1')
      .set('x-access-token', 'bhbhbdvhfvhfvbfhbvfvbhvbfh')
      .send(values)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.not.have.property('entry');
        done();
      });
  });
  it('should return 400 for get entry endpoint with an invalid token', (done) => {
    chai.request(server)
      .get('/api/v1/entries/1')
      .set('x-access-token', 'bhbhbdvhfvhfvbfhbvfvbhvbfh')
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.not.have.property('entry');
        done();
      });
  });
  it('should return 400 for delete entry endpoint with an invalid token', (done) => {
    chai.request(server)
      .delete('/api/v1/entries/1')
      .set('x-access-token', 'bhbhbdvhfvhfvbfhbvfvbhvbfh')
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.not.have.property('entry');
        done();
      });
  });
  it('should return 400 for delete entry endpoint with an invalid id', (done) => {
    chai.request(server)
      .delete('/api/v1/entries/id')
      .set('x-access-token', token)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.not.have.property('entry');
        done();
      });
  });
  it('should return 400 for get entry endpoint with an invalid id', (done) => {
    chai.request(server)
      .get('/api/v1/entries/id')
      .set('x-access-token', token)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.not.have.property('entry');
        done();
      });
  });
  it('should return 400 for put entry endpoint with an invalid token', (done) => {
    const values = {
      title: 'me and teacher',
      category: 'education',
      subCategory: 'jss1',
      content: 'i was flogged',
    };
    chai.request(server)
      .put('/api/v1/entries/1')
      .set('x-access-token', 'bhbhbdvhfvhfvbfhbvfvbhvbfh')
      .send(values)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.not.have.property('entry');
        done();
      });
  });
  it('should return 400 for get entry endpoint with an invalid token', (done) => {
    chai.request(server)
      .get('/api/v1/entries/1')
      .set('x-access-token', 'bhbhbdvhfvhfvbfhbvfvbhvbfh')
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.not.have.property('entry');
        done();
      });
  });
  it('should return 400 for delete entry endpoint with an invalid token', (done) => {
    chai.request(server)
      .delete('/api/v1/entries/1')
      .set('x-access-token', 'bhbhbdvhfvhfvbfhbvfvbhvbfh')
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.not.have.property('entry');
        done();
      });
  });
  it('should return 400 for delete entry endpoint with an invalid id', (done) => {
    chai.request(server)
      .delete('/api/v1/entries/id')
      .set('x-access-token', token)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.not.have.property('entry');
        done();
      });
  });
  it('should return 400 for get entry endpoint with an invalid id', (done) => {
    chai.request(server)
      .get('/api/v1/entries/id')
      .set('x-access-token', token)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
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
      .post('/api/v1/entries')
      .set('x-access-token', token)
      .send(values)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.not.have.property('entry');
        done();
      });
  });
  it('should return 400 for POST /entries with an empty parameter', (done) => {
    const values = {
      title: '',
      category: 'education',
      subCategory: 'jss1',
      content: 'i was flogged',
    };
    chai.request(server)
      .post('/api/v1/entries')
      .set('x-access-token', token)
      .send(values)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
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
      .put('/api/v1/entries/1')
      .set('x-access-token', token)
      .send(values)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
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
      .put('/api/v1/entries/1')
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
  it('should return 400 for any entry endpoint without a token', (done) => {
    chai.request(server)
      .get('/api/v1/entries')
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.not.have.property('entries');
        done();
      });
  });
  it('should return 200 for GET /entries/:id with a valid token', (done) => {
    chai.request(server)
      .get('/api/v1/entries/1')
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
      .get('/api/v1/entries')
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
      .get('/api/v1/entries/100')
      .set('x-access-token', token)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        done();
      });
  });
  // it('should return 404 for DELETE /entries/:id with a valid token and unknown id', (done) => {
  //   chai.request(server)
  //     .delete('/api/v1/entries/4')
  //     .set('x-access-token', token)
  //     .end((err, res) => {
  //       res.should.have.status(404);
  //       res.body.should.be.a('object');
  //       res.body.should.have.property('message');
  //       res.body.should.have.property('success');
  //       done();
  //     });
  // });
  // it('should return 200 for DELETE /entries/:id with a valid token and known id', (done) => {
  //   chai.request(server)
  //     .delete('/api/v1/entries/1')
  //     .set('x-access-token', token)
  //     .end((err, res) => {
  //       res.should.have.status(200);
  //       res.body.should.be.a('object');
  //       res.body.should.have.property('message');
  //       res.body.should.not.have.property('error');
  //       done();
  //     });
  // });

});


