const arraysAreEqual = (arr1, arr2) => {
  if (arr1.length !== arr2.length) return false;
  return arr1.every((value, index) => value === arr2[index]);
};
const ProductRoute = (item) => {
  const params = new URLSearchParams();
  Object.entries(item.option_ids).forEach(([typeId, optionId]) => {
    params.append(`options[${typeId}]`, optionId + "");
  });
  return route("product.show", item.slug) + "?" + params.toString();
};
export {
  ProductRoute as P,
  arraysAreEqual as a
};
