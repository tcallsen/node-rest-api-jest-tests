import { request, gql } from 'graphql-request';

const GRAPHQL_API_ENDPOINT = 'https://taylor.callsen.me/api/photo/graphql';

/**
 * Queries the GraphQL endpoint and returns 5 recent hikes.
 * 
 * @returns {Object} Object containing data about recent hikes.
 */
const getRecentHikes = async function() {

  const query = gql`
    {
      hikes: routes_public(limit: 5, order_by: {route_id: desc}) {
        route_id
        title
        date_created
        stats
      }
    }
  `;

  return request(GRAPHQL_API_ENDPOINT, query);

}

/**
 * Queries the GraphQL endpoint and returns data about the requested hike.
 * 
 * @param {number} hikeId Id of the hike to look-up.
 * @returns {Object} Object containing data about the requested hike.
 * @throws Error object with a 404 status code assigned if the hike cannot be found.
 */
const getHike = async function(hikeId) {

  const query = gql`
    {
      hikes: routes_public(where: {route_id: {_eq: ${hikeId}}}) {
        route_id
        title
        date_created
        stats
      }
    }
  `;

  const hikeResponse = await request(GRAPHQL_API_ENDPOINT, query);
  
  if (!hikeResponse.hikes.length) {
    const err = new Error('hike not found');
    err.status = 404;
    throw err;
  }

  return hikeResponse;

}

/**
 * Queries the GraphQL endpoint and returns photos taken during the supplied timeframe.
 * 
 * @param {string} startTime start time of the returned photo set.
 * @param {string} endTime end time of the returned photo set.
 * @returns list of photos taken during the supplied timeframe.
 */
const getPhotosByTimeRange = async function(startTime, endTime) {

  const query = gql`
    {
      photos: photos_public(limit: 10, where: {_and: {meta_date_taken: {_gte: "${startTime}", _lte: "${endTime}"}}}) {
        photo_id
        title
        date_added
        meta_date_taken
        meta_geom
        original_filename
      }
    }
  `;

  return request(GRAPHQL_API_ENDPOINT, query);

}

export {
  getRecentHikes,
  getHike,
  getPhotosByTimeRange,
}