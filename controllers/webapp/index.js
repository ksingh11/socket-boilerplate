var router = require('express').Router();
var appController = require('./appController');


/**
 * Define routes here:
 */
router.get('/', appController.renderIndexPage);


/**
 * module exports: default router
 */
module.exports = router;
