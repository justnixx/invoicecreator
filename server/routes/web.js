const express = require('express');
const invoice = require('../controllers/invoice');

const router = express.Router();

router.post('/create', invoice.createInvoice);

router.get('/download', invoice.sendInvoice);

module.exports = router;
