export function countGapValue(dateStringStart, dateStringFinih) {
  return Math.round((new Date(dateStringFinih).valueOf() - new Date(dateStringStart).valueOf()) / (1000 * 60 * 60 * 24));
}
