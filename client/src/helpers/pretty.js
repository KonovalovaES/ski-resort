export const prettyPhone = (phoneString) =>
  phoneString.replace(/(\+\d)(\d{3})(\d{3})(\d{2})(\d{2})/g, '$1 ($2) $3-$4-$5');

export const prettyCost = (costNumber) => {
  const splittedReversedArr = costNumber.toString().split('').reverse();
  const twiceSplittedReversedArr = []
  while (splittedReversedArr.length > 0) twiceSplittedReversedArr.push(splittedReversedArr.splice(0, 3).reverse())
  return twiceSplittedReversedArr.reverse().map(el => el.join('')).join(' ');
}

