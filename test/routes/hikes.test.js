const request = require('supertest');
const app = require('../../app');

describe('Hikes Route Tests', () => {

  test('Should return a list of hikes', async () => {
    const response = await request(app).get("/hikes");
    expect(response.statusCode).toBe(200);
  });

  
  test('Should return 401 for non-supported routes', async () => {
    const rootRouteResponse = await request(app).get("/");
    expect(rootRouteResponse.statusCode).toBe(401);
    const invalidRouteResponse = await request(app).get("/invalid-route");
    expect(invalidRouteResponse.statusCode).toBe(401);
  });
  
});