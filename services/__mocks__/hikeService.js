import fs from 'fs';

const hikeService = jest.createMockFromModule('../hikeService.js');

hikeService.getRecentHikes = jest.fn(async () => {
  return JSON.parse(fs.readFileSync('./test/resources/json/mock-get-recent-hikes.json'));
});

hikeService.getHike = jest.fn(async () => {
  return JSON.parse(fs.readFileSync('./test/resources/json/mock-get-hike.json'));
});

hikeService.getPhotosByTimeRange = jest.fn(async () => {
  return JSON.parse(fs.readFileSync('./test/resources/json/mock-get-hike-photos.json'));
});

// must be exported as a CommonJS module, otherwise would require use of '__esModule: true' on .mock() calls in tests
//  https://jestjs.io/docs/jest-object#jestmockmodulename-factory-options
module.exports = hikeService;