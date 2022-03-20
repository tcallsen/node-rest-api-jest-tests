var express = require('express');
var router = express.Router();

const { getRecentHikes } = require('../services/hikeService');

// returns a list of available hikes
router.get('/', async function(req, res, next) {
  const hikes = await getRecentHikes();
  res.json(hikes);
});

module.exports = router;
