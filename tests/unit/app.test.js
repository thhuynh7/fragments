// tests/unit/app.test.js

const request = require('supertest');
const app = require('../../src/app');
describe('GET /v99', () => {
  // If the request is missing the Authorization header, it should be forbidden
  test('404 not found', () => request(app).get('/v99').expect(404));
});



