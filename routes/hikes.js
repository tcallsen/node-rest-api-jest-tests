import express from 'express';
var router = express.Router();

import { getHike, getRecentHikes, getPhotosDuringHike } from '../services/hikeService.js';

// returns a list of recent hikes
router.get('/', async function(req, res, next) {
  const hikes = await getRecentHikes();
  res.json(hikes);
});

router.get('/:hikeId', async function(req, res, next) {
  
  if (!req.params.hikeId || isNaN(req.params.hikeId)) {
    const err = new Error('required /hikes/:hikeId/ must an integer');
    err.status = 400;
    return next(err);
  }

  let hikes;
  try {
    hikes = await getHike(req.params.hikeId);
  } catch (err) {
    return next(err);
  }

  res.json(hikes);

});

router.get('/:hikeId/photos', async function(req, res, next) {
  
  if (!req.params.hikeId || isNaN(req.params.hikeId)) {
    const err = new Error('required /hikes/:hikeId/ id must an integer');
    err.status = 400;
    return next(err);
  }

  let photos;
  try {
    photos = await getPhotosDuringHike(req.params.hikeId);
  } catch (err) {
    return next(err);
  }

  res.json(photos);

});

export default router;
