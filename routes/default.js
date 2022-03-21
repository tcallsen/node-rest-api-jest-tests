import express from 'express';
var router = express.Router();

// return 401 for any requests that reach this route
router.get('*', function(req, res, next) {
  res.sendStatus(401)
})

export default router;
