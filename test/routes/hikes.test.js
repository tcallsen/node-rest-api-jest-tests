import request from 'supertest';

import app from '../../app.js';
import * as hikeService from '../../services/hikeService.js';

describe('Hikes Route Tests', () => {

  test('Should return a list of hikes', async () => {
    const getRecentHikesMock = jest.spyOn(hikeService, 'getRecentHikes').mockImplementation(() => Promise.resolve({hikes: []}));
    
    const response = await request(app).get("/hikes");
    expect(response.statusCode).toBe(200);
    expect(response.body.hikes.length).toBe(0);
    // expect(getRecentHikesMock).toHaveBeenCalledTimes(1);
  });
  
  test('Should return 401 for non-supported routes', async () => {
    const rootRouteResponse = await request(app).get("/");
    expect(rootRouteResponse.statusCode).toBe(401);
    const invalidRouteResponse = await request(app).get("/invalid-route");
    expect(invalidRouteResponse.statusCode).toBe(401);
  });
  
});