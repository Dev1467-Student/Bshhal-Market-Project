function CurrencyFormatter({
  amount,
  currency = "USD",
  locale = "en-US"
}) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency
  }).format(amount);
}
export {
  CurrencyFormatter as C
};
