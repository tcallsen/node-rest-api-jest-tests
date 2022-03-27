import { getHike, getPhotosByTimeRange } from '../services/hikeService.js';

/**
 * Retrieves a list of photos taken during the specified hike.
 * 
 * @param {number} hikeId Id of the hike being requested.
 * @returns list of photos taken during the supplied timeframe.
 * @throws Error object with a 404 status code assigned if the hike cannot be found (bubbling
 *  up from the getHike() call).
 */
const getPhotosDuringHike = async function(hikeId) {

  const hikeResponse = await getHike(hikeId);
  const hike = hikeResponse.hikes[0]; // take first hike

  return getPhotosByTimeRange(hike.stats.startTime, hike.stats.endTime);

}

export {
  getPhotosDuringHike,
}