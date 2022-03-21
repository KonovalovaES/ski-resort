export function getDates(arrayOfObjects) {
  const dates = [];
  arrayOfObjects.forEach(hourObj => {
    if (!dates.includes(hourObj.date)) dates.push(hourObj.date)
  })
  return dates
}
