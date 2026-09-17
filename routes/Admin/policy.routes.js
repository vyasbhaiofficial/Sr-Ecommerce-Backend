const express = require('express');
const router = express.Router();
const policyController = require('../../controller/Admin/policy.controller');

router.post('/', policyController.addPolicy);
router.get('/', policyController.getPolicies);
router.get('/:id', policyController.getPolicy);
router.put('/:id', policyController.updatePolicy);
router.delete('/:id', policyController.deletePolicy);

module.exports = router;
