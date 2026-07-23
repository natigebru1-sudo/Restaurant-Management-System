/**
 * Format currency amount with proper decimal places and currency symbol
 * @param {number} amount
 * @param {string} currency
 * @returns {string}
 */
const formatCurrency = (amount, currency = "$") => {
  if (typeof amount !== "number" || isNaN(amount)) {
    return `${currency}0.00`;
  }

  return `${currency}${amount.toFixed(2)}`;
};

/**
 * Parse currency string back to number
 * @param {string} currencyString
 * @returns {number}
 */
const parseCurrency = (currencyString) => {
  if (typeof currencyString !== "string") {
    return 0;
  }

  const numberStr = currencyString.replace(/[^0-9.-]/g, "");
  const parsed = parseFloat(numberStr);

  return isNaN(parsed) ? 0 : parsed;
};

/**
 * Calculate tax amount
 * @param {number} amount
 * @param {number} taxRate
 * @returns {number}
 */
const calculateTax = (amount, taxRate = 10) => {
  if (typeof amount !== "number" || isNaN(amount)) {
    return 0;
  }

  return (amount * taxRate) / 100;
};

/**
 * Calculate total with tax
 * @param {number} amount - Base amount
 * @param {number} taxRate - Tax rate as percentage (default: 10)
 * @returns {number} Total amount including tax
 */
const calculateTotalWithTax = (amount, taxRate = 10) => {
  if (typeof amount !== "number" || isNaN(amount)) {
    return 0;
  }

  return amount + calculateTax(amount, taxRate);
};

/**
 * Calculate discount amount
 * @param {number} amount
 * @param {number} discountPercent
 * @returns {number}
 */
const calculateDiscount = (amount, discountPercent) => {
  if (typeof amount !== "number" || isNaN(amount)) {
    return 0;
  }

  if (typeof discountPercent !== "number" || isNaN(discountPercent)) {
    return 0;
  }

  return (amount * discountPercent) / 100;
};

/**
 * Calculate final amount after discount
 * @param {number} amount
 * @param {number} discountPercent
 * @returns {number}
 */
const calculateFinalAmount = (amount, discountPercent) => {
  if (typeof amount !== "number" || isNaN(amount)) {
    return 0;
  }

  const discount = calculateDiscount(amount, discountPercent);
  return amount - discount;
};

module.exports = {
  formatCurrency,
  parseCurrency,
  calculateTax,
  calculateTotalWithTax,
  calculateDiscount,
  calculateFinalAmount,
};
