import express from 'express';
var router = express.Router();

import { getHike, getRecentHikes } from '../services/hikeService.js';
import { getPhotosDuringHike } from '../utils/hikeUtils.js';

/**
 * Express API route returning a list of recent hikes from the Hike Service.
 * 
 * @returns {Object} Object with a 'hikes' property containing a list of recent hikes.
 */
router.get('/', async function(req, res, next) {
  const hikes = await getRecentHikes();
  res.json(hikes);
});

/**
 * Express API route returning details about the requested hike. The 'hikeId' URL parameter
 * is required and must be an integer.
 * 
 * @returns {Object} Object with a 'hikes' property containing a list of a single Object 
 *  with properties describing the requested hike.
 * @throws Error object forwarded to Express with 400 status code if the 'hikeId' URL paramater
 *  is not supplied or is not a valid integer.
 */
router.get('/:hikeId', async function(req, res, next) {
  
  // validate 'hikeId' URL param
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

/**
 * Express API route returning photos taken duering the requested hike. The 'hikeId' URL parameter
 * is required and must be an integer.
 * 
 * @returns {Object} Object with a 'photos' property containing a list of photo Objects taken
 *  during the requested hike.
 * @throws Error object forwarded to Express with 400 status code if the 'hikeId' URL paramater
 *  is not supplied or is not a valid integer.
 */
router.get('/:hikeId/photos', async function(req, res, next) {
  
  // validate 'hikeId' URL param
  if (!req.params.hikeId || isNaN(req.params.hikeId)) {
    const err = new Error('required /hikes/:hikeId/ id must an integer');
    err.status = 400;
    return next(err);
  }

  // surround in try/catch to forward any Errors on to Express
  let photos;
  try {
    photos = await getPhotosDuringHike(req.params.hikeId);
  } catch (err) {
    return next(err);
  }

  res.json(photos);

});

export default router;
