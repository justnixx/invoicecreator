import { useState } from 'react';
import Card from '../Card';
import styles from './form.module.scss';
import Grid from '../Grid';
import { Tooltip } from 'react-tooltip';

// Supported currencies
const currencies = [
  { code: 'USD', name: 'Dollar', symbol: '$', country: 'United States' },
  { code: 'GBP', name: 'Pound', symbol: '£', country: 'United Kingdom' },
  { code: 'EUR', name: 'Euro', symbol: '€', country: 'Euro Member' },
  { code: 'NGN', name: 'Naira', symbol: '₦', country: 'United States' },
];

const ITEM_MAX_COUNT = 10; // maximum number of line items allowed

export default function Form({ onSubmit }) {
  // Form state
  const [invoiceData, setInvoiceData] = useState({
    details: {
      companyLogo: '',
      compTempLogo: '',
      currency: '',
      companyName: '',
      companyAddress: '',
      invoiceNumber: Math.floor(Math.random() * (9999 - 1000) + 1000),
      invoiceDate: new Date().toISOString().substring(0, 10),
      billingName: '',
      billingAddress: '',
      shippingName: '',
      shippingAddress: '',
    },
    lineItems: [{ quantity: 1, description: '', price: 0.0 }],
  });

  // Destructure the current logo in the state
  const {
    details: { compTempLogo },
  } = invoiceData;

  // Adds a new line item
  const addLineItem = () => {
    setInvoiceData((prevState) => ({
      ...prevState,
      lineItems: [
        ...invoiceData.lineItems,
        { quantity: 1, description: '', price: 0.0 },
      ],
    }));
  };

  // Removes a line item
  const removeLineItem = (index) => {
    const lineItems = [...invoiceData.lineItems];
    if (lineItems.length === 1) return;
    lineItems.splice(index, 1);
    setInvoiceData((prevState) => ({ ...prevState, lineItems }));
  };

  // Handles onchange event on input fields
  const handleOnchange = ({ target: { name, value, files } }, index) => {
    const details = { ...invoiceData.details };
    const lineItems = [...invoiceData.lineItems];

    if (details.hasOwnProperty(name)) {
      if (files) {
        const [file] = files;
        const tempFileUrl = URL.createObjectURL(file);
        details[name] = file;
        details['compTempLogo'] = tempFileUrl;
      } else {
        details[name] = value;
      }
    } else {
      lineItems[index][name] = value;
    }

    setInvoiceData((prevState) => ({ ...prevState, details, lineItems }));
  };

  // Submits invoice data
  const handleOnSubmit = (e) => {
    e.preventDefault();

    // TODO: validate

    onSubmit(invoiceData);
  };

  return (
    <Card>
      <form method="POST" className={styles.form} onSubmit={handleOnSubmit}>
        <Grid>
          <div className={styles.invoice_details}>
            <h2>Invoice Details</h2>
            <fieldset>
              <legend>From</legend>
              <div className={styles.input_group}>
                <div styles={{ marginBottom: '20px' }}>
                  <label
                    htmlFor="currency"
                    styles={{ display: 'block', marginBottom: '8px' }}
                  >
                    Choose currency
                  </label>
                  <select
                    defaultValue="DEFAULT"
                    id="currency"
                    name="currency"
                    onChange={handleOnchange}
                  >
                    <option value="DEFAULT" disabled>
                      Choose currency
                    </option>
                    {currencies.map((currency, index) => (
                      <option key={index} value={currency.code}>
                        {currency.name} {`(${currency.symbol})`}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  {compTempLogo && (
                    <img
                      className={styles.company_logo}
                      src={compTempLogo}
                      alt="Company logo"
                    />
                  )}
                  <label
                    className={styles.file_upload_wrapper}
                    htmlFor="companyLogo"
                  >
                    <input
                      type="file"
                      id="companyLogo"
                      name="companyLogo"
                      accept="image/*"
                      onChange={handleOnchange}
                    />
                    {compTempLogo ? 'Choose a different logo' : 'Upload a logo'}
                  </label>
                </div>
              </div>
              <div className={styles.input_group}>
                <div>
                  <label htmlFor="companyName">Company name</label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    placeholder="Company name"
                    value={invoiceData.details.companyName}
                    onChange={handleOnchange}
                  />
                </div>
                <div>
                  <label htmlFor="companyAddress">Company address</label>
                  <input
                    type="text"
                    id="companyAddress"
                    name="companyAddress"
                    placeholder="Company address"
                    value={invoiceData.details.companyAddress}
                    onChange={handleOnchange}
                  />
                </div>
              </div>
            </fieldset>
            <fieldset>
              <legend>Invoice</legend>
              <div className={styles.input_group}>
                <div>
                  <label htmlFor="invoiceNumber">Invoice number</label>
                  <input
                    type="number"
                    id="invoiceNumber"
                    name="invoiceNumber"
                    placeholder="Invoice number"
                    value={invoiceData.details.invoiceNumber}
                    onChange={handleOnchange}
                  />
                </div>
                <div>
                  <label htmlFor="invoiceDate">Invoice date</label>
                  <input
                    type="date"
                    id="invoiceDate"
                    name="invoiceDate"
                    placeholder="Invoice date"
                    value={invoiceData.details.invoiceDate}
                    onChange={handleOnchange}
                  />
                </div>
              </div>
            </fieldset>
            <fieldset>
              <legend>Bill To</legend>
              <div className={styles.input_group}>
                <div>
                  <label htmlFor="customerNamer">Customer name</label>
                  <input
                    type="text"
                    id="customerNamer"
                    name="billingName"
                    placeholder="Customer name"
                    value={invoiceData.details.billingName}
                    onChange={handleOnchange}
                  />
                </div>
                <div>
                  <label htmlFor="customer Address">Customer address</label>
                  <input
                    type="text"
                    id="customer Address"
                    name="billingAddress"
                    placeholder="Customer address"
                    value={invoiceData.details.billingAddress}
                    onChange={handleOnchange}
                  />
                </div>
              </div>
            </fieldset>
            <fieldset>
              <legend>Ship To</legend>
              <div className={styles.input_group}>
                <div>
                  <label htmlFor="receiverName">Receiver name</label>
                  <input
                    type="text"
                    id="receiverName"
                    name="shippingName"
                    placeholder="Receiver name"
                    value={invoiceData.details.shippingName}
                    onChange={handleOnchange}
                  />
                </div>
                <div>
                  <label htmlFor="receiverAddress">Receiver address</label>
                  <input
                    type="text"
                    id="receiverAddress"
                    name="shippingAddress"
                    placeholder="Receiver address"
                    value={invoiceData.details.shippingAddress}
                    onChange={handleOnchange}
                  />
                </div>
              </div>
            </fieldset>
          </div>
          <div className={styles.invoice_items}>
            <h2>Line Items</h2>
            {/* Render Line Items */}
            {invoiceData.lineItems.map((item, index) => (
              <div key={index} className={styles.item}>
                <input
                  data-tooltip-id={`input-${index}`}
                  data-tooltip-content="Quantity"
                  type="number"
                  min="1"
                  name="quantity"
                  placeholder="Quantity"
                  value={item.quantity}
                  onChange={(e) => handleOnchange(e, index)}
                />
                <input
                  data-tooltip-id={`input-${index}`}
                  data-tooltip-content="Description"
                  type="text"
                  name="description"
                  placeholder="Description"
                  value={item.description}
                  onChange={(e) => handleOnchange(e, index)}
                />
                <input
                  data-tooltip-id={`input-${index}`}
                  data-tooltip-content="Price"
                  type="number"
                  min="1"
                  step=".01"
                  name="price"
                  placeholder="Price"
                  value={item.price}
                  onChange={(e) => handleOnchange(e, index)}
                />
                <Tooltip id={`input-${index}`} />
                <button
                  type="button"
                  onClick={() => {
                    removeLineItem(index);
                  }}
                >
                  -
                </button>
              </div>
            ))}
            {invoiceData.lineItems.length < ITEM_MAX_COUNT && (
              <button type="button" onClick={addLineItem}>
                Add item +
              </button>
            )}
          </div>
        </Grid>
        <button>Create & Download</button>
      </form>
    </Card>
  );
}
