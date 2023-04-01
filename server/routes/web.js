const express = require('express');
const { createInvoice, sendInvoice } = require('../controllers/invoice.js');

const router = express.Router();

router.post('/create', createInvoice);

router.get('/download', sendInvoice);

module.exports = router;
