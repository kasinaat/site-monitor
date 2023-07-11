var express = require('express');
var router = express.Router();
const siteController = require('../controllers/sites');
/* GET users listing. */
router.get('/', siteController.get);

router.post('/create', siteController.create);

module.exports = router;
