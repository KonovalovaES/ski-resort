const addZero = require('./addZero');

function toStringDate(date) {
  return addZero(date.getFullYear(), date.getMonth() + 1, date.getDate());
}

module.exports = toStringDate;
