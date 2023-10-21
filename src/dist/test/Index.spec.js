// tests/app.test.js

const request = require('supertest');
const app = require('../app'); // Expressアプリケーションをインポート

describe('GET /', () => {
  it('responds with 200 OK', (done) => {
    request(app)
      .get('/')
      .expect(200, done);
  });
});