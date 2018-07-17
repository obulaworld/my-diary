import Request from 'request';
import install from 'jasmine-es6';
import app from '../server';

install();


describe('Server', () => {
  let server;
  beforeAll(() => {
    server = app;
  });
  afterAll(() => {
    server.close();
  });
  describe('GET /api/v1/entries', () => {
    let data = {};
    beforeAll((done) => {
      Request.get('http://localhost:3000/api/v1/entries', (error, response, body) => {
        data.statusCode = response.statusCode;
        data.body = body;
        done();
      });
    });
    it('Status code to be 200', () => {
      expect(data.statusCode).toBe(200);
    });
  });
});
