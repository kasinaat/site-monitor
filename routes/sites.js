const express = require('express');

const router = express.Router();

const siteController = require('../controllers/sites');

router.get('/', siteController.get);

router.post('/create', siteController.create);

router.delete('/remove/:siteId', siteController.remove);

router.put('/modify/:siteId', siteController.modify);

module.exports = router;
