import React from "react";

type CurrencyFormatterProps = {
  amount: number | null | undefined;
  currency?: string;
  locale?: string;
};

function CurrencyFormatter({
  amount,
  currency = "USD",
  locale = "en-US",
}: CurrencyFormatterProps) {
  // Fallback to 0 if amount is null/undefined
  const safeAmount = amount ?? 0;
  
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(safeAmount);
}

export default CurrencyFormatter;
