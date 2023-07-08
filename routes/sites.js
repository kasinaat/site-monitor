var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('List of Sites');
});

router.get('/new', function(req, res, next) {
  console.log(req);
})
module.exports = router;
