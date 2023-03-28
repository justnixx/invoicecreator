function moneyFormat(currency = 'USD', num) {
  return num.toLocaleString('en-US', { style: 'currency', currency });
}

module.exports = { moneyFormat };
