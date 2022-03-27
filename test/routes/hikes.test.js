import request from 'supertest';

import app from '../../app.js';

// unrelated to .mock() call below - using with .spyOn() in individual test
import * as hikeService from '../../services/hikeService.js';

// include manual mock of the hikingService module - https://jestjs.io/docs/manual-mocks
//  see full definition of manual mock in '../../services/__mocks__/hikeService.js'
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
  
  test('confirm hike time ranges used during getPhotosDuringHike()', async () => {
    
    jest.resetAllMocks();

    // mock getHike() method call with response specific to this test
    //  note: requies hikeService to be a valid ES6 module for this spy to be hoisted
    jest.spyOn(hikeService, 'getHike').mockImplementation(() => {
      return {
        "hikes": [
            {
                "route_id": 123,
                "title": "My Mocked Hike",
                "stats": {
                    "startTime": "2019-10-30T16:49:40Z",
                    "endTime": "2019-10-30T19:05:28Z"
                }
            }
        ]
      }
    });

    // spy on hikeService.getPhotosByTimeRange() with a mock implementation provided and 
    //  track spy reference in getPhotosByTimeRangeMock for assertions later in test
    const getPhotosByTimeRangeMock = jest.spyOn(hikeService, 'getPhotosByTimeRange').mockImplementation(async () => {
      return JSON.parse(fs.readFileSync('./test/resources/json/mock-get-hike-photos.json'));
    });
    
    await request(app).get("/hikes/123/photos");
    
    // confirm mock was called once - make sure to reset mocks inbetween tests otherwise
    //  .calls will include calls from all tests instead of just this one
    expect(getPhotosByTimeRangeMock.mock.calls.length).toBe(1);

    // confirm parameters passed to mocked function
    expect(getPhotosByTimeRangeMock.mock.calls[0][0]).toBe('2019-10-30T16:49:40Z');
    expect(getPhotosByTimeRangeMock.mock.calls[0][1]).toBe('2019-10-30T19:05:28Z');

  });

  test('Should return 400 if invalid /hikes/{id} supplied', async () => {
    const rootRouteResponse = await request(app).get("/hikes/invalid-hike-id");
    expect(rootRouteResponse.statusCode).toBe(400);
  });

  test('Should return 401 for non-supported routes', async () => {
    const rootRouteResponse = await request(app).get("/");
    expect(rootRouteResponse.statusCode).toBe(401);
    const invalidRouteResponse = await request(app).get("/invalid-route");
    expect(invalidRouteResponse.statusCode).toBe(401);
  });

  test('Should return 404 if /hikes/{id} not found', async () => {
    
    // mock Error response when hike not found 
    jest.spyOn(hikeService, 'getHike').mockImplementation(() => {
      const err = new Error('hike not found');
      err.status = 404;
      throw err;
    });
    
    const rootRouteResponse = await request(app).get("/hikes/123");
    expect(rootRouteResponse.statusCode).toBe(404);
  });
  
});