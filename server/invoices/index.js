require('dotenv').config();

/***********************************
 *  DEFAULT TEMPLATE
 **********************************/
const path = require('path');
const { moneyFormat } = require('../utils');
const rootDir = path.resolve(__dirname + '/../');

module.exports = DefaultTemplate = ({
  details: {
    currency,
    companyLogo,
    companyName,
    companyAddress,
    invoiceNumber,
    invoiceDate,
    billingName,
    billingAddress,
    shippingName,
    shippingAddress,
  },
  lineItems,
}) => {
  const defaultLogo = process.env.DEFAULT_LOGO_URI;

  const imageSrc = companyLogo
    ? `file://${rootDir}/public/temp/${companyLogo}`
    : null;

  let itemsPurchased = '';
  let total = 0;

  lineItems.forEach((item) => {
    const amount = Number(parseInt(item.quantity) * parseFloat(item.price));

    itemsPurchased += `<tr>
    <td>${item.quantity}</td>
    <td>${item.description}</td>
    <td>${moneyFormat(currency, item.price)}</td>
    <td><b>${moneyFormat(currency, amount)}</b></td>
  </tr>`;

    total += amount;
  });

  return `<!doctype html>
  <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1.0" />
      <style>
        @import url("https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;1,200&display=swap");
        * {
        margin: 0;
        padding: 0;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        }

        body {
        color: #333;
        font-family: 'Montserrat', sans-serif;
        line-height: 1.8;
        }

        .container {
        max-width: 800px;
        margin: auto;
        padding: 12px;
        background-color: rgba(241, 239, 239, 0.369);
        }

        .outer-table {
        width: 100%;
        border-collapse: collapse;
        }
        .outer-table .logo {
        width: 100%;
        max-width: 156px;
        }
        .outer-table h1,
        .outer-table h2 {
        font-weight: 300;
        }
        .outer-table h1 {
        text-transform: capitalize;
        }
        .outer-table h2 {
        text-transform: uppercase;
        }
        .outer-table thead th {
        height: 70px;
        padding: 14px;
        }
        .outer-table thead th:first-child {
        text-align: left;
        }
        .outer-table thead th:last-child {
        text-align: right;
        }
        .outer-table thead:last-of-type {
        border-bottom: 2px solid rgba(212, 35, 35, 0.122);
        }
        .outer-table thead:last-of-type th {
        background-color: #fff;
        color: inherit;
        }
        .outer-table thead:last-of-type th:last-child {
        text-align: right;
        }

        .inner-table {
        width: 100%;
        border-collapse: collapse;
        text-align: left;
        }
        .inner-table thead th {
        padding: 10px 14px;
        }
        .inner-table tbody tr:nth-child(even) {
        background-color: #f2f2f2;
        }
        .inner-table tbody tr td {
        padding: 10px 14px;
        }
        .inner-table tbody tr:last-of-type {
        border-bottom: 2px solid rgba(212, 35, 35, 0.122);
        }

        footer > div:first-of-type > div {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -ms-flex-direction: column;
        flex-direction: column;
        float: right;
        padding-top: 10px;
        }
        footer > div:first-of-type::after {
        display: block;
        content: "";
        clear: right;
        }
        footer > div:last-of-type {
        margin-top: 50px;
        text-align: center;
        }
      </style>
      <title>Default Template</title>
    </head>
  
    <body>
      <div class="container">
        <table class="outer-table">
          <thead>
            <tr>
              <th>
                <img
                  class="logo"
                  src="${imageSrc ? imageSrc : defaultLogo}"
                  alt="Logo"
                />
                <h1>${companyName}</h1>
                <p>${companyAddress.split('/').join('<br />')}</p>
              </th>
              <th>
                <h2>Invoice</h2>
                <p>${invoiceNumber}</p>
                <p>${invoiceDate}</p>
              </th>
            </tr>
          </thead>
          <thead>
            <tr>
              <th>
                <h2>Bill TO</h2>
                <p>${billingName}</p>
                <p>${billingAddress.split('/').join('<br />')}</p>
              </th>
              <th>
                <h2>Ship To</h2>
                <p>${shippingName}</p>
                <p>${shippingAddress.split('/').join('<br />')}</p>
              </th>
            </tr>
          </thead>
          <tbody>
            <table class="inner-table">
              <thead>
                <tr>
                  <th>Quantity</th>
                  <th>Description</th>
                  <th>Unit Price</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
               ${itemsPurchased}
              </tbody>
            </table>
          </tbody>
        </table>
        <footer>
          <div>
            <div>
              <p>
              <strong>Sum:</strong> <b>${moneyFormat(currency, total)}</b>
              </p>
              <p>
              <strong>Total:</strong> <b>${moneyFormat(currency, total)}</b>
              </p>
            </div>
          </div>
          <div>
            <p>${''}</p>
          </div>
        </footer>
      </div>
    </body>
  </html>
  `;
};
