const { Router } = require('express');

const router = require('express').Router();
const hosts = require('./hosts');

router.use('/host', hosts)
module.exports = router;