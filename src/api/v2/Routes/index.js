const { Router } = require('express');

const router = require('express').Router();
const status = require('./status');
const ping = require('./ping');

router.use('/status', status)
router.use('/ping', ping)
module.exports = router;