const pdf = require('html-pdf');
const fs = require('fs');
const path = require('path');

const DefaultTemplate = require('../invoices/');

const publicTempDir = 'public/temp';

const rootDir = path.resolve(__dirname + '/../');

const createInvoice = (req, res) => {
  const invoiceData = JSON.parse(req.body.invoiceData);

  // TODO: validate

  // PDF options
  const options = {
    header: {
      height: '15mm',
      contents: '',
    },
    width: '800px',
    height: '16.5in',
    base: `file:///${rootDir}/${publicTempDir}/`,
    localUrlAccess: true,
    footer: {
      height: '15mm',
      contents:
        "<p style='text-align:center;margin-top:10px;'>" +
        Buffer.from('Q3JlYXRlZCBBdDogbml4eC5kZXY=', 'base64').toString('utf8') +
        '</p>',
    },
  };

  // Upload logo image
  if (req.files) {
    const companyLogo = req.files.companyLogo;
    const allowedExtensions = ['.png', '.jpg', '.jpeg'];
    const fileExtension = path.extname(companyLogo.name);
    const pathToSaveFile = `${publicTempDir}/invoiceLogo${fileExtension}`;

    // Validate file extension
    if (!allowedExtensions.includes(fileExtension.toLocaleLowerCase())) {
      return res.json({ msg: 'Unsupported file format' });
    }

    // Save file
    companyLogo.mv(pathToSaveFile, (err) => {
      if (err) return res.status(500).json(err);
    });

    // Update invoiceData - override company logo value
    invoiceData.details.companyLogo = `invoiceLogo${fileExtension}`;
  }

  // Create invoice and store it in the file system
  fs.writeFile(
    `${publicTempDir}/invoice.html`,
    DefaultTemplate(invoiceData).trim(),
    (err) => {
      if (err) return res.json(err);

      const invoiceHtml = fs.readFileSync(
        `${publicTempDir}/invoice.html`,
        'utf8'
      );

      pdf
        .create(invoiceHtml, options)
        .toFile(`${rootDir}/${publicTempDir}/invoice.pdf`, (err) => {
          if (err) res.json(err);

          res.json({ msg: 'Invoice created' });
        });
    }
  );
};

const sendInvoice = (req, res) => {
  res.sendFile(`${rootDir}/${publicTempDir}/invoice.pdf`);
};

module.exports = { createInvoice, sendInvoice };
