var express = require('express');
var router = express.Router();
const siteController = require('../controllers/sites');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('List of Sites');
});

router.get('/create', siteController.create);

module.exports = router;
