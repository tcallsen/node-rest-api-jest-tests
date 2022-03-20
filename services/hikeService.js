const { request, gql } = require('graphql-request');

const getRecentHikes = async function() {

  const query = gql`
    {
      routes_public(limit: 3, order_by: {route_id: desc}) {
        date_created
        date_end
        date_start
        description
        original_filename
        photo_ids
        route_id
        stats
        title
      }
    }
  `;

  return request('https://taylor.callsen.me/api/photo/graphql', query);

}

module.exports = {
  getRecentHikes,
}