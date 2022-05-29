// tests/unit/app.test.js

const request = require('supertest');

const app = require('../../src/app');
describe('GET /v2', () => {
  // If the request is missing the Authorization header, it should be forbidden
  test('404 not found', () => request(app).get('/v2').expect(404));
});



