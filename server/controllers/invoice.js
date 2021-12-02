import pdf from "html-pdf";
import path from "path";

import DefaultTemplate from "../invoices/index.js";

const __dirname = path.resolve();

const publicTempDir = "/public/temp";

export const createInvoice = (req, res) => {
  const invoiceData = JSON.parse(req.body.invoiceData);

  // PDF options
  const options = {
    header: {
      height: "15mm",
      contents: "",
    },
    footer: {
      height: "15mm",
      contents:
        "<p style='text-align:center;margin-top:10px;'>" +
        Buffer.from("UG93ZXJlZCBieSBuaXh4LmRldg==", "base64").toString("utf8") +
        "</p>",
    },
  };

  // Upload logo image
  if (req.files) {
    console.log("Has file");
    const companyLogo = req.files.companyLogo;
    const allowedExtensions = [".png", ".jpg", ".jpeg"];
    const fileExtension = path.extname(companyLogo.name);
    const pathToSaveFile = `${__dirname}${publicTempDir}/invoiceLogo${fileExtension}`;

    // Validate file extension
    if (!allowedExtensions.includes(fileExtension.toLocaleLowerCase())) {
      return res.send(Promise.reject("Unsupported file format"));
    }

    // Save file
    companyLogo.mv(pathToSaveFile, (err) => {
      if (err) return res.status(500).send(Promise.reject(err));
    });

    // Update invoiceData - override company logo value
    invoiceData.details.companyLogo = `invoiceLogo${fileExtension}`;
  }

  // Create invoice and store it in the file system
  pdf
    .create(DefaultTemplate(invoiceData).trim(), options)
    .toFile(`${__dirname}${publicTempDir}/invoice.pdf`, (err) => {
      if (err) res.send(Promise.reject(err));

      res.send(Promise.resolve("CREATED"));
    });
};

export const sendInvoice = (req, res) => {
  res.sendFile(`${__dirname}${publicTempDir}/invoice.pdf`);
};
