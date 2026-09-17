const express = require('express');
const router = express.Router();
const policyController = require('../../controller/User/policy.controller');

router.get('/', policyController.getPolicies);

module.exports = router;
