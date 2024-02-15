import React from "react";

function CurrencyFormat({ amount }) {
  // Function to format currency
  const formatCurrency = (amount) => {
    // Add currency formatting logic here
    return `$${amount.toFixed(2)}`; // Assuming USD and rounding to two decimal places
  };

  return <span>{formatCurrency(amount)}</span>;
}

export default CurrencyFormat;
