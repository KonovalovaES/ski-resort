import { toStringDate } from "./toStringDate";

export function nextStringDate(dateString, gap) {
  return toStringDate(new Date(new Date(dateString).valueOf() + 1000 * 60 * 60 * 24 * gap));
}


