import express from 'express';
var router = express.Router();

/**
 * Any requests that reach this route will have an empty 401 response code returned.
 */
router.get('*', function(req, res, next) {
  res.sendStatus(401)
})

export default router;
