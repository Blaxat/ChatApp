const express = require('express');
const { createRFID, getRFID, updateRFID, deleteRFID, requestOTP, verifyRfid } = require('../controllers/rfidController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

router.use(requireAuth);

router.post('/', createRFID);

router.get('/', getRFID);

router.put('/', updateRFID);

router.delete('/', deleteRFID);

router.post('/otp', requestOTP);

router.post('/rfid', verifyRfid);

module.exports = router;
