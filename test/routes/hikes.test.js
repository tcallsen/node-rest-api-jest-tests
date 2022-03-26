import request from 'supertest';

import app from '../../app.js';

// manual mock of an entire module
//  https://jestjs.io/docs/manual-mocks
jest.mock('../../services/hikeService.js');

describe('Hikes Route Tests', () => {

  test('/hikes should return a list of hikes', async () => {
    const response = await request(app).get("/hikes");
    expect(response.statusCode).toBe(200);
    expect(response.body.hikes.length).toBe(3);
  });

  test('/hikes/{id} should return details about a hike', async () => {
    const response = await request(app).get("/hikes/123");
    expect(response.statusCode).toBe(200);
    expect(response.body.hikes.length).toBe(1);
    expect(response.body.hikes[0].route_id).toBe(123);
    expect(response.body.hikes[0].title).toBe('Hightower Demo Ride');
  });

  test('/hikes/{id}/photos should return a list of photos', async () => {
    const response = await request(app).get("/hikes/123/photos");
    expect(response.statusCode).toBe(200);
    expect(response.body.photos.length).toBe(2);
  });
  
  test('Should return 401 for non-supported routes', async () => {
    const rootRouteResponse = await request(app).get("/");
    expect(rootRouteResponse.statusCode).toBe(401);
    const invalidRouteResponse = await request(app).get("/invalid-route");
    expect(invalidRouteResponse.statusCode).toBe(401);
  });
  
});