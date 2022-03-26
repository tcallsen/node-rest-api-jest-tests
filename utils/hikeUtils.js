import { getHike, getPhotosByTimeRange } from '../services/hikeService.js';

const getPhotosDuringHike = async function(hikeId) {

  const hikeResponse = await getHike(hikeId);
  const hike = hikeResponse.hikes[0]; // take first hike

  return getPhotosByTimeRange(hike.stats.startTime, hike.stats.endTime);

}

export {
  getPhotosDuringHike,
}