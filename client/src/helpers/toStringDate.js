import { addZero } from "./addZero";

export function toStringDate(date) {
  return addZero(date.getFullYear(), date.getMonth() + 1, date.getDate());
}
