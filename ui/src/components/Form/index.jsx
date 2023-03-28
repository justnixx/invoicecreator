import { useState } from 'react';
import Card from '../Card';
import styles from './form.module.scss';
import Grid from '../Grid';

export default function Form({ onSubmit }) {
  // Form state
  const [invoiceData, setInvoiceData] = useState({
    details: {
      companyLogo: '',
      companyLogoTemp: '',
      currency: '',
      companyName: '',
      companyAddress: '',
      invoiceNumber: '10001',
      invoiceDate: '',
      billingName: '',
      billingAddress: '',
      shippingName: '',
      shippingAddress: '',
    },
    inputItems: [{ quantity: '', description: '', price: '' }],
  });

  // Supported currencies
  const currencies = [
    { code: 'USD', name: 'Dollar', symbol: '$', country: 'United States' },
    { code: 'GBP', name: 'Pound', symbol: '£', country: 'United Kingdom' },
    { code: 'EUR', name: 'Euro', symbol: '€', country: 'Euro Member' },
    { code: 'NGN', name: 'Naira', symbol: '₦', country: 'United States' },
  ];

  // Stores maximum number of item input fields allowed
  const ITEM_MAX_COUNT = 6;

  // Stores the current logo in the state
  const {
    details: { companyLogoTemp },
  } = invoiceData;

  // Adds new item input fields
  const addItem = () => {
    setInvoiceData((prevState) => ({
      ...prevState,
      inputItems: [
        ...invoiceData.inputItems,
        { quantity: '', description: '', price: '' },
      ],
    }));
  };

  // Removes item input fields at a given index
  const removeItem = (index) => {
    const inputItems = [...invoiceData.inputItems];
    inputItems.splice(index, 1);
    setInvoiceData((prevState) => ({ ...prevState, inputItems }));
  };

  // Handles onchange event on input fields
  const onchangeHandler = ({ target: { name, value, files } }, index) => {
    const details = { ...invoiceData.details };
    const inputItems = [...invoiceData.inputItems];

    if (details.hasOwnProperty(name)) {
      if (files) {
        const [file] = files;
        const tempFileUrl = URL.createObjectURL(file);
        details[name] = file;
        details['companyLogoTemp'] = tempFileUrl;
      } else {
        details[name] = value;
      }
    } else {
      inputItems[index][name] = value;
    }

    setInvoiceData((prevState) => ({ ...prevState, details, inputItems }));
  };

  // Send invoice data to the backend
  const submitHandler = (event) => {
    event.preventDefault();
    onSubmit(invoiceData);
  };

  return (
    <Card>
      <form method="POST" className={styles.form} onSubmit={submitHandler}>
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
                    onChange={onchangeHandler}
                  >
                    <option value="DEFAULT" disabled>
                      Choose currency
                    </option>
                    {currencies.map((currency, index) => (
                      <option key={index} value={currency.symbol}>
                        {currency.name} {`(${currency.symbol})`}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  {companyLogoTemp && (
                    <img
                      className={styles.company_logo}
                      src={companyLogoTemp}
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
                      onChange={onchangeHandler}
                    />
                    {companyLogoTemp
                      ? 'Choose a different logo'
                      : 'Upload a logo'}
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
                    onChange={(e) => onchangeHandler(e)}
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
                    onChange={(e) => onchangeHandler(e)}
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
                    onChange={(e) => onchangeHandler(e)}
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
                    onChange={(e) => onchangeHandler(e)}
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
                    onChange={(e) => onchangeHandler(e)}
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
                    onChange={(e) => onchangeHandler(e)}
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
                    onChange={(e) => onchangeHandler(e)}
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
                    onChange={(e) => onchangeHandler(e)}
                  />
                </div>
              </div>
            </fieldset>
          </div>
          <div className={styles.invoice_items}>
            <h2>Items</h2>
            {invoiceData.inputItems.map((item, index) => (
              <div key={index} className={styles.item}>
                <input
                  type="number"
                  min="1"
                  name="quantity"
                  placeholder="Quantity"
                  value={item.quantity}
                  onChange={(e) => onchangeHandler(e, index)}
                />
                <input
                  type="text"
                  name="description"
                  placeholder="Description"
                  value={item.description}
                  onChange={(e) => onchangeHandler(e, index)}
                />
                <input
                  type="number"
                  min="1"
                  step=".01"
                  name="price"
                  placeholder="Price"
                  value={item.price}
                  onChange={(e) => onchangeHandler(e, index)}
                />
                <button
                  type="button"
                  onClick={() => {
                    removeItem(index);
                  }}
                >
                  -
                </button>
              </div>
            ))}
            {invoiceData.inputItems.length < ITEM_MAX_COUNT && (
              <button type="button" onClick={addItem}>
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
