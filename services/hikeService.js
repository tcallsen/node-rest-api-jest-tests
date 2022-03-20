const { request, gql } = require('graphql-request');

const GRAPHQL_API_ENDPOINT = 'https://taylor.callsen.me/api/photo/graphql';

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

const getRecentHikes = async function() {

  const query = gql`
    {
      hikes: routes_public(limit: 3, order_by: {route_id: desc}) {
        route_id
        title
        date_created
        stats
      }
    }
  `;

  return request(GRAPHQL_API_ENDPOINT, query);

}

const getPhotosDuringHike = async function(hikeId) {

  const hikeResponse = await getHike(hikeId);
  const hike = hikeResponse.hikes[0]; // take first hike

  const query = gql`
    {
      photos: photos_public(limit: 10, where: {_and: {meta_date_taken: {_gte: "${hike.stats.startTime}", _lte: "${hike.stats.endTime}"}}}) {
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

module.exports = {
  getHike,
  getRecentHikes,
  getPhotosDuringHike,
}