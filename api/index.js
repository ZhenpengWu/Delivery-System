const express = require('express');
const router = express.Router();

const customer = require('./customer');
const pkg = require('./package');
const status = require('./status');
const type = require('./type');
const city = require('./city');
const description = require('./description');

router.use('/customer', customer);
router.use('/package', pkg);
router.use('/status', status);
router.use('/type', type);
router.use('/city', city);
router.use('/description', description);

module.exports = router;
