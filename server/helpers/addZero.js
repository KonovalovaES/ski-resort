function addZero(year, month, day) {
  const newMonth = (month.toString().length === 1) ? `0${month}` : month;
  const newDate = (day.toString().length === 1) ? `0${day}` : day;
  return `${year}-${newMonth}-${newDate}`;
}

module.exports = addZero;
